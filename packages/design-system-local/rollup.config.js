import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import json from 'rollup-plugin-json'
// import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'

import pkg from './package.json'

export default {
	input: 'index.js',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			sourcemap: true
		},
		{
			file: pkg.module,
			format: 'es',
			sourcemap: true
		}
	],
	external: ['styled-components', 'styled-normalize', 'styled-system'],
	// https://github.com/WebReflection/hyperHTML/issues/304#issuecomment-443950244
	context: 'null',
	plugins: [
		external(),
		url({
			// By default, rollup-plugin-url will not handle font files
			include: [
				'src/components/icon-font/*.woff',
				'src/components/icon-font/*.woff2'
			],
			// Setting infinite limit will ensure that the files
			// are always bundled with the code, not copied to /dist
			limit: Infinity
		}),
		babel({
			babelrc: false,
			runtimeHelpers: true,
			presets: [['@babel/env', {modules: false}], '@babel/react'],
			exclude: ['node_modules/**', '**/*.json'],
			plugins: [
				'@babel/external-helpers',
				[
					'@babel/transform-runtime',
					{
						regenerator: true
					}
				],
				'@babel/plugin-proposal-class-properties'
			]
		}),
		resolve({
			browser: true
		}),
		commonjs({
			include: ['node_modules/**'],
			exclude: ['node_modules/process-es6/**']
		}),
		json(),
		// terser(),
		postcss({
			extensions: ['.css', '.less'],
			inject: false,
			extract: true,
			minimize: true
		})
	]
}
