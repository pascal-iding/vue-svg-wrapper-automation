const vscode = require('vscode');

/**
 * Prompts the user for a filename.
 * The user can enter a name with or without .vue ending.
 * If the user doesn't use .vue, it will be appended automatically.
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