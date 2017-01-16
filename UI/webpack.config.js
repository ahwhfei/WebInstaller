const path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve('src', 'main.ts'),
    module: {
        rules: [
            {
                exclude: /node_modules/,
                loader: 'ts-loader',
                test: /\.ts$/,
            },
            {
                exclude: /node_modules/,
                loader: 'raw-loader',
                test: /\.html$/,
            },
            {
                exclude: /node_modules/,
                loaders: ['raw-loader', 'less-loader'],
                test: /\.less$/,
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.ts']
    }
}
