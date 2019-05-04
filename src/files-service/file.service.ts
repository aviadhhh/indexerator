import { readdir, writeFile } from "fs";
import { extname, relative, sep } from 'path';
import { EventEmitter } from 'events';

export type QuoteType = 'single' | 'double';

export enum Extensions {
    ts = 'ts',
    js = 'js'
}

export enum Quotes {
    single = '\'',
    double = '\"'
}

export class FileService {
    private readonly indexName: string;
    private readonly eventEmitter: EventEmitter;
    private prefix = `export * from './`;
    private _quoteStyle: Quotes = Quotes.single;

    constructor(fileName?: string) {
        this.indexName = fileName || 'index';
        this.eventEmitter = new EventEmitter();
    }

    public setQuoteStyle(quoteStyle: QuoteType) {
        if(quoteStyle) {
            this._quoteStyle = Quotes[quoteStyle] || Quotes.single;
        }

        this.prefix = this.prefix.replace(/'|"/, this._quoteStyle);
    }

    get indexFileName(): string {
        return this.indexName;
    }

    public generateExportFile(path: string) {
        readdir(path, (err, files: string[]) => {
            if(err) return this.emit('error', 'Unable to create file.');

            const foundedFile = files.find(file => file.endsWith(Extensions.js) || file.endsWith(Extensions.ts));
            if(!foundedFile) {
                if(files.length === 0) {
                    return this.emit('error', 'can\'t create file in empty folder.');
                }

                return this.emit('error', 'file extension is not supported.');
                // window.showErrorMessage('Files are not supported or the folder is empty');
            }

            const extension = extname(foundedFile);
            const content = files.filter(file => file.endsWith(extension) && file !== `${this.indexName}${extension}`)
            .map(file => `${this.prefix}${this.exportFileName(file)}${this._quoteStyle};\n`).join('');

            writeFile(`${path}/${this.indexName}${extension}`, content, (writreErr) => {
                if(writreErr) {
                    return this.emit('error', `could'nt write file`);
                }

    			const folderName = relative(process.cwd(), path).split(sep);

                this.emit('create', `indexerator >${this.indexFileName} in ${folderName[folderName.length - 1]}`);
            });
        });
    }

    public on(event: 'create' | 'error', handleCb: (...args: any[]) => void): FileService {
        this.eventEmitter.on(event, handleCb);

        return this;
    }

    private emit(event: 'create' | 'error', ...args: any[]): void {
        this.eventEmitter.emit(event, args);
    }


    /**
     * 
     * @param name the file name with extension
     * @returns the file name without extension
     */
    private exportFileName(name: string): string {
        if (!name) {
            return name;
        }

        const splitted = name.split('.');

        return splitted.splice(0, splitted.length - 1).join('.');
    }
}