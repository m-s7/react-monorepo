const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { DefinePlugin } = require('webpack')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
require('dotenv').config()

const isDevelopment = process.env.NODE_ENV !== 'production'

const getReactEnvs = () => {
    const envs = {}

    Object.keys(process.env).forEach(env => {
        if(env.startsWith('REACT_APP_')) envs[env] = process.env[env]
    })

    return envs
}

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
    // new ProvidePlugin({
    //     process: 'process/browser',
    // }),
    new DefinePlugin({
        'process.env': JSON.stringify({ ...getReactEnvs() }),
    }),
    new ReactRefreshPlugin(),
]
