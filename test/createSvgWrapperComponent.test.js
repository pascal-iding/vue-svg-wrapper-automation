const assert = require('assert');
const fs = require('fs');
const path = require('path');
const os = require('os');
const {createSvgWrapperComponent} =
  require('../commands/svgToVue/helpers/createSvgWrapperComponent/createSvgWrapperComponent');

suite('createSvgWrapperComponent Test Suite', () => {
  test('createSvgWrapperComponent should be a function', () => {
    assert.strictEqual(typeof createSvgWrapperComponent, 'function');
  });

  test('createSvgWrapperComponent should create Vue file', async function() {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vue-svg-test-'));
    const filename = 'TestIcon.vue';
    const filePath = path.join(tempDir, filename);
    const testSvg = '<svg width="24" height="24" viewBox="0 0 24 24">' +
      '<circle cx="12" cy="12" r="10"/></svg>';

    try {
      const mockVscode = {
        workspace: {
          openTextDocument: () => Promise.resolve({}),
          getConfiguration: () => ({
            get: (key, defaultValue) => defaultValue,
          }),
        },
        window: {
          showTextDocument: () => Promise.resolve(),
          showInformationMessage: () => {},
          showErrorMessage: () => {},
        },
        env: {
          clipboard: {
            readText: () => Promise.resolve(testSvg),
          },
        },
      };

      // Mock the vscode module temporarily
      const Module = require('module');
      const originalRequire = Module.prototype.require;
      Module.prototype.require = function(...args) {
        if (id === 'vscode') {
          return mockVscode;
        }
        return originalRequire.apply(this, args);
      };

      // Clear require cache to ensure fresh module loading with mocked vscode
      const modulesToClear = [
        '../commands/svgToVue/helpers/createSvgWrapperComponent/createSvgWrapperComponent',
        '../commands/svgToVue/helpers/createSvgWrapperComponent/' +
          'helpers/getVueFileContent',
        '../commands/svgToVue/helpers/createSvgWrapperComponent/' +
          'helpers/helpers/getSvgFromClipboard/getSvgFromClipboard',
      ];

      modulesToClear.forEach((modulePath) => {
        try {
          delete require.cache[require.resolve(modulePath)];
        } catch {
          // Module might not be in cache
        }
      });

      const {createSvgWrapperComponent: freshCreateSvgWrapperComponent} = require('../commands/svgToVue/helpers/createSvgWrapperComponent/createSvgWrapperComponent');

      await freshCreateSvgWrapperComponent(tempDir, filename, filePath);

      // Restore original require
      Module.prototype.require = originalRequire;

      assert.ok(fs.existsSync(filePath), 'Vue file should have been created');

      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(content.includes('<template>'), 'File should contain Vue template');
      assert.ok(content.includes('<script'), 'File should contain Vue script section');
    } finally {
      // Clean up temp directory
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      fs.rmdirSync(tempDir);
    }
  }).timeout(10000);
  test('createSvgWrapperComponent should be async', () => {
    const result = createSvgWrapperComponent('test', 'test.vue', '/test/test.vue');
    assert.ok(result instanceof Promise || (result && 'then' in result && typeof (/** @type {any} */ (result)).then === 'function'));
  });
});
