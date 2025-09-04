const { getSvgFromClipboard } = require('./getSvgFromClipboard.js');

const path = require('path');
const vscode = require('vscode');

/**
 * Generates the .vue file content and returns it as a string.
 * Wraps svg in options api, composition api or custom template component.
 * @param {String} fileName - The name of the file, eg. MySvg.vue
 * @returns - Null or the file content as stirng.
 */
async function getVueFileContent(fileName) {
  const svgContent = await getSvgFromClipboard();

  if (!svgContent) {
    return null;
  }

  const config = vscode.workspace.getConfiguration('vueSvgWrapper');
  const useCompositionApi = config.get('useCompositionApi', true);
  const customTemplate = config.get('customTemplate', '');
  
  const componentName = path.basename(fileName, '.vue');

  if (customTemplate.trim()) {
    return customTemplate
      .replace(/\{\{SVG_CONTENT\}\}/g, svgContent)
      .replace(/\{\{COMPONENT_NAME\}\}/g, componentName);
  }

  const templateContent = `  <div>
    ${svgContent}
  </div>`;

  const scriptContent = useCompositionApi
    ? generateCompositionApiScript(componentName)
    : generateOptionsApiScript(componentName);

  return `<template>
${templateContent}
</template>

${scriptContent}

<style scoped>

</style>
`;
}

function generateCompositionApiScript(componentName) {
  return `<script setup>
// ${componentName} component
</script>`;
}

function generateOptionsApiScript(componentName) {
  return `<script>
export default {
  name: '${componentName}'
};
</script>`;
}

module.exports = { getVueFileContent };