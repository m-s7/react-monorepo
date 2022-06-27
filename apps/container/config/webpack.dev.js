const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:9999/',
    },
    devServer: {
        port: 9999,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                helloReact: 'helloReact@http://localhost:9991/remoteEntry.js',
                helloVue: 'helloVue@http://localhost:9992/remoteEntry.js',
            },
            shared: packageJson.dependencies
        })
    ]
};


module.exports = merge(commonConfig, devConfig)
