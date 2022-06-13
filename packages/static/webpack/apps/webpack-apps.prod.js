module.exports = {
    mode: 'production',
    entry: ['./src/index.tsx'],
    module: {
        rules: require('./webpack-apps.rules'),
    },
    output: {
        publicPath: '/',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        clean: true,
    },
    plugins: [...require('./webpack-apps.plugins')],
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
        alias: {},
    },
    devServer: {
        open: true,
        hot: true,
        port: 8901,
        historyApiFallback: true,
    },
    optimization: {
        minimize: true,
        sideEffects: true,
        concatenateModules: true,
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: 10,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                },
            },
        },
    },
    performance: {
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000,
    },
}
