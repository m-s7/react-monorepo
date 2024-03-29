const { isDev } = require('./webpack-apps.helpers')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [
    {
        // Typescript loader
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|\.webpack)/,
        use: ['ts-loader'],
    },
    {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
        resolve: {
            fullySpecified: false,
        },
    },
    {
        // CSS Spinner
        test: /\.css$/,
        use: [
            { loader: isDev() ? 'style-loader' : MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
        ],
    },
    {
        // Less loader
        test: /\.less$/,
        use: [
            { loader: isDev() ? 'style-loader' : MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
            { loader: 'less-loader' },
        ],
    },
    {
        // Images Spinner
        test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg)$/,
        use: [
            {
                loader: 'file-loader',
                // options: {
                //     publicPath: 'assets/images',
                //     outputPath: 'assets/images',
                // },
            },
        ],
    },
    {
        // Font & SVG loader
        test: /\.(woff(2)?|ttf|otf|eot)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    publicPath: 'assets/fonts',
                    outputPath: 'assets/fonts',
                },
            },
        ],
    },
]
