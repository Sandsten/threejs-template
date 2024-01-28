const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    target: 'web',
    mode: 'production',
    output: {
        // All loaded files will be prefixed with this path
        // Usefull for when you want to serve this web app on a specific endpoint
        publicPath: '/myapp/',
    },
    resolve: {
        // changed from extensions: [".js", ".jsx"]
        // This is the order in which extensions are tested against imports
        // e.g we can use "import File from '../path/to/file';" instead of "import File from '../path/to/file.ts';""
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                use: { loader: 'ts-loader' },
                exclude: /node_modules/,
            },
            {
                test: /\.glsl$/,
                loader: 'webpack-glsl-loader',
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|png|svg|gif|pdf)$/,
                use: ['file-loader'],
            },
            {
                //Load fonts
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            favicon: './src/favicon.ico'
        })
    ],
};
