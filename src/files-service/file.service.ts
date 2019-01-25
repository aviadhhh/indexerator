import { PathLike, readdir, writeFile } from "fs";
import { extname } from 'path';

export enum Extensions {
    ts = 'ts',
    js = 'js'
}

export class FileService {
    private readonly indexName: string;
    private readonly prefix = `export * from './`;

    constructor() {
        this.indexName = 'index';
    }

    public generateExportFile(path: PathLike) {
        readdir(path, (err, files: string[]) => {
            if(err) throw(err);

            const foundedFile = files.find(file => file.endsWith(Extensions.js) || file.endsWith(Extensions.ts));
            if(!foundedFile) return;

            const extension = extname(foundedFile);
            if(!extension) return;

            const content = files.filter(file => file.endsWith(extension))
            .map(file => `${this.prefix}${this.exportFileName(file)}';\n`).join('');

            writeFile(`${path}/${this.indexName}${extension}`, content, (writreErr) => {
                if(writreErr) throw writreErr;
            });
        });
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