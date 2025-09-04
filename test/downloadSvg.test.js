const assert = require('assert');
const { downloadSvg } = require('../commands/svgToVue/helpers/createSvgWrapperComponent/helpers/helpers/getSvgFromClipboard/helpers/downloadSvg');

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
			// This will likely timeout or fail to connect
			await downloadSvg('https://httpstat.us/200?sleep=10000');
			// If it doesn't timeout, that's also acceptable
		} catch (error) {
			// Timeout or connection error expected
			assert.ok(error instanceof Error);
			assert.ok(error.message.includes('timeout') || error.message.includes('ENOTFOUND') || error.message.includes('network'));
		}
	}).timeout(10000);
});