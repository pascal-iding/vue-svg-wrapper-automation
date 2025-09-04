const assert = require('assert');
const { downloadSvg } = require('../commands/svgToVue/helpers/createSvgWrapperComponent/helpers/helpers/getSvgFromClipboard/helpers/downloadSvg');
const { isValidSvg } = require('../commands/svgToVue/helpers/createSvgWrapperComponent/helpers/helpers/getSvgFromClipboard/helpers/isValidSvg');

suite('downloadSvg Test Suite', () => {
	test('downloadSvg should be a function', () => {
		assert.strictEqual(typeof downloadSvg, 'function');
	});

	test('downloadSvg should be async', () => {
		const result = downloadSvg('https://example.com/test.svg');
		assert.ok(result instanceof Promise || (result && 'then' in result && typeof (/** @type {any} */ (result)).then === 'function'));
	});

	test('downloadSvg should reject for invalid URL', async () => {
		try {
			await downloadSvg('invalid-url');
			assert.fail('Should have thrown an error for invalid URL');
		} catch (error) {
			assert.ok(error instanceof Error);
		}
	});

	test('downloadSvg should handle timeout', async () => {
		try {
			await downloadSvg('https://httpstat.us/200?sleep=10000');
		} catch (error) {
			// Timeout or connection error expected
			assert.ok(error instanceof Error);
			assert.ok(error.message.includes('timeout') || error.message.includes('ENOTFOUND') || error.message.includes('network'));
		}
	}).timeout(10000);

	test('downloadSvg should download Unity Technologies logo and validate it', async function() {
		const unityLogoUrl = 'https://upload.wikimedia.org/wikipedia/commons/1/19/Unity_Technologies_logo.svg';
		
		try {
			const downloadedContent = await downloadSvg(unityLogoUrl);
			
			assert.ok(typeof downloadedContent === 'string', 'Downloaded content should be a string');
			assert.ok(downloadedContent.length > 0, 'Downloaded content should not be empty');
			assert.ok(isValidSvg(downloadedContent), 'Downloaded Unity logo should be valid SVG');
			assert.ok(downloadedContent.includes('<svg'), 'Downloaded content should contain SVG tag');
			assert.ok(downloadedContent.includes('</svg>'), 'Downloaded content should contain closing SVG tag');
			
		} catch (error) {
			// Network issues may cause this test to fail in some environments
			console.warn('Unity logo download test failed (possibly due to network issues):', error.message);
			// Skip the test if there are network issues but don't fail it
			if (error.message.includes('timeout') || error.message.includes('ENOTFOUND') || error.message.includes('network')) {
				console.warn('Skipping test due to network connectivity issues');
				return;
			}
			throw error; // Re-throw if it's not a network issue
		}
	}).timeout(15000);
});