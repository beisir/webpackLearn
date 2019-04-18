process.env.NODE_ENV = 'development';
var webpack = require('webpack'),
	// utils = require('./utils'),
	path = require('path'),
	config = require('./config')[process.env.NODE_ENV],
	merge = require('webpack-merge'),
	baseWebpackConfig = require('./webpack.base.conf'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

var _plugins = [],
	_entries = require('./entries.js'),
	_sourcePrefix = './src/';


Object.keys(_entries).forEach((key) => {
    _entries[key].template && _plugins.push(new HtmlWebpackPlugin({
        template: _sourcePrefix + _entries[key].template,
        filename: _entries[key].filename,
        chunks: [key],
        inject: true
    }));
});

// console.log( _plugins)
// Object.keys(baseWebpackConfig.entry).forEach((name) => {
// 	baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
// });






module.exports = merge({
	plugins: _plugins
},baseWebpackConfig, {
	mode: 'development',
	target: 'web',
	devtool: '#source-map',
	devServer: {
	    hot: false,
		contentBase: path.join(__dirname, '../dist'), // since we use CopyWebpackPlugin.
	    // compress: true,
	    host: '0.0.0.0',
	    port: config.port,
	    // open: config.autoOpenBrowser,
	    // overlay: true,
	    publicPath: config.assetsPublicPath,
	    proxy: config.proxyTable,
	    quiet: true, // necessary for FriendlyErrorsPlugin
	    // stats: "errors-only"
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': process.env.NODE
		}),
		// new HtmlWebpackPlugin(),

		new FriendlyErrorsPlugin({
			compilationSuccessInfo: {
	          messages: [`Your application is running here: http://localhost:${config.port}`],
	        }
		})
	]
});
