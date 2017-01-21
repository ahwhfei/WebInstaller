const path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: {
        port: 3000,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },
    devtool: 'source-map',
    entry: path.resolve('src', 'main.ts'),
    module: {
        rules: [
            {
                enforce: 'pre',
                exclude: /node_modules/,
                loader: 'tslint-loader',
                test: /\.ts$/,
            },
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
        path: path.resolve(__dirname, '../Api/dist')
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
