const fs = require('fs');
const vscode = require('vscode');
const {getVueFileContent} = require('./helpers/getVueFileContent');

/**
 * Creates a .vue file at the specified file path and name.
 * @param {String} targetDirectory - The parent directory of the to be created
 * file.
 * Will be created if it doesn't exist.
 * @param {String} filename - The name of the file with a .vue ending,
 * eg 'MySvg.vue'
 * @param {String} filePath - The complete path to the file,
 * eg /user/.../MySvg.vue
 */
async function createSvgWrapperComponent(
    targetDirectory, filename, filePath) {
  try {
    if (fs.existsSync(filePath)) {
      throw new Error(`File already exists: ${filename}`);
    }

    if (!fs.existsSync(targetDirectory)) {
      fs.mkdirSync(targetDirectory, {recursive: true});
    }

    const vueTemplate = await getVueFileContent(filename);

    if (!vueTemplate) {
      return;
    }

    fs.writeFileSync(filePath, vueTemplate);

    const document = await vscode.workspace.openTextDocument(filePath);
    await vscode.window.showTextDocument(document);

    vscode.window.showInformationMessage(`Vue file created: ${filename}`);
  } catch (error) {
    vscode.window.showErrorMessage(
        `Failed to create Vue file: ${error.message}`);
  }
}

module.exports = {createSvgWrapperComponent};
