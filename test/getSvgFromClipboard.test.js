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
	//TODO: Simulate clipboard with valid svg element (Should return this element) and link (https://upload.wikimedia.org/wikipedia/commons/1/19/Unity_Technologies_logo.svg should retrun isValidSvg true)
});