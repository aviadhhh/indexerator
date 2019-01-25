import { commands, ExtensionContext, window } from 'vscode';

import { FileService } from './files-service/file.service';


export function activate(context: ExtensionContext) {
	let disposable = commands.registerCommand('extension.indexerator', (fullPath) => {
		window.showInformationMessage(`indexerator creates ${fullPath.fsPath}`);
		console.log(`Congratulations, your "indexerator" command has execute! ${fullPath}`);
		const fileHandler = new FileService('ts');

		fileHandler.generateExportFile(fullPath.fsPath);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
