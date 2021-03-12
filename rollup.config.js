const path = require('path');
const typescript = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('@rollup/plugin-babel').default;
const json = require('@rollup/plugin-json');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
const alias = require('@rollup/plugin-alias');
const pkg = require('./package.json');

module.exports = function getConfig() {
  const config = {
    input: {
      main: path.resolve(__dirname, 'src', 'main.ts')
    },
    output: {
      dir: path.resolve(__dirname, 'dist'),
      format: 'cjs'
    },
    external: [...Object.keys(pkg.peerDependencies || {})],
    plugins: [
      alias({
        entries: { '@': 'src' }
      }),
      resolve(),
      commonjs(),
      typescript(),
      babel({
        exclude: 'node_modules/**',
        extensions: ['js', '.ts']
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      json()
    ]
  };

  if (process.env.NODE_ENV === 'production') {
    config.plugins = [...config.plugins, terser()];
  }

  return config;
};
