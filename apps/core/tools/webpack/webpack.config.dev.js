module.exports = {
    mode: 'development',
    entry: ['./src/index.tsx'],
    module: {
        rules: require('./webpack.rules'),
    },
    output: {
        publicPath: '/', //Important: HMR will break on deep route navigation without publicPath
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
    plugins: require('./webpack.plugins'),
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
        alias: {
            ...require('./webpack.aliases'),
        },
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        open: true,
        hot: true,
        historyApiFallback: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    performance: {
        hints: false,
    },
}
