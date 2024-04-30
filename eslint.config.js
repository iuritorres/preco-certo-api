import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
	{
		languageOptions: { globals: globals.browser },
		rules: { 'no-unused-vars': 'warn', 'no-undef': 'warn' },
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];
