'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
    const isDevelopment = options.mode === 'development';
    return {
        entry: `./src/index.js`,
        output: {
            filename: isDevelopment ? 'bundle.js' : 'bundle.[contenthash].js',
            publicPath: '/'
        }
        ,
        performance: {
            hints: false
        },
        mode: options.mode,
        devtool: isDevelopment ? 'cheap-module-eval-source-map' : false,
        resolve: {
            extensions: ['.js', '.json', '.jsx', '.scss', '.png']
        },
        devServer: {
            historyApiFallback: true,
            contentBase: './',
            hot: true
        },
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        cacheCompression: false,
                        envName: isDevelopment ? "development" : "production",
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    modules: false,
                                    targets: {
                                        browsers: ['last 1 chrome versions']
                                    }
                                }
                            ],
                            '@babel/preset-react'
                        ],
                    },
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|json|svg|jpg|gif)$/,
                use: [
                 'file-loader',
                ],
              }]
        },
        plugins: [ 
            new HtmlWebpackPlugin({
            template: 'public/index.html'
          })
        ]
    }
};