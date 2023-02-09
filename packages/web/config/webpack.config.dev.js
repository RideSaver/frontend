const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const paths = require('./paths');

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const getStyleLoaders = require("./getStyleLoaders");
const { DefinePlugin } = require("webpack");

/** @type {import('webpack').Configuration} */
const devConfig = {
    mode: "development",
    module: {
        rules: [
            {
                oneOf: [
                    // "postcss" loader applies autoprefixer to our CSS.
                    // "css" loader resolves paths in CSS and adds assets as dependencies.
                    // "style" loader turns CSS into JS modules that inject <style> tags.
                    // In production, we use MiniCSSExtractPlugin to extract that CSS
                    // to a file, but in development "style" loader enables hot editing
                    // of CSS.
                    // By default we support CSS Modules with the extension .module.css
                    {
                        test: cssRegex,
                        exclude: cssModuleRegex,
                        use: getStyleLoaders(true, {
                            importLoaders: 1,
                            sourceMap: true,
                            modules: {
                                mode: 'icss',
                            },
                        }),
                        // Don't consider CSS imports dead code even if the
                        // containing package claims to have no side effects.
                        // Remove this when webpack adds a warning or an error for this.
                        // See https://github.com/webpack/webpack/issues/6571
                        sideEffects: true,
                    },
                    // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
                    // using the extension .module.css
                    {
                        test: cssModuleRegex,
                        use: getStyleLoaders(true, {
                            importLoaders: 1,
                            sourceMap: true,
                            modules: {
                                mode: 'local',
                                getLocalIdent: getCSSModuleLocalIdent,
                            },
                        }),
                    },
                    // Opt-in support for SASS (using .scss or .sass extensions).
                    // By default we support SASS Modules with the
                    // extensions .module.scss or .module.sass
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: getStyleLoaders(true,
                            {
                                importLoaders: 3,
                                sourceMap: true,
                                modules: {
                                    mode: 'icss',
                                },
                            },
                            'sass-loader'
                        ),
                        // Don't consider CSS imports dead code even if the
                        // containing package claims to have no side effects.
                        // Remove this when webpack adds a warning or an error for this.
                        // See https://github.com/webpack/webpack/issues/6571
                        sideEffects: true,
                    },
                    // Adds support for CSS Modules, but using SASS
                    // using the extension .module.scss or .module.sass
                    {
                        test: sassModuleRegex,
                        use: getStyleLoaders(true,
                            {
                                importLoaders: 3,
                                sourceMap: true,
                                modules: {
                                    mode: 'local',
                                    getLocalIdent: getCSSModuleLocalIdent,
                                },
                            },
                            'sass-loader'
                        ),
                    },
                    // "file" loader makes sure those assets get served by WebpackDevServer.
                    // When you `import` an asset, you get its (virtual) filename.
                    // In production, they would get copied to the `build` folder.
                    // This loader doesn't use a "test" so it will catch all modules
                    // that fall through the other loaders.
                    {
                        // Exclude `js` files to keep "css" loader working as it injects
                        // its runtime that would otherwise be processed through "file" loader.
                        // Also exclude `html` and `json` extensions so they get processed
                        // by webpacks internal loaders.
                        exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                        type: 'asset/resource',
                    },
                ]
            }
        ]
    },
    plugins: [
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
        }),
        // Watcher doesn't work well if you mistype casing in a path so we use
        // a plugin that prints an error when you attempt to do this.
        // See https://github.com/facebook/create-react-app/issues/240
        new CaseSensitivePathsPlugin(),
        // Define __DEV__
        new DefinePlugin({
            "__DEV__": true,
            "process.env.__MAPBOX_API_TOKEN__": `"${process.env.MAPBOX_TOKEN}"`
        }),
    ],
    performance: {
        hints: "warning"
    },
    // Just here in case a package has source maps, but no original source files
    ignoreWarnings: [/Failed to parse source map/],
    devServer: require("./webpackDevServer.config.base"),
}

module.exports = merge(require("./webpack.config.common"), devConfig);
