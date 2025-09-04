const assert = require('assert');
const {svgToVueCommand} = require('../commands/svgToVue/svgToVueCommand');

suite('svgToVueCommand Test Suite', () => {
  test('svgToVueCommand should be a function', () => {
    assert.strictEqual(typeof svgToVueCommand, 'function');
  });

  test('svgToVueCommand should be async', () => {
    const result = svgToVueCommand();
    assert.ok(result instanceof Promise || (result && 'then' in result && typeof (/** @type {any} */ (result)).then === 'function'));
  });
});
