const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const json = require('rollup-plugin-json')
const external = require('rollup-plugin-peer-deps-external')
const url = require('rollup-plugin-url')
// const peerDepsExternal = require('rollup-plugin-peer-deps-external')

// import { terser } from 'rollup-plugin-terser'
const postcss = require('rollup-plugin-postcss')

const pkg = require('./package.json')

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      sourcemap: true
    }
  ],
  external: [
    'styled-components',
    'styled-normalize',
    'react-input-autosize',
    'stylis-rule-sheet',
    'styled-system',
    'prop-types',
    'react',
    'react-dom',
    '@design-system/theme',
    'react-tiny-popover',
    'stylus-rule-sheet',
    'add-dom-event-listener',
    'rc-animate',
    'react-select',
    'react-select/lib/Async',
    'classnames',
    'moment',
    'shallowequal',
    'color',
    'ramda'
  ],
  // https://github.com/WebReflection/hyperHTML/issues/304#issuecomment-443950244
  context: 'null',
  plugins: [
    // peerDepsExternal(),
    external(),
    url({
      // by default, rollup-plugin-url will not handle font files
      include: ['**/components/**/*.woff', '**/components/**/*.woff2'],
      // setting infinite limit will ensure that the files
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
      include: /node_modules/,
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
