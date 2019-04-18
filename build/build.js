process.env.NODE_ENV = 'production';

var webpack = require('webpack'),
    ora = require('ora'),
    shell = require('shelljs'),
    chalk = require('chalk'),
    config = require('./config.js')[process.env.NODE_ENV],
    webpackConfig = require('./webpack.prod.conf.js');


var spinner = ora('building for production...');
    spinner.start();


var removeDir = config.assetsRoot;
shell.rm('-rf', removeDir);
shell.mkdir('-p', removeDir);

/** 对打包的配置化，如果打包的时候有错误我们就抛出错误，我们可以在webpack()回调里拿到一个stats打包状态，
process.stdout.write跟console.log一个意思因为在node环境里console.log也是用process封装的就是向cli里打印输出。
但是输出的时候进行了一些格式化。
colors ： 让打包的时候有颜色。 module : 去掉内置模块信息 children ：去掉子模块 chunks : 增加包信息（设置为 false 能允许较少的冗长输出）chunkModules : 去除包里内置模块的信息 **/
webpack(webpackConfig, function (err, stats) {
    spinner.stop();

    if (err) {
        throw err;
    };

    process.stdout.write(stats.toString({
        colors: true,   // 让打包的时候有颜色。
        modules: false, // 去掉内置模块信息
        children: false,// 去掉子模块
        chunks: false,  // 增加包信息（设置为 false 能允许较少的冗长输出）
        chunkModules: false
    }) + '\n\n');

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
        '  Date 2019 - 04 - 16 慧聪网：web前端 \n' +
        '  \n'
    ));

})
