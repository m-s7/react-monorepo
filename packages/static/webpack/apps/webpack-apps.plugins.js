const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
require('dotenv').config()

// TODO: load HMR conditionally
// const getHmrPlugin = () => {
//     if(isDevelopment) return new ReactRefreshPlugin()
//
//     return
// }

module.exports = [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'public/favicon.ico',
        inject: true,
    }),
    new MiniCssExtractPlugin({
        filename: '[name].[chunkhash].css',
        chunkFilename: '[name].[chunkhash].chunk.css',
    }),
    new ReactRefreshPlugin(),
]
