process.env.NODE_ENV = 'development';


let express = require('express'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.dev.conf.js'),
    config = require('./config.js')[process.env.NODE_ENV];

let webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware');

let proxyTable = config.proxyTable; // 代理设置


let app = express(),
    compiler = webpack(webpackConfig),
    devMiddleware = webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath, // 绑定中间件的公共路径,与webpack配置的路径相同   使用与webpack相同
        quiet: true  //向控制台显示任何内容
        // noInfo: false,
        // //  显示无信息到控制台（仅警告和错误）
        // lazy: true,   //  切换到延迟模式 //  这意味着没有观看，而是重新编译每个请求
        // watchOptions: {
        //     aggregateTimeout: 300,
        //     poll: true
        // },
        // index: "index.html", //  Web服务器的索引路径，默认为“index.html”。 如果falsy（但不是未定义），服务器将不会响应到根URL的请求。
        // headers: { "X-Custom-Header": "yes" }, //  自定义标题
        // mimeTypes: { "text/html": [ "phtml" ] }, //  添加自定义mime /扩展映射
        // stats: { //  用于形成统计信息的选项
        //     colors: true
        // },
        // reporter: null, //  提供自定义记录器来更改日志显示的方式。
        // serverSideRender: false, //  关闭服务器端渲染模式。有关详细信息，请参阅服务器端渲染部分。
    }),
    devHotMiddleware = webpackHotMiddleware(compiler, {
        log: (data) => {
            console.log(38, data)
        }
    });

app.use(devMiddleware);
app.use(devHotMiddleware);
app.use(require('connect-history-api-fallback'));

devMiddleware.waitUntilValid(function() {
	console.log('> Listening at ' + 'localhost' + '\n');
});


module.exports = app.listen(config.port, function (err) {
    if (err) {
        console.log(err)
        return ;
    };
});
