const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    // 定位点
    entry: [
        'babel-polyfill',
        './src/index'
    ],
    mode: 'production',
    module: {
        rules: [{
            test: /\.js[x]?$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/,
            loader: 'babel-loader?cacheDirectory',

        },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9' // React doesn't support IE8 anyway
                                    ]
                                })
                            ]
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ],
                exclude: /\.useable\.less$/
            },
            {
                test: /\.useable\.less$/,
                use: [
                    {
                        loader: 'style-loader/useable'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: loader => [
                                require('autoprefixer')()
                            ]
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ],
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'assets/web-store/img/[name].[hash:8].[ext]'
                    }
                }]
            }, {
                test: /\.(ico)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 50,
                        name: 'assets/web-store/ico/[name].[hash:8].[ext]'
                    }
                }]
            }, {
                test: /\.woff?$|\.woff2?$|\.svg?$|\.ttf?$|\.eot?$/,
                loaders: 'url-loader'
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }],
        noParse: [
            /moment-with-locales/,
            /react.production.min/,
            /react-router-dom.production.min/,
            /redux.min.js/,
            /react-router.min.js/,
            /redux-saga.min.js/
        ]
    },
    output: {
        publicPath: '/',
        filename: 'assets/web-store/js/[name].[chunkhash:8].js',
        chunkFilename: 'assets/web-store/js/[name].[chunkhash:8].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [path.resolve(__dirname, 'node_modules')],
        alias: {
            'moment': 'moment/min/moment-with-locales.min.js',
            'react-dom': 'react-dom/umd/react-dom.production.min.js',
            'react': 'react/umd/react.production.min.js',
            'redux': 'redux/dist/redux.min.js',
            'react-router-dom': 'react-router-dom/umd/react-router-dom.min.js',
            'redux-saga': 'redux-saga/dist/redux-saga.min.js'
        }
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    compress: {
                        /* eslint-disable */
                        drop_console: true,
                        /* eslint-enable */
                    }
                }
            }),
            // new OptimizeCSSAssetsPlugin({
            //     cssProcessor: require('cssnano')({
            //         reduceIdents: false
            //     })
            // })
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.optimize\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', {discardComments: {removeAll: true}}],
                },
                canPrint: true
            })
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 10,
                    enforce: true,
                },
                react: {
                    name: 'react',
                    test: module => /react|redux/.test(module.context),
                    chunks: 'initial',
                    priority: 11,
                    enforce: true,
                },
                antd: {
                    name: 'antd',
                    test: (module) => {
                        return /ant/.test(module.context);
                    },
                    chunks: 'initial',
                    priority: 11,
                    enforce: true,
                },
                moment: {
                    name: 'moment',
                    test: (module) => {
                        return /moment/.test(module.context);
                    },
                    chunks: 'initial',
                    priority: 13,
                    enforce: true,
                },
            },
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: 'assets/web-store/css/[name].[contenthash:8].css',
            chunkFilename: 'assets/web-store/css/[id].[contenthash:8].css'
        }),
        new CSSSplitWebpackPlugin({
            size: 4000,
            filename: 'assets/web-store/css/[name]-[part].[ext]'
        }),
        new HtmlWebpackPlugin({
            title: 'FashionSafari',
            template: './src/index.html',
            filename: './template/web-store/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new webpack.HashedModuleIdsPlugin(),

    ]
};
