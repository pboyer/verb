import commonjs from '@rollup/plugin-commonjs'
import nodePolyfills from 'rollup-plugin-polyfill-node';
import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  external: 'web-worker',
  input: 'build/js/verb.js',
  output: [
    {
      file: 'build/js/verb.min.js',
      format: 'umd',
      name: 'verb',
    },
    {
      file: 'build/js/verb.es.js',
      format: 'es',
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    nodePolyfills( /* options */ )
  ]
}
