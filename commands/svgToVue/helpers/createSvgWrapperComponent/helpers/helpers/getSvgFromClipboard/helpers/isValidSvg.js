
/**
 * Checks if a string is an svg element.
 * @param {String} content
 * @returns True if content is an svg, else false
 */
function isValidSvg(content) {
  if (!content || typeof content !== 'string') return false;
  
  if (!(content.startsWith('<svg') && content.endsWith('</svg>'))) {
    return false;
  }
  
  const svgOpenCount = (content.match(/<svg/g) || []).length;
  const svgCloseCount = (content.match(/<\/svg>/g) || []).length;
  
  return svgOpenCount === 1 && svgCloseCount === 1;
}

module.exports = { isValidSvg }