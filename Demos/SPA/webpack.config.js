const path = require('path')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const { WebPlugin } = require('web-webpack-plugin')

module.exports = {
    entry: {
        app: './main.js' // app 的 JavaScript 执行入口文件
    },
    output: {
        filename: '[name]_[chunkhash:8].js', // 输出的文件名称加上 Hash 值
        path: path.resolve(__dirname,'./dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/, // 判断js文件类型
                // use: ['babel-loader'], // 使用babel-loader 转译 js文件
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react']
                        }
                    }
                ],
                // 排除 node_modules 目录下的文件,优化速度
                // node_modules 都是采用 ES5 语法，没必要再通过 Babel 去转换
                exclude: path.resolve(__dirname, 'node_modules') 
            },
            {
                test: /\.css/, // 增加对 CSS 文件的支持
                use: ExtractTextPlugin.extract({ // 使用 ExtractTextPlugin 插件
                    use: ['css-loader?minimize'] // 压缩 CSS 代码
                })
            }
        ]
    },
    plugins: [
        // 使用 WebPlugin, 一个 WebPlugin 对应一个 HTML 文件
        new WebPlugin({
            template: './template.html', // HTML 模版文件所在的文件路径
            filename: 'index.html' // 输出的 HTML 的文件名称
        }),
        new ExtractTextPlugin({
            filename: '[name]_[contenthash:8].css', // 给输出的 CSS 文件名称加上 Hash 值
        }),
        new DefinePlugin({
            // 定义 NODE_ENV 环境变量为 production, 以去除源码中只有开发时才需要的部分
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        // 压缩输出的 JavaScript 代码
        new UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在 UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句, 可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            },
            sourceMap: true
        })
    ],
}