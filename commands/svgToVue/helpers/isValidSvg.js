function isValidSvg(content) {
  if (!content || typeof content !== 'string') return false;
  const trimmed = content.trim();
  return trimmed.startsWith('<svg') && 
         trimmed.includes('</svg>') &&
         (trimmed.includes('xmlns="http://www.w3.org/2000/svg"') || 
          trimmed.includes("xmlns='http://www.w3.org/2000/svg'"));
}

module.exports = { isValidSvg }