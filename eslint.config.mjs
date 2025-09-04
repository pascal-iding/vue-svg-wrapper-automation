import globals from "globals";
import google from "eslint-config-google";

export default [{
    files: ["**/*.js"],
    ignores: [
        "node_modules/**",
        ".vscode-test/**",
        "out/**",
        "dist/**",
        "coverage/**",
        "test/**"
    ],
    languageOptions: {
        globals: {
            ...globals.commonjs,
            ...globals.node,
            ...globals.mocha,
        },
        ecmaVersion: 2022,
        sourceType: "commonjs",
    },
    rules: {
        ...google.rules,
        // Override specific Google rules if needed
        "require-jsdoc": "off", // Often too strict for simple functions
        "valid-jsdoc": "off",   // Can be overly pedantic
    },
}];