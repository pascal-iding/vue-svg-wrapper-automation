const vscode = require('vscode');
const { downloadSvg } = require('./helpers/downloadSvg');
const { isValidSvg } = require('./helpers/isValidSvg')
const { extractSvg } = require('./helpers/extractSvg/extractSvg')

/**
 * Either reads the svg from the clipboard or downloads it from a link.
 * If the downloaded content is a website, it will try to extract an svg from the html.
 * If the content is an svg file, it will return this svg file.
 * If no svg can be read, it returns null.
 * @returns null or an svg element as string.
 */
async function getSvgFromClipboard() {
  try {
    const clipboardContent = await vscode.env.clipboard.readText();
    
    if (!clipboardContent) {
      throw Error('Clipboard empty')
    }
    
    const trimmedContent = clipboardContent.trim();
    
    // Clipboard content is an svg element
    if (isValidSvg(trimmedContent)) {
      return trimmedContent;
    } 
    
    const isTrimmedContentLink = 
      trimmedContent.match(/^https?:\/\/.+/i);

    if (!isTrimmedContentLink) {
      throw Error('Not a valid svg element or link to svg file');
    }

    // Check if downloading from HTTPS URLs is allowed
    const config = vscode.workspace.getConfiguration('vueSvgWrapper');
    const allowDownloadWithHTTPS = config.get('allowDownloadWithHTTPS', true);
    
    if (!allowDownloadWithHTTPS) {
      throw Error('Downloading from URLs is disabled. Please paste SVG content directly or enable "Allow Download With HTTPS" in settings.');
    }

    try {
      const downloadedContent = (await downloadSvg(trimmedContent)).trim();
      
      // Cliboard content is direct link to svg file
      if (isValidSvg(downloadedContent)) {
        vscode.window.showInformationMessage('SVG downloaded and validated successfully!');
        return downloadedContent;
      }
      // Cliboard is link to generic website
      else {
        const extractedSvg = await extractSvg(downloadedContent);
        if (extractedSvg && isValidSvg(extractedSvg)) {
          vscode.window.showInformationMessage('SVG extracted from webpage and validated successfully!');
          return extractedSvg;
        } else if (extractedSvg === null) {
          // User cancelled SVG selection
          return null;
        } else {
          throw Error('Downloaded content does not contain a valid SVG');
        }
      }
    } catch (downloadError) {
      throw Error(`Failed to download SVG: ${downloadError.message}`);
    }
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to create Vue file: ${error.message}`);
    return null;
  }
}

module.exports = { getSvgFromClipboard }