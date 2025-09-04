const path = require('path');
const { getTargetDirectory } = require('./helpers/getTargetDirectory');
const { getFilename } = require('./helpers/getFilename');
const { createSvgWrapperComponent } = require('./helpers/createSvgWrapperComponent');

/**
 * Creates a new Vue file with the specified filename and the clipboard content
 */
async function svgToVueCommand() {
	const filename = await getFilename();

	if (!filename) return;

	const targetDirectory = getTargetDirectory();
	const completeFilePath = path.join(targetDirectory, filename);

	createSvgWrapperComponent(targetDirectory, filename, completeFilePath)
}

module.exports = { svgToVueCommand };
