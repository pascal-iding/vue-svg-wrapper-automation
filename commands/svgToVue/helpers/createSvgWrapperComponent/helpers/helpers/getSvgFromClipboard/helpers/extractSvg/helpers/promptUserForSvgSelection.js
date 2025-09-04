const vscode = require('vscode');

/**
 * Prompts the user to select an SVG from multiple options with visual previews.
 * @param {Array<String>} svgElements - Array of SVG elements as strings
 * @returns Promise that resolves to the selected SVG string
 */
async function promptUserForSvgSelection(svgElements) {
  return new Promise((resolve) => {
    const panel = vscode.window.createWebviewPanel(
      'svgSelection',
      'Select SVG',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: false
      }
    );

    // Generate SVG preview cards
    const svgCards = svgElements.map((svg, index) => {
      // Extract meaningful info from SVG for display
      const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
      const classMatch = svg.match(/class="([^"]+)"/);
      const idMatch = svg.match(/id="([^"]+)"/);
      
      let title = `SVG ${index + 1}`;
      let details = '';
      
      if (idMatch) {
        title = idMatch[1];
      } else if (classMatch) {
        title = classMatch[1];
      }
      
      if (viewBoxMatch) {
        details = `ViewBox: ${viewBoxMatch[1]}`;
      }
      
      return `
        <div class="svg-card" data-index="${index}">
          <div class="svg-preview">
            ${svg}
          </div>
          <div class="svg-info">
            <h3>${title}</h3>
            <p>${details}</p>
            <small>Click to select</small>
          </div>
        </div>
      `;
    }).join('');

    panel.webview.html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: var(--vscode-font-family);
            color: var(--vscode-foreground);
            background: var(--vscode-editor-background);
            padding: 20px;
            margin: 0;
          }
          h1 {
            margin-top: 0;
            margin-bottom: 20px;
            color: var(--vscode-foreground);
          }
          .svg-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 16px;
          }
          .svg-card {
            border: 1px solid var(--vscode-panel-border);
            border-radius: 8px;
            padding: 16px;
            cursor: pointer;
            transition: all 0.2s;
            background: var(--vscode-editor-background);
          }
          .svg-card:hover {
            border-color: var(--vscode-focusBorder);
            background: var(--vscode-list-hoverBackground);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
          .svg-preview {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 120px;
            margin-bottom: 12px;
            background: var(--vscode-input-background);
            border-radius: 4px;
            border: 1px solid var(--vscode-input-border);
          }
          .svg-preview svg {
            max-width: 100%;
            max-height: 100%;
          }
          .svg-info h3 {
            margin: 0 0 4px 0;
            font-size: 14px;
            font-weight: 600;
          }
          .svg-info p {
            margin: 0 0 4px 0;
            font-size: 12px;
            color: var(--vscode-descriptionForeground);
          }
          .svg-info small {
            color: var(--vscode-descriptionForeground);
            font-size: 11px;
          }
          .instructions {
            margin-bottom: 20px;
            padding: 12px 16px;
            background: var(--vscode-textBlockQuote-background);
            border-left: 4px solid var(--vscode-textBlockQuote-border);
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <h1>Select an SVG</h1>
        <div class="instructions">
          Found ${svgElements.length} SVG element${svgElements.length > 1 ? 's' : ''} on this page. Click on one to select it for your Vue component.
        </div>
        <div class="svg-grid">
          ${svgCards}
        </div>
        <script>
          const vscode = acquireVsCodeApi();
          
          document.querySelectorAll('.svg-card').forEach(card => {
            card.addEventListener('click', () => {
              const index = parseInt(card.dataset.index);
              vscode.postMessage({ command: 'selectSvg', index });
            });
          });
        </script>
      </body>
      </html>
    `;

    panel.webview.onDidReceiveMessage((message) => {
      if (message.command === 'selectSvg') {
        const selectedSvg = svgElements[message.index];
        resolve(selectedSvg);
        panel.dispose();
      }
    });

    panel.onDidDispose(() => {
      resolve(null);
    });
  });
}

module.exports = { promptUserForSvgSelection }