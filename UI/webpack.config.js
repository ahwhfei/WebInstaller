const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    entry: path.resolve('client/src', 'main.ts'),
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
                loaders: ['to-string-loader', 'css-loader', 'less-loader'],
                test: /\.less$/,
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)$/,
                loader: 'url-loader?name=fonts/[name].[ext]'
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve('server', 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'client/src/index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.ts']
    }
}
