const path = require('path')

const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    polyfills: './src/polyfills.js',
    index: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // module: {
  //   rules: [
  //     {
  //       test: require.resolve('./src/index.js'),
  //       use: 'imports-loader?this=>window'
  //     },
  //     {
  //       test: require.resolve('./src/index.js'),
  //       use: 'exports-loader?file,parse=helpers.parse'
  //     }
  //   ]
  // },
  plugins: [
    new webpack.ProvidePlugin({
      join: ['lodash', 'join']
    })
  ]
}