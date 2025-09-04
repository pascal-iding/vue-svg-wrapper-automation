const assert = require('assert');
const {getFilename} = require('../commands/svgToVue/helpers/getFilename');

suite('getFilename Test Suite', () => {
  test('getFilename should be a function', () => {
    assert.strictEqual(typeof getFilename, 'function');
  });

  test('getFilename should be async', () => {
    const result = getFilename();
    assert.ok(result instanceof Promise || (result && 'then' in result && typeof (/** @type {any} */ (result)).then === 'function'));
  });
});
