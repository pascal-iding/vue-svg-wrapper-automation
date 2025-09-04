const assert = require('assert');
const { extractSvg } = require('../commands/svgToVue/helpers/createSvgWrapperComponent/helpers/helpers/getSvgFromClipboard/helpers/extractSvg/extractSvg');
const { isValidSvg } = require('../commands/svgToVue/helpers/createSvgWrapperComponent/helpers/helpers/getSvgFromClipboard/helpers/isValidSvg');

suite('extractSvg Test Suite', () => {
	test('extractSvg should be a function', () => {
		assert.strictEqual(typeof extractSvg, 'function');
	});

	test('extractSvg should be async', () => {
		const result = extractSvg('<html></html>');
		assert.ok(result instanceof Promise || (result && 'then' in result && typeof (/** @type {any} */ (result)).then === 'function'));
	});

	test('extractSvg should return null for invalid input', async () => {
		const result1 = await extractSvg(null);
		assert.strictEqual(result1, null);
		
		const result2 = await extractSvg('');
		assert.strictEqual(result2, null);
		
		const result3 = await extractSvg(/** @type {any} */ (123));
		assert.strictEqual(result3, null);
	});

	test('extractSvg should return null for HTML without SVG', async () => {
		const html = '<html><body><div>No SVG here</div></body></html>';
		const result = await extractSvg(html);
		assert.strictEqual(result, null);
	});

	test('extractSvg should extract single SVG from HTML', async () => {
		const html = '<html><body><svg width="24" height="24"><circle cx="12" cy="12" r="10"/></svg></body></html>';
		const result = await extractSvg(html);
		assert.ok(typeof result === 'string');
		assert.ok(result.includes('<svg'));
		assert.ok(result.includes('</svg>'));
		assert.ok(isValidSvg(result), 'Extracted SVG should be valid according to isValidSvg');
	});

	test('extractSvg should handle timeout', async () => {
		try {
			// Test with a very large HTML string to potentially trigger timeout
			const largeHtml = '<html><body>' + 'x'.repeat(1000000) + '</body></html>';
			await extractSvg(largeHtml);
		} catch (error) {
			assert.ok(error instanceof Error);
		}
	}).timeout(7000);
});