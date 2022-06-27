const webpackDevConfig = require('../../../../../packages/static/webpack/apps/webpack-apps.dev.js')

webpackDevConfig.resolve.alias = { ...require('./webpack.aliases') }

module.exports = {
    ...webpackDevConfig,
    devServer: {
        open: true,
        hot: true,
        port: 8902,
        historyApiFallback: true,
    },
}