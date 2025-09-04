const { promptUserForSvgSelection } = require('./helpers/promptUserForSvgSelection');
const { cleanSvg } = require('./helpers/cleanSvg');


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
        resolve(cleanSvg(matches[0]));
        return;
      }
      
      promptUserForSvgSelection(matches).then(selectedSvg => {
        resolve(selectedSvg ? cleanSvg(selectedSvg) : null);
      }).catch(reject);
    } catch (error) {
      clearTimeout(timeoutId);
      reject(error);
    }
  });
}

module.exports = { extractSvg }