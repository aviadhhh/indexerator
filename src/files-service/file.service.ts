import { PathLike, readdir, writeFile } from "fs";

type FileExtension = 'ts' | 'js';

export class FileService {
    private indexName: string;
    private readonly prefix = `export * from './`;

    constructor(private fileExtension: FileExtension) {
        this.indexName = `index.${fileExtension}`;
    }

    public generateExportFile(path: PathLike) {
        readdir(path, (err, files: string[]) => {
            const content = files.filter(file => file.endsWith(this.fileExtension))
            .map(file => `${this.prefix}${this.exportFileName(file)}';\n`).join('');
			console.log('​FileUtils -> publicgenerateExportFile -> content', content)

                

            writeFile(`${path}/${this.indexName}`, content, (writreErr) => {
                if(writreErr) throw writreErr;

                console.log(`${this.indexName} has created!`);
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