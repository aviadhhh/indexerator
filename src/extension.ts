import { commands, ExtensionContext, window, workspace } from 'vscode';

import { FileService, QuoteType } from './files-service/file.service';


export function activate(context: ExtensionContext) {
	let disposable = commands.registerCommand('extension.indexerator', (fullPath) => {
		// get file name from user settings- index as default file name.
		const fileName = workspace.getConfiguration().get('indexerator.exportFileName') as string;
		// get quote style from user settings
		const quoteStyle = workspace.getConfiguration().get('indexerator.quotes') as QuoteType;
		const fileService = new FileService(fileName);

		fileService.setQuoteStyle(quoteStyle);

		fileService.on('error', (reason: string) => {
			window.showErrorMessage(`indexerator: ${reason}`);
		})
		.on('create', (reason) => {
			window.setStatusBarMessage(`indexerator >${reason}`);

			// clear status bar after 5 sec
			setTimeout(() => window.setStatusBarMessage(''), 5 * 1000);
		});

		fileService.generateExportFile(fullPath.fsPath);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
