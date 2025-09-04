const vscode = require('vscode');
const { svgToVueCommand } = require('./commands/svgToVue/svgToVueCommand')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const svgToVueCommandDisposable = vscode.commands.registerCommand('vueSvgWrapper.svgToVue', svgToVueCommand);
	context.subscriptions.push(svgToVueCommandDisposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
