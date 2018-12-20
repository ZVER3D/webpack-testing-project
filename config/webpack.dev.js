const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: [
            "./src/main.js"
        ]
    },
    mode: "development",
    output: {
        filename: "[name]_bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    devServer: {
        contentBase: "dist",
        overlay: true,
        hot: true,
        stats: {
            colors: true
        }
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: "pug-loader"
                    }
                ]
            },
            {
                test: /\.hbs$/,
                use: [
                    {
                        loader: "handlebars-loader",
                        query: {
                            inlineRequires: "/images/"
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template: "./src/index.hbs",
            title: "Title from webpack"
        })
    ]
}