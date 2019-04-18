var path = require('path'),
    webpack = require('webpack'),
    config = require('./config.js')[process.env.NODE_ENV],
    merge = require('webpack-merge'),
    baseWebpackConfig = require('./webpack.base.conf'),
    HtmlWebpackPlugin = require('html-webpack-plugin');


var _plugins = [],
	_entries = require('./entries.js'),
	_sourcePrefix = './src/';



Object.keys(_entries).forEach((key) => {
    _entries[key].html && _plugins.push(new HtmlWebpackPlugin({
        template: _sourcePrefix + _entries[key].template,
        filename: _entries[key].filename,
        chunks: [key],
        inject: true
    }));
});

console.log(webpack)


module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: false,
    plugins: _plugins.concat([

    ]),
    optimization: {
        minimize: true
    }
});
