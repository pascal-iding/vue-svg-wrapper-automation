const vscode = require('vscode');

/**
 * Prompts the user for a filename
 * @returns 
 */
async function getFilename() {
  const filename = await vscode.window.showInputBox({
    prompt: 'Enter filename for the new Vue file',
    placeHolder: 'MySvg'
  });
  return filename.endsWith('.vue') ? filename : `${filename}.vue`;
}

module.exports = { getFilename }