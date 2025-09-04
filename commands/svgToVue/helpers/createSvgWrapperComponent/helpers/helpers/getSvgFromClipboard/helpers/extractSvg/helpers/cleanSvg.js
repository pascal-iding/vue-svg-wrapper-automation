/**
 * Cleans up SVG by removing unnecessary attributes like class and id
 * @param {String} svgString - SVG string to clean
 * @returns {String} Cleaned SVG string
 */
function cleanSvg(svgString) {
  return svgString
    .replace(/\s+class="[^"]*"/gi, '')
    .replace(/\s+id="[^"]*"/gi, '')
    .replace(/\s+class='[^']*'/gi, '')
    .replace(/\s+id='[^']*'/gi, '');
}

module.exports = { cleanSvg }