const webpackDevConfig = require('../../../../packages/assets/webpack/apps/webpack-apps.dev.js')

webpackDevConfig.resolve.alias = { ...require('./webpack.aliases') }

module.exports = webpackDevConfig