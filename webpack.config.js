const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcDir = path.resolve(__dirname, 'src');

module.exports = {
    mode: 'development',

    entry: {
        index: path.resolve(srcDir, 'dev', 'App.tsx'),
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true
                        }
                    }
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('templates', 'index.html'),
            filename: path.resolve(__dirname, 'dist', 'index.html')
        })
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8787,
        historyApiFallback: true
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css']
    },
    
    devtool: 'eval-source-map',

    output: {
        filename: '[name].[chunkhash].js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
    },
};
