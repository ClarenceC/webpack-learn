const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                // 用正则去匹配要用该 loader 转换的 CSS 文件
                test: /\.css$/,
                // use: [
                //     'style-loader',
                //     {
                //         options:{
                //             minimize:true,
                //         }
                //     }
                // ]
                use: ExtractTextPlugin.extract({
                    use: ['css-loader'],
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: `[name]_[contenthash:8].css`
        }),
    ]
}