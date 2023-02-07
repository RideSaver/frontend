const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const paths = require('./paths');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
const getClientEnvironment = require('./env');
const fs = require('fs');

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const imageInlineSizeLimit = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);


const hasJsxRuntime = (() => {
    if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
        return false;
    }

    try {
        require.resolve('react/jsx-runtime');
        return true;
    } catch (e) {
        return false;
    }
})();

// We will provide `paths.publicUrlOrPath` to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
// Get environment variables to inject into our app.
const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

/** @type {import('webpack').Configuration} */
module.exports = {
    target: [
        "browserslist"
    ],
    entry: paths.appIndexJs,
    output: {
        path: paths.appBuild,
        filename: "static/js/[name].[contenthash:8].js",
        chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
        assetModuleFilename: 'static/media/[name].[hash][ext]',
        publicPath: paths.publicUrlOrPath,
    },
    resolve: {
        extensions: paths.moduleFileExtensions.map(ext => `.${ext}`),
        alias: {
            "react-native": "react-native-web",
            // "fs": false,
            // "module": false
        },
        plugins: [
            // PnpWebpackPlugin,
        ],
        fallback: {
            "os": require.resolve("os-browserify/browser")
        }
    },
    resolveLoader: {
        plugins: [
            // PnpWebpackPlugin.moduleLoader(module),
        ],
    },
    module: {
        rules: [
            { // Handle source maps in packages
                enforce: 'pre',
                exclude: /@babel(?:\/|\\{1,2})runtime/,
                test: /\.(js|mjs|jsx|ts|tsx|css)$/,
                loader: require.resolve('source-map-loader'),
            },
            {
                oneOf: [
                    // "url" loader works like "file" loader except that it embeds assets
                    // smaller than specified limit in bytes as data URLs to avoid requests.
                    // A missing `test` is equivalent to a match.
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                maxSize: imageInlineSizeLimit,
                            },
                        },
                    },
                    // Process TS with ts-loader before loading it into babel
                    {
                        test: /\.(ts|tsx)$/,
                        exclude: /.test./,
                        use: [
                            {
                                loader: "babel-loader",
                                options: {
                                    babelrc: false,
                                    configFile: false,
                                    compact: false,
                                    presets: [
                                        "@babel/preset-typescript",
                                        "@babel/preset-react"
                                    ],
                                    plugins: [
                                        "@babel/plugin-proposal-export-namespace-from",
                                        "macros"
                                    ],
                                    cacheDirectory: true,
                                    // See #6846 for context on why cacheCompression is disabled
                                    cacheCompression: false,
                                    // Babel sourcemaps are needed for debugging into node_modules
                                    // code.  Without the options below, debuggers like VSCode
                                    // show incorrect code and set breakpoints on the wrong lines.
                                    sourceMaps: shouldUseSourceMap,
                                    inputSourceMap: shouldUseSourceMap,
                                }
                            },
                            // {
                            //     loader: 'ts-loader',
                            //     options: {
                            //         experimentalFileCaching: true,
                            //         context: path.resolve(__dirname, ".."),
                            //         compilerOptions: {
                            //             jsx: "react"
                            //         }
                            //     },
                            // }
                        ]
                    },
                    // Process application JS with Babel.
                    // The preset includes JSX, Flow, TypeScript, and some ESnext features.
                    {
                        test: /\.(js|mjs|jsx|ts|tsx)$/,
                        include: (p) => {
                            return !p.includes("node_modules") || p.includes("@RideSaver/") || p.includes("@rnmapbox/maps");
                        },
                        loader: require.resolve('babel-loader'),
                        options: {
                            customize: require.resolve(
                                'babel-preset-react-app/webpack-overrides'
                            ),
                            presets: [
                                [
                                    require.resolve('babel-preset-react-app'),
                                    {
                                        runtime: hasJsxRuntime ? 'automatic' : 'classic',
                                    },
                                ],
                            ],
                            // This is a feature of `babel-loader` for webpack (not Babel itself).
                            // It enables caching results in ./node_modules/.cache/babel-loader/
                            // directory for faster rebuilds.
                            cacheDirectory: true,
                            // See #6846 for context on why cacheCompression is disabled
                            cacheCompression: false,
                        },
                    },
                    // Process any JS outside of the app with Babel.
                    // Unlike the application JS, we only compile the standard ES features.
                    {
                        test: /\.(js|mjs)$/,
                        exclude: /@babel(?:\/|\\{1,2})runtime/,
                        loader: require.resolve('babel-loader'),
                        options: {
                            babelrc: false,
                            configFile: false,
                            compact: false,
                            presets: [
                                '@babel/preset-react',
                                [
                                    require.resolve('babel-preset-react-app/dependencies'),
                                    { helpers: true },
                                ],
                            ],
                            cacheDirectory: true,
                            // See #6846 for context on why cacheCompression is disabled
                            cacheCompression: false,
                            // Babel sourcemaps are needed for debugging into node_modules
                            // code.  Without the options below, debuggers like VSCode
                            // show incorrect code and set breakpoints on the wrong lines.
                            sourceMaps: shouldUseSourceMap,
                            inputSourceMap: shouldUseSourceMap,
                        },
                    },
                ]
            }
        ]
    },
    plugins: [
        // Makes some environment variables available in index.html.
        // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
        // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
        // It will be an empty string unless you specify "homepage"
        // in `package.json`, in which case it will be the pathname of that URL.
        new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
        // This gives some necessary context to module not found errors, such as
        // the requesting resource.
        new ModuleNotFoundPlugin(paths.appPath),
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
        // It is absolutely essential that NODE_ENV is set to production
        // during a production build.
        // Otherwise React will be compiled in the very slow development mode.
        new webpack.DefinePlugin({
            process: {
                env: env.stringified['process.env'],
                cwd: () => "/"
            }
        }),
        // Generate an asset manifest file with the following content:
        // - "files" key: Mapping of all asset filenames to their corresponding
        //   output file so that tools can pick it up without having to parse
        //   `index.html`
        // - "entrypoints" key: Array of files which are included in `index.html`,
        //   can be used to reconstruct the HTML if necessary
        new WebpackManifestPlugin({
            fileName: 'asset-manifest.json',
            publicPath: paths.publicUrlOrPath,
            generate: (seed, files, entrypoints) => {
                const manifestFiles = files.reduce((manifest, file) => {
                    manifest[file.name] = file.path;
                    return manifest;
                }, seed);
                const entrypointFiles = entrypoints.main.filter(
                    fileName => !fileName.endsWith('.map')
                );

                return {
                    files: manifestFiles,
                    entrypoints: entrypointFiles,
                };
            },
        }),
        // Moment.js is an extremely popular library that bundles large locale files
        // by default due to how webpack interprets its code. This is a practical
        // solution that requires the user to opt into importing specific locales.
        // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
        // You can remove this if you don't use Moment.js:
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        }),
        new ESLintPlugin({
            // Plugin options
            extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
            formatter: require.resolve('react-dev-utils/eslintFormatter'),
            eslintPath: require.resolve('eslint'),
            failOnError: false,
            context: paths.appSrc,
            cache: true,
            cacheLocation: path.resolve(
                paths.appNodeModules,
                '.cache/.eslintcache'
            ),
            // ESLint class options
            cwd: paths.appPath,
            resolvePluginsRelativeTo: __dirname,
            baseConfig: {
                extends: [require.resolve('eslint-config-react-app/base')],
                rules: {
                    ...(!hasJsxRuntime && {
                        'react/react-in-jsx-scope': 'error',
                    }),
                },
            },
        }),
    ],
    // Just here in case a package has source maps, but no original source files
    ignoreWarnings: [/Failed to parse source map/]
}
