const vscode = require('vscode');
const { downloadSvg } = require('./downloadSvg');
const { isValidSvg } = require('./isValidSvg')
const { extractSvg } = require('./extractSvg')

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
    
    if (isValidSvg(trimmedContent)) {
      return trimmedContent;
    } 
    
    const isTrimmedContentLink = 
      trimmedContent.match(/^https?:\/\/.*\.svg$/i) ||
      trimmedContent.match(/^https?:\/\/.*\.(svg|png|jpg|jpeg)(\?.*)?$/i);

    if (!isTrimmedContentLink) {
      throw Error('Not a valid svg element or link to svg file');
    }

    vscode.window.showInformationMessage('Downloading SVG from URL...');

    try {
      const downloadedContent = (await downloadSvg(trimmedContent)).trim();
      
      if (isValidSvg(downloadedContent)) {
        vscode.window.showInformationMessage('SVG downloaded and validated successfully!');
        return downloadedContent;
      } else {
        const extractedSvg = extractSvg(downloadedContent);
        if (extractedSvg && isValidSvg(extractedSvg)) {
          vscode.window.showInformationMessage('SVG extracted from webpage and validated successfully!');
          return extractedSvg;
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