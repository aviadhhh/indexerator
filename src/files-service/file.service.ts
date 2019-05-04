import { PathLike, readdir, writeFile } from "fs";
import { extname } from 'path';
import { window } from 'vscode';
import { EventEmitter } from 'events';

export enum Extensions {
    ts = 'ts',
    js = 'js'
}

export class FileService {
    private readonly indexName: string;
    private readonly prefix = `export * from './`;
    private readonly eventEmitter: EventEmitter;

    constructor(fileName?: string) {
        this.indexName = fileName || 'index';
        this.eventEmitter = new EventEmitter();
    }

    get indexFileName(): string {
        return this.indexName;
    }

    public generateExportFile(path: PathLike) {
        readdir(path, (err, files: string[]) => {
            if(err) throw(err);

            const foundedFile = files.find(file => file.endsWith(Extensions.js) || file.endsWith(Extensions.ts));
            if(!foundedFile) {
                window.showErrorMessage('Files are not supported or the folder is empty');

                return;
            }

            const extension = extname(foundedFile);
            const content = files.filter(file => file.endsWith(extension) && file !== `${this.indexName}${extension}`)
            .map(file => `${this.prefix}${this.exportFileName(file)}';\n`).join('');

            writeFile(`${path}/${this.indexName}${extension}`, content, (writreErr) => {
                if(writreErr) {
                    this.emit('error');
                    
                    return;
                }

                this.emit('create');
            });
        });
    }

    public on(event: 'create' | 'error', handleCb: (...args: any[]) => void): FileService {
        this.eventEmitter.on(event, handleCb);

        return this;
    }

    private emit(event: 'create' | 'error'): void {
        this.eventEmitter.emit(event);
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