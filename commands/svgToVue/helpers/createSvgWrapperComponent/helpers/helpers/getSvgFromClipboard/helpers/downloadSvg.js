const https = require('https');

/**
 * Downloads the content from given url and returns it as a string
 * @param {String} url 
 * @returns Content of that url
 */
async function downloadSvg(url) {
  return new Promise((resolve, reject) => {
    if (!url.startsWith('https:')) {
      reject(new Error('Only HTTPS URLs are allowed for security reasons'));
      return;
    }
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'image/svg+xml,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.google.com/'
      }
    };
    
    const request = https.get(url, options, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download SVG: HTTP ${response.statusCode}`));
        return;
      }
      
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => resolve(data));
    }).on('error', err => reject(err));

    request.setTimeout(5000, () => {
      request.destroy();
      reject(new Error('Request timeout: SVG download took longer than 5 seconds'));
    });
  });
}

module.exports = { downloadSvg }