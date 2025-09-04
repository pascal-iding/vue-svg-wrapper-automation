const assert = require('assert');
const { createSvgWrapperComponent } = require('../commands/svgToVue/helpers/createSvgWrapperComponent/createSvgWrapperComponent');

suite('createSvgWrapperComponent Test Suite', () => {
	test('createSvgWrapperComponent should be a function', () => {
		assert.strictEqual(typeof createSvgWrapperComponent, 'function');
	});

	test('createSvgWrapperComponent should be async', () => {
		const result = createSvgWrapperComponent('test', 'test.vue', '/test/test.vue');
		assert.ok(result instanceof Promise || (result && 'then' in result && typeof (/** @type {any} */ (result)).then === 'function'));
	});
});