const { time } = require('console')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { watch } = require('fs/promises');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname,  './src/main.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean : true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack',
            filename: 'index.html',
            template: path.resolve(__dirname, './src/index.html')
        }),
        new CleanWebpackPlugin(),
    ],
    devtool: 'source-map',
    devServer:{
        static: path.join(__dirname, 'dist'),
        open: true,
        port: 3000,
        hot: true,
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif|webp)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource',
            },
        ]
    }
}