const assert = require('assert');
const { getVueFileContent } = require('../commands/svgToVue/helpers/createSvgWrapperComponent/helpers/getVueFileContent');

suite('getVueFileContent Test Suite', () => {
	test('getVueFileContent should be a function', () => {
		assert.strictEqual(typeof getVueFileContent, 'function');
	});

	test('getVueFileContent should be async', () => {
		const result = getVueFileContent('TestComponent.vue');
		assert.ok(result instanceof Promise || (result && typeof result.then === 'function'));
	});
});