const assert = require('assert');
const { isValidSvg } = require('../commands/svgToVue/helpers/createSvgWrapperComponent/helpers/helpers/getSvgFromClipboard/helpers/isValidSvg');

suite('isValidSvg Test Suite', () => {
	test('isValidSvg should be a function', () => {
		assert.strictEqual(typeof isValidSvg, 'function');
	});

	test('isValidSvg should return false for null or undefined', () => {
		assert.strictEqual(isValidSvg(null), false);
		assert.strictEqual(isValidSvg(undefined), false);
	});

	test('isValidSvg should return false for non-string input', () => {
		assert.strictEqual(isValidSvg(123), false);
		assert.strictEqual(isValidSvg({}), false);
		assert.strictEqual(isValidSvg([]), false);
	});

	test('isValidSvg should return false for empty string', () => {
		assert.strictEqual(isValidSvg(''), false);
	});

	test('isValidSvg should return false for non-SVG strings', () => {
		assert.strictEqual(isValidSvg('hello world'), false);
		assert.strictEqual(isValidSvg('<div>test</div>'), false);
	});

	test('isValidSvg should return false for malformed SVG', () => {
		assert.strictEqual(isValidSvg('<svg>'), false);
		assert.strictEqual(isValidSvg('</svg>'), false);
		assert.strictEqual(isValidSvg('<svg><circle/><svg></svg></svg>'), false);
	});

	test('isValidSvg should return true for valid SVG', () => {
		assert.strictEqual(isValidSvg('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><circle cx="12" cy="12" r="10"/></svg>'), true);
		assert.strictEqual(isValidSvg('<svg><rect width="10" height="10"/></svg>'), true);
	});

	test('isValidSvg should return true for self-closing SVG', () => {
		assert.strictEqual(isValidSvg('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"></svg>'), true);
	});
});