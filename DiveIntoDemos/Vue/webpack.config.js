const path = require('path')

module.exports = {
    entry: './main.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    resolve: {
        extensions: ['.ts','.js','.vue','.json'],
    },
    module: {
        rules: [
            // 加载 .vue 文件
            {
                test: /\.vue$/,
                use: ['vue-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    // 让 tsc 把 vue 文件当成一个 TypeScript 模块去处理， 以解决 moudle not found 的问题，tsc 本身不会处理 .vue 结尾的文件
                    appendTsSuffixTo: [/\.vue$/],
                }
            }
        ]
    },
    devtool: 'source-map' // 输出 source-map 方便直接调试 ES6 源码
}