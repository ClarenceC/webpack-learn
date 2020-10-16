const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// module.exports = {
//   entry: {
//     index: './src/index.js'
//   },
//   mode: 'development',
//   devServer: {
//     contentBase: './dist',
//     hot: true
//   },
//   plugins: [
//     new CleanWebpackPlugin({
//       cleanStaleWebpackAssets: false
//     }),
//     new HtmlWebpackPlugin({
//       title: 'Caching'
//     })
//   ],
//   output: {
//     filename: '[name].[contenthash].js',
//     path: path.resolve(__dirname, 'dist'),
//     publicPath: '/'
//   },
//   optimization: {
//     moduleIds: 'hashed',
//     runtimeChunk: 'single',
//     splitChunks: {
//       cacheGroups: {
//         vendor: {
//           test: /[\\/]node_modules[\\/]/,
//           name: 'vendors',
//           chunks: 'all'
//         }
//       }
//     }
//   }
// }

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'production'
  // mode: 'development',
  // optimization: {
  //   usedExports: true
  // }
}