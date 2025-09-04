const assert = require('assert');
const { getSvgFromClipboard } = require('../commands/svgToVue/helpers/createSvgWrapperComponent/helpers/helpers/getSvgFromClipboard/getSvgFromClipboard');

suite('getSvgFromClipboard Test Suite', () => {
	test('getSvgFromClipboard should be a function', () => {
		assert.strictEqual(typeof getSvgFromClipboard, 'function');
	});

	test('getSvgFromClipboard should be async', () => {
		const result = getSvgFromClipboard();
		assert.ok(result instanceof Promise || (result && 'then' in result && typeof (/** @type {any} */ (result)).then === 'function'));
	});
});