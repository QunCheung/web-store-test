const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // 定位点
    entry: [
        'babel-polyfill',
        './src/index'
    ],
    mode: 'development',
    output: {
        publicPath: '/',
        filename: 'assets/web-store/js/[name].js',
    },
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
                        loader: 'less-loader'
                    }
                ],
                exclude: /node_modules/
            }, {
                test: /\.(ico)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'assets/ico/[name].[hash:8].[ext]'
                    }
                }]
            },{
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    attrs: ['img:src', 'link:href']
                }
            },  {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'assets/web-store/img/[name].[hash:8].[ext]'
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
    devtool: 'eval-source-map',
    // 设置服务
    devServer: {
        contentBase: './dist',
        // 端口
        port: 8081,
        // 热更新
        hot: true,
        historyApiFallback: true,
        // 设为0，0，0，0就能让其他设备访问了
        host: '0.0.0.0',
        // open:true,
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            // 将包含test请求都发出去
            '/fs/api/*': {
                // target: 'http://127.0.0.1:3001',
                // target: 'http://192.168.2.102:9003',
                target: 'http://116.62.237.10:9006',
                changeOrigin: true,
                secure: false,
                // 替换包含test的接口
                // pathRewrite: {
                //     '^/test/*': ''
                // }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
            inject: true,
            favicon: './src/ico/favicon.ico',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        // new BundleAnalyzerPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};
