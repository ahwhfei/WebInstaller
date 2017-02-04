module.exports = require('./webpack.common.js');

const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

let uglifyJsPlugin = new UglifyJsPlugin({
    // beautify: true, //debug
    // mangle: false, //debug
    // dead_code: false, //debug
    // unused: false, //debug
    // deadCode: false, //debug
    // compress: {
    //   screw_ie8: true,
    //   keep_fnames: true,
    //   drop_debugger: false,
    //   dead_code: false,
    //   unused: false
    // }, // debug
    // comments: true, //debug


    beautify: false, //prod
    exclude: ['manifest.js'],
    output: {
        comments: false
    }, //prod
    mangle: {
        screw_ie8: true
    }, //prod
    compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false // we need this for lazy v8
    },
});

module.exports.plugins.push(uglifyJsPlugin);