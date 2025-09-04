# Vue SVG Wrapper Automation

A VS Code extension that automatically creates Vue.js wrapper components from SVG content in your clipboard.

## Features

**Quick SVG to Vue Conversion**: Just ctrl + C an svg element and create a vue wrapper with one command  
**Flexible Template Support**: Choose between Composition API and Options API, or use custom templates  
**Configurable Output Directory**: Set where your Vue files are generated  
**URL Support**: Automatically download and process SVG files from URLs  
**Smart SVG Extraction**: Extract SVG elements from web pages when direct SVG links aren't available

## Installation

1. Install from the VS Code Marketplace
2. Open a workspace containing Vue files (`.vue` files must be present for activation)

## Usage

### Basic Usage

1. Copy SVG content to your clipboard (either raw SVG code or a URL to an SVG file)
2. Use the keyboard shortcut: `Ctrl+Alt+Shift+S` (Windows/Linux) or `Cmd+Alt+Shift+S` (Mac)
   - Or open the Command Palette (`Ctrl/Cmd + Shift + P`) and run: **"Svg to vue"**
3. Enter a filename for your Vue component
4. The extension will create a new `.vue` file with your SVG wrapped in a Vue component

### Supported Input Types

- **Raw SVG Code**: Direct SVG markup copied to clipboard
- **SVG URLs**: Direct links to `.svg` files
- **Web Pages**: URLs containing SVG elements (will attempt to extract the first SVG found)

## Configuration

Access settings via VS Code Settings (`Ctrl/Cmd + ,`) and search for "Vue SVG Wrapper":

### `vueSvgWrapper.defaultDirectory`
- **Type**: `string`
- **Default**: `""` (workspace root)
- **Description**: Directory where Vue files will be generated. Use paths relative to workspace root (e.g., `assets/icons/` or `./assets/otherIcons/`)

### `vueSvgWrapper.useCompositionApi`
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Generate Composition API (`<script setup>`) or Options API components

### `vueSvgWrapper.customTemplate`
- **Type**: `string`
- **Default**: `""` (use built-in template)
- **Description**: Custom Vue template with placeholders:
  - `{{SVG_CONTENT}}` - Replaced with the SVG content
  - `{{COMPONENT_NAME}}` - Replaced with the component name

## Generated Component Structure

### Composition API (Default)
```vue
<template>
  <div>
    <!-- Your SVG content here -->
  </div>
</template>

<script setup>
// ComponentName component
</script>

<style scoped>

</style>
```

### Options API
```vue
<template>
  <div>
    <!-- Your SVG content here -->
  </div>
</template>

<script>
export default {
  name: 'ComponentName'
};
</script>

<style scoped>

</style>
```

## Custom Templates

You can define your own template structure using the `vueSvgWrapper.customTemplate` setting:

```vue
<template>
  <span class="icon">
    {{SVG_CONTENT}}
  </span>
</template>

<script setup>
defineOptions({
  name: '{{COMPONENT_NAME}}'
})

// Props, emits, etc.
</script>

<style scoped>
.icon {
  display: inline-block;
}
</style>
```

## Commands

| Command | Keybinding | Description |
|---------|------------|-------------|
| `vueSvgWrapper.svgToVue` | `Ctrl+Alt+Shift+S` (`Cmd+Alt+Shift+S` on Mac) | Convert SVG from clipboard to Vue component |

## Requirements

- VS Code 1.103.0 or higher
- Workspace must contain Vue files (`.vue`) for extension activation

## Extension Settings

This extension contributes the following settings:

- `vueSvgWrapper.defaultDirectory`: Set the default directory for generated Vue files
- `vueSvgWrapper.useCompositionApi`: Choose between Composition API and Options API
- `vueSvgWrapper.customTemplate`: Define a custom Vue component template

## Known Issues

- Extension only activates in workspaces containing `.vue` files
- SVG extraction from complex web pages may not always succeed
- Network requests for URL-based SVGs may timeout on slow connections

## Release Notes

### 0.0.1

Initial release with core functionality:
- SVG to Vue component conversion
- Clipboard and URL support
- Configurable output directory
- Composition/Options API support
- Custom template system

## Contributing

Contributions are welcome.
Use [Github](https://github.com/pascal-iding/vue-svg-wrapper-automation) issues if you have suggestions or problems.
Consider leaving a star on [Github](https://github.com/pascal-iding/vue-svg-wrapper-automation) to support this project.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Lint code
npm run lint
```

## License

This extension is licensed under the MIT License.
