async function extractSvg(content) {
  if (!content || typeof content !== 'string') return null;
  
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('SVG extraction timed out after 5 seconds'));
    }, 5000);
    
    try {
      const svgRegex = /<svg[^>]*>[\s\S]*?<\/svg>/i;
      const match = content.match(svgRegex);
      clearTimeout(timeoutId);
      resolve(match ? match[0] : null);
    } catch (error) {
      clearTimeout(timeoutId);
      reject(error);
    }
  });
}

module.exports = { extractSvg }