const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const webpackDevConfig = require('../static/webpack/apps/webpack-apps.rules')

module.exports = {
    mode: 'development',
    entry: ['./src/index.ts'],
    module: {
        rules: require('../static/webpack/apps/webpack-apps.rules'),
    },
    plugins: require('../static/webpack/apps/webpack-apps.plugins'),
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    },
    devtool: 'cheap-module-source-map',
}
