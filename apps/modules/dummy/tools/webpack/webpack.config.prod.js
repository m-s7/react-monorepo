const webpackProdConfig = require('../../../../../packages/static/webpack/apps/webpack-apps.prod.js')

webpackProdConfig.resolve.alias = { ...require('./webpack.aliases') }

module.exports = webpackProdConfig
