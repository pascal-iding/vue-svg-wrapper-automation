
const vscode = require('vscode');

/**
 * Prompts the user to select an SVG from multiple options.
 * @param {Array} svgElements - Array of SVG elements as strings
 * @returns Promise that resolves to the selected SVG string
 */
async function promptUserForSvgSelection(svgElements) {
  const options = svgElements.map((svg, index) => {
    // Extract meaningful info from SVG for display
    const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
    const classMatch = svg.match(/class="([^"]+)"/);
    const idMatch = svg.match(/id="([^"]+)"/);
    
    let label = `SVG ${index + 1}`;
    let description = '';
    
    if (idMatch) {
      label = `SVG: ${idMatch[1]}`;
    } else if (classMatch) {
      label = `SVG: ${classMatch[1]}`;
    }
    
    if (viewBoxMatch) {
      description = `ViewBox: ${viewBoxMatch[1]}`;
    }
    
    return {
      label,
      description,
      detail: svg.substring(0, 100) + (svg.length > 100 ? '...' : ''),
      svg
    };
  });

  const selected = await vscode.window.showQuickPick(options, {
    placeHolder: 'Select an SVG element',
    matchOnDescription: true,
    matchOnDetail: true
  });

  return selected ? selected.svg : null;
}

/**
 * Finds all SVG elements from a webpage/HTML page and prompts user to select one.
 * @param {String} content - HTML of a website
 * @returns Null or the selected svg as string
 */
async function extractSvg(content) {
  if (!content || typeof content !== 'string') return null;
  
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('SVG extraction timed out after 5 seconds'));
    }, 5000);
    
    try {
      const svgRegex = /<svg[^>]*>[\s\S]*?<\/svg>/gi;
      const matches = content.match(svgRegex);
      clearTimeout(timeoutId);
      
      if (!matches || matches.length === 0) {
        resolve(null);
        return;
      }
      
      if (matches.length === 1) {
        resolve(matches[0]);
        return;
      }
      
      promptUserForSvgSelection(matches).then(resolve).catch(reject);
    } catch (error) {
      clearTimeout(timeoutId);
      reject(error);
    }
  });
}

module.exports = { extractSvg }