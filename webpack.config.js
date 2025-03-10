const webpack = require('webpack');
// этот файл - инструмент сборки
const path  = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin') // работай с html
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // очистка кеша
const CopyWebpackPlugin = require('copy-webpack-plugin') // копируй-перетаскивай
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // работай с css (вставляй стили в файл css)
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // минифицируй css
const TerserWebpackPlugin = require('terser-webpack-plugin') // минифицируй js
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin') // через него прикрутить externals с массивом объектов, содержащих урлы с cdn библтотек

const isDev = process.env.NODE_ENV === 'development' // определяй в каком сейчас режиме
const isProd = !isDev                                //

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders  = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hrm: isDev,                                               // hot module replacement // изменяй определенные сущности без перезагрузки страницы
                reloadAll: true,
                publicPath: isDev ? '../../' : '../../dist/'
            },
        },
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      // Options
                    },
                  ],
                ],
              },
            }
        }
    ]                                                                     // свой style-loader в комплекте

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}

const babelOptions = (preset) => {
    const opts = {
        presets: [
            '@babel/preset-env',
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}

const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: babelOptions()
        }
    ]

    return loaders
}

//
module.exports = {
    context: path.resolve(__dirname, 'src'),                                // со всех путях  удаляю эту папку
    mode: 'development',
    entry: {                                                                // точка входа в приложение, откуда начать
        main: ['@babel/polyfill', './js/index.js'],
    },
    output: {                                                               // куда складывать результаты работы
        filename: 'js/' + filename('js'),                                   // итоговый файл, после сборкивсех js файлов
        path: path.resolve(__dirname, 'dist'),                              // отталкиваясь от текущей директории, складывать все в dist
        publicPath: '/'                                                     // относительная ссылка, которая будет подставляться из браузера
    },
    resolve: {
        extensions: [                                                       // какие расширения нужно понимать по умолчанию
            '.js', '.json', '.png'
        ],
       alias: {
           '@': path.resolve(__dirname, 'src')                              // путь до корня проекта
       }
    },
    optimization: optimization(),
    // watch: true,
    devServer: {
        overlay: true,                                                       // вывод ошибок на экранб в браузер
        port: 4200,
        hot: isDev,                                                          // если разработка - true, должна быть
        historyApiFallback: true,                                            // отдаем по любому url главный html файл - index.html
    },
    devtool: isDev ? 'source-map' : '', // '' // 'source-map'
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './templates/main-page.html',
            minify: {
                collapseWhitespace: !isProd
            },
            inject: true,
        }),
        new HTMLWebpackPlugin({
            filename: 'news.html',
            template: './templates/news-page.html',
            minify: {
                collapseWhitespace: !isProd
            },
            inject: true,
        }),
        new webpack.ProvidePlugin({
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            jQuery: 'jquery',
            $: 'jquery',
            // 'window.Swiper': 'swiper',
            // Swiper: 'swiper'
            // '$.debounce': 'throttle_debounce',
            // '$.throttle': 'throttle_debounce',
            // 'jQuery.throttle': 'throttle_debounce',
            // 'jQuery.debounce': 'throttle_debounce'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/images/**/*').replace(/\\/g, "/"), // в win пути с другими слэшами
                    to: path.resolve(__dirname, './dist/'),
                },
            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'css/' + filename('css')                            // filename('css') // 'assets/css/' + filename('css')
        }),
        // new HtmlWebpackPlugin(),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'jquery',
                    entry: 'https://code.jquery.com/jquery-3.4.1.min.js',
                    global: 'jQuery',
                },
                // {
                //     module: 'lottie',
                //     entry: 'https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.3/lottie_svg.min.js',
                //     global: 'lottie',
                // },
                {
                    module: 'map2gis',
                    entry: 'https://maps.api.2gis.ru/2.0/loader.js?pkg=full',
                    global: 'map2gis',
                },
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        }
                    },
                    // {
                    //     loader: 'image-webpack-loader',
                    //     options: {
                    //         mozjpeg: {
                    //             progressive: true,
                    //             quality: 65
                    //         },
                    //         optipng: {
                    //             optimizationLevel: 7,
                    //         },
                    //         pngquant: {
                    //             quality: [0.65, 0.90],
                    //             speed: 4
                    //         },
                    //         gifsicle: {
                    //             interlaced: false,
                    //         },
                    //         webp: {
                    //             quality: 75
                    //         }
                    //     }
                    // }
                ]
            },
            {
                test: /\.(pdf|txt|doc|docx)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                use: [
                    'json-loader',
                ],
                type: 'javascript/auto'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, 'src/templates'),
                use: [
                    'raw-loader',
                ]
            },
            {
                test: /\.hbs/,
                loader: 'handlebars-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.mp4/,
                loader: 'file-loader',
            }
        ]
    }
}