import { relative, sep } from 'path';
import { commands, ExtensionContext, window } from 'vscode';

import { FileService } from './files-service/file.service';


export function activate(context: ExtensionContext) {
	let disposable = commands.registerCommand('extension.indexerator', (fullPath) => {
		const folderName = relative(process.cwd(), fullPath.fsPath).split(sep);
		window.setStatusBarMessage(`indexerator >index in ${folderName[folderName.length - 1]}`);
		const fileService = new FileService();

		fileService.generateExportFile(fullPath.fsPath);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
