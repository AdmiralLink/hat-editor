import resolve from 'rollup-plugin-node-resolve';
import browsersync from 'rollup-plugin-browsersync';
import sass from 'rollup-plugin-sass';

export default {
    input: 'src/js/hat.js',
    output: {
        file: 'dist/hat.js',
        format: 'iife'
    },
    plugins: [
        resolve(),
        browsersync({port: 3002, server: '.'}),
        sass({output: 'dist/hat-editor.css'})
    ]
}