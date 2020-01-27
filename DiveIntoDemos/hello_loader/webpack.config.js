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
                test: /\.css$/,
                // use: ['style-loader','css-loader?minimize']
                use: [
                    'style-loader',
                    {
                        options:{
                            minimize:true,
                        }
                    }
                ]
            }
        ]
    }
}