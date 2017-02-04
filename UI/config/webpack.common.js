const path = require('path');

const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
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
    entry: {
        polyfills: path.resolve('client/src', 'polyfills.ts'),
        main: path.resolve('client/src', 'main.ts')
    },
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
                loader: 'awesome-typescript-loader',
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
        new CheckerPlugin(),
        new CommonsChunkPlugin({
            name: 'polyfills',
            chunks: ['polyfills']
        }),
        new CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['main'],
            minChunks: module => /node_modules\//.test(module.resource)
        }),
        new CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
        }),
        new HtmlWebpackPlugin({
            template: 'client/src/index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.ts']
    }
}
