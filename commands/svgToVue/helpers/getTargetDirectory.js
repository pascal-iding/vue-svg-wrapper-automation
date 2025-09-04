const vscode = require('vscode');
const path = require('path');

/**
 * Gets the target directory for creating Vue files
 * @returns {string} The target directory path
 */
function getTargetDirectory() {
  const config = vscode.workspace.getConfiguration('vueSvgWrapper');
  const defaultDirectory = config.get('defaultDirectory', '');

  let targetDirectory;
  if (!defaultDirectory) {
    // Return workspace root
    return vscode.workspace.workspaceFolders[0].uri.fsPath; ;
  }

  if (path.isAbsolute(defaultDirectory)) {
    vscode.window.showWarningMessage(
        'Only paths relative to workspace root are allowed for default ' +
        'directory (eg. assets/icons/). Using workspace root instead.',
    );
    // Return workspace root instead of absolute path
    targetDirectory = vscode.workspace.workspaceFolders[0].uri.fsPath;
  } else {
    targetDirectory = path.join(
        vscode.workspace.workspaceFolders[0].uri.fsPath,
        defaultDirectory,
    );
  }

  return targetDirectory;
}

module.exports = {getTargetDirectory};
