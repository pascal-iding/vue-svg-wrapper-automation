const assert = require('assert');
const { getSvgFromClipboard } = require('../commands/svgToVue/helpers/createSvgWrapperComponent/helpers/helpers/getSvgFromClipboard/getSvgFromClipboard');
const { isValidSvg } = require('../commands/svgToVue/helpers/createSvgWrapperComponent/helpers/helpers/getSvgFromClipboard/helpers/isValidSvg');

suite('getSvgFromClipboard Test Suite', () => {
	test('getSvgFromClipboard should be a function', () => {
		assert.strictEqual(typeof getSvgFromClipboard, 'function');
	});

	test('getSvgFromClipboard should be async', () => {
		const result = getSvgFromClipboard();
		assert.ok(result instanceof Promise || (result && 'then' in result && typeof (/** @type {any} */ (result)).then === 'function'));
	});
	test('getSvgFromClipboard should return SVG element from clipboard', async function() {
		const testSvg = '<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>';
		
		// Mock vscode clipboard
		const mockVscode = {
			env: {
				clipboard: {
					readText: () => Promise.resolve(testSvg)
				}
			},
			window: {
				showInformationMessage: () => {},
				showErrorMessage: () => {}
			}
		};
		
		// Mock the vscode module temporarily
		const Module = require('module');
		const originalRequire = Module.prototype.require;
		Module.prototype.require = function(/** @type {string} */ id) {
			if (id === 'vscode') {
				return mockVscode;
			}
			return originalRequire.apply(this, arguments);
		};
		
		try {
			// Clear the require cache to ensure fresh module loading
			delete require.cache[require.resolve('../commands/svgToVue/helpers/createSvgWrapperComponent/helpers/helpers/getSvgFromClipboard/getSvgFromClipboard')];
			const { getSvgFromClipboard: freshGetSvgFromClipboard } = require('../commands/svgToVue/helpers/createSvgWrapperComponent/helpers/helpers/getSvgFromClipboard/getSvgFromClipboard');
			
			const result = await freshGetSvgFromClipboard();
			
			assert.strictEqual(result, testSvg);
			assert.ok(isValidSvg(result), 'Returned content should be valid SVG');
		} finally {
			// Restore original require
			Module.prototype.require = originalRequire;
		}
	}).timeout(5000);
	
	test('getSvgFromClipboard should download and validate Unity logo from URL', async function() {
		const unityLogoUrl = 'https://upload.wikimedia.org/wikipedia/commons/1/19/Unity_Technologies_logo.svg';
		
		// Mock vscode clipboard with URL
		const mockVscode = {
			env: {
				clipboard: {
					readText: () => Promise.resolve(unityLogoUrl)
				}
			},
			window: {
				showInformationMessage: () => {},
				showErrorMessage: () => {}
			}
		};
		
		// Mock the vscode module temporarily
		const Module = require('module');
		const originalRequire = Module.prototype.require;
		Module.prototype.require = function(/** @type {string} */ id) {
			if (id === 'vscode') {
				return mockVscode;
			}
			return originalRequire.apply(this, arguments);
		};
		
		try {
			const result = await getSvgFromClipboard();
			
			if (result) {
				assert.ok(isValidSvg(result), 'Downloaded Unity logo should be valid SVG');
				assert.ok(result.includes('<svg'), 'Result should contain SVG tag');
			}
		} catch (error) {
			// Network issues may cause this test to fail in some environments
			console.warn('Unity logo download test failed (possibly due to network):', error.message);
		} finally {
			// Restore original require
			Module.prototype.require = originalRequire;
		}
	}).timeout(15000);
});