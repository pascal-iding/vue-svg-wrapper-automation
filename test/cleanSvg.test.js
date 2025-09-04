const assert = require('assert');
const { cleanSvg } = require('../commands/svgToVue/helpers/createSvgWrapperComponent/helpers/helpers/getSvgFromClipboard/helpers/extractSvg/helpers/cleanSvg');

suite('cleanSvg Test Suite', () => {
	test('cleanSvg should be a function', () => {
		assert.strictEqual(typeof cleanSvg, 'function');
	});

	test('cleanSvg should remove class attributes with double quotes', () => {
		const input = '<svg class="icon" width="24" height="24"></svg>';
		const expected = '<svg width="24" height="24"></svg>';
		assert.strictEqual(cleanSvg(input), expected);
	});

	test('cleanSvg should remove class attributes with single quotes', () => {
		const input = "<svg class='icon' width='24' height='24'></svg>";
		const expected = "<svg width='24' height='24'></svg>";
		assert.strictEqual(cleanSvg(input), expected);
	});

	test('cleanSvg should remove id attributes with double quotes', () => {
		const input = '<svg id="my-icon" width="24" height="24"></svg>';
		const expected = '<svg width="24" height="24"></svg>';
		assert.strictEqual(cleanSvg(input), expected);
	});

	test('cleanSvg should remove id attributes with single quotes', () => {
		const input = "<svg id='my-icon' width='24' height='24'></svg>";
		const expected = "<svg width='24' height='24'></svg>";
		assert.strictEqual(cleanSvg(input), expected);
	});

	test('cleanSvg should remove both class and id attributes', () => {
		const input = '<svg class="icon" id="my-icon" width="24" height="24"></svg>';
		const expected = '<svg width="24" height="24"></svg>';
		assert.strictEqual(cleanSvg(input), expected);
	});

	test('cleanSvg should preserve other attributes', () => {
		const input = '<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none"></svg>';
		const expected = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"></svg>';
		assert.strictEqual(cleanSvg(input), expected);
	});

	test('cleanSvg should handle SVG without class or id', () => {
		const input = '<svg width="24" height="24"><circle cx="12" cy="12" r="10"/></svg>';
		const expected = '<svg width="24" height="24"><circle cx="12" cy="12" r="10"/></svg>';
		assert.strictEqual(cleanSvg(input), expected);
	});

	test('cleanSvg should handle empty string', () => {
		const input = '';
		const expected = '';
		assert.strictEqual(cleanSvg(input), expected);
	});

	test('cleanSvg should be case insensitive', () => {
		const input = '<SVG CLASS="icon" ID="my-icon" width="24" height="24"></SVG>';
		const expected = '<SVG width="24" height="24"></SVG>';
		assert.strictEqual(cleanSvg(input), expected);
	});
});