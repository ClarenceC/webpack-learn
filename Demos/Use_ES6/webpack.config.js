const path = require('path')

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
            },
        ]
    },
    devtool: 'source-map' //输出为 source-map 方便直接调试 ES6 源码
}