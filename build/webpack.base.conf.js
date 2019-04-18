

var path = require('path'),
    fs = require('fs'),
    // utils = require('./utils'),
    webpack = require('webpack'),
    // autoprefixer = require('autoprefixer'),
    config = require('./config')[process.env.NODE_ENV],
    HtmlWebpackPlugin = require('html-webpack-plugin');
    // ExtractTextPlugin = require('extract-text-webpack-plugin');

var _entry = {},

    _plugins = [],

    _entries = require('./entries'),

    _sourcePrefix = './src/';

Object.keys(_entries).forEach((key) => {
    if (_entries[key].group) {
        _entry[key] = _sourcePrefix + key;
    };
});
module.exports = {
    entry: _entry,
    output: {
        path: config.assetsRoot,
        filename: '[name].js',
        publicPath: config.assetsPublicPath,
        chunkFilename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: _plugins
};




















// let webpack = require('webpack');
// let path = require('path');
// let merge = require('webpack-merge');
// let htmlWebpackPlugin = require('html-webpack-plugin');
// let FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// let _entrys = require('./entrys.js');
// let plugins = [];
// let entry = {};
//
// let _commonsChunkPlugins = {};
//
// // Object.keys(baseWebpackConfig.entry).forEach(function(name) {
// // 	baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
// // });
//
//
//
//
// Object.keys(_entrys).forEach(function (key) {
//     entry[key] = './src/' + key;
//     entry[key] = ['./build/dev-client'].concat(entry[key])
// });
//
// let webpackConfig = merge({
//
//     mode: 'development',
//     devtool: '#cheap-module-eval-source-map',
//     entry: entry,
//     output: {
//         path: path.join(__dirname, '../dist'),
//         filename: '[name].js',
//         chunkFilename: '[name].js',
//         publicPath: '//style.org.hc360.com/beisir/'
//     }
//     ,
//     plugins: plugins.concat([
//         new htmlWebpackPlugin(),
//         // new webpack.optimize.SplitChunksPlugin({
//         //     name: 'vendor'
//         // }),
//         new webpack.HotModuleReplacementPlugin(),
//         new webpack.DefinePlugin({
//             'process.env': process.env.NODE_ENV
//         }),
//         new FriendlyErrorsWebpackPlugin()
//     ])
// });
// module.exports = webpackConfig;
