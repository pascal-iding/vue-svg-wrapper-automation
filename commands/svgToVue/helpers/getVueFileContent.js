import { getSvgFromClipboard } from './getSvgFromClipboard';

const path = require('path');
const vscode = require('vscode');


async function getVueFileContent(fileName) {
  const svgContent = getSvgFromClipboard();

  if (!svgContent) {
    return null;
  }

  const config = vscode.workspace.getConfiguration('vueSvgWrapper');
  const useCompositionApi = config.get('useCompositionApi', true);
  
  const componentName = path.basename(fileName, '.vue');
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
}
</script>`;
}

module.exports = { getVueFileContent }