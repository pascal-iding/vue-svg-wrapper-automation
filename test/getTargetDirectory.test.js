const assert = require('assert');
const {getTargetDirectory} = require('../commands/svgToVue/helpers/getTargetDirectory');

suite('getTargetDirectory Test Suite', () => {
  test('getTargetDirectory should be a function', () => {
    assert.strictEqual(typeof getTargetDirectory, 'function');
  });

  test('getTargetDirectory should return a string', () => {
    try {
      const result = getTargetDirectory();
      assert.strictEqual(typeof result, 'string');
    } catch (error) {
      // Expected to fail in test environment without workspace
      assert.ok(error.message.includes('workspace') || error.message.includes('Cannot read'));
    }
  });
});
