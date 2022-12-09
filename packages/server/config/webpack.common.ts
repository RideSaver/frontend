import * as path from "path";
import * as fs from "fs";
import webpack from "webpack";
import CopyPlugin from "copy-webpack-plugin";
console.log(path.dirname(require.resolve("@RideSaver/web/build/manifest.json")));
const imageInlineSizeLimit = 32;
export default {
    target: "node",
    context: path.resolve(__dirname, ".."),
    entry: {
        cli: "./src/cli.ts",
    },
    output: {
        path: path.resolve(__dirname, "..", "build"),
        libraryTarget: "commonjs",
        clean: true
    },
    externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
    // externals: [nodeExternals({
    //     allowlist: [/^@RideSaver\//],
    //     additionalModuleDirs: [path.resolve(__dirname, "..", "..", "..", "node_modules")]
    // })], // in order to ignore all modules in node_modules folder
    resolve: {
        alias: {
            'react-native': 'react-native-web',
        },
        extensions: [
            '.node.mjs',
            '.web.mjs',
            '.mjs',
            '.node.js',
            '.web.js',
            '.js',
            '.node.ts',
            '.web.ts',
            '.ts',
            '.node.tsx',
            '.web.tsx',
            '.tsx',
            '.json',
            '.node.jsx',
            '.web.jsx',
            '.jsx',
          ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: "#!/usr/local/bin/node",
            raw: true,
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.dirname(require.resolve("@RideSaver/web/build/manifest.json")),
                    to: "public",
                }
            ]
        })
    ],
    module: {
        strictExportPresence: true,
        rules: [
            // Handle node_modules packages that contain sourcemaps
            {
                enforce: "pre",
                exclude: /@babel(?:\/|\\{1,2})runtime/,
                test: /\.(js|mjs|jsx|ts|tsx|css)$/,
                loader: require.resolve("source-map-loader"),
            },
            {
                // "oneOf" will traverse all following loaders until one will
                // match the requirements. When no loader matches it will fall
                // back to the "file" loader at the end of the loader list.
                oneOf: [
                    // TODO: Merge this config once `image/avif` is in the mime-db
                    // https://github.com/jshttp/mime-db
                    {
                        test: [/\.avif$/],
                        type: "asset",
                        mimetype: "image/avif",
                        parser: {
                            dataUrlCondition: {
                                maxSize: imageInlineSizeLimit,
                            },
                        },
                    },
                    // "url" loader works like "file" loader except that it embeds assets
                    // smaller than specified limit in bytes as data URLs to avoid requests.
                    // A missing `test` is equivalent to a match.
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        type: "asset",
                        parser: {
                            dataUrlCondition: {
                                maxSize: imageInlineSizeLimit,
                            },
                        },
                    },
                    {
                        test: /\.svg$/,
                        use: [
                            {
                                loader: require.resolve("@svgr/webpack"),
                                options: {
                                    prettier: false,
                                    svgo: false,
                                    svgoConfig: {
                                        plugins: [{ removeViewBox: false }],
                                    },
                                    titleProp: true,
                                    ref: true,
                                },
                            },
                            {
                                loader: require.resolve("file-loader"),
                                options: {
                                    name: "static/media/[name].[hash].[ext]",
                                },
                            },
                        ],
                        issuer: {
                            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
                        },
                    },
                    // Process application JS with Babel.
                    // The preset includes JSX, Flow, TypeScript, and some ESnext features.
                    {
                        test: /\.(js|mjs|jsx|ts|tsx)$/,
                        include: (p) => {
                            return !fs.realpathSync(p).includes("node_modules");
                        },
                        loader: require.resolve("babel-loader"),
                        options: {
                            customize: require.resolve(
                                "babel-preset-react-app/webpack-overrides"
                            ),
                            presets: [
                                [
                                    require.resolve("babel-preset-react-app"),
                                    {
                                        runtime: "automatic",
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
                        loader: require.resolve("babel-loader"),
                        options: {
                            babelrc: false,
                            configFile: false,
                            compact: false,
                            presets: [
                                "@babel/preset-react",
                                [
                                    require.resolve(
                                        "babel-preset-react-app/dependencies"
                                    ),
                                    { helpers: true },
                                ],
                            ],
                            cacheDirectory: true,
                            // See #6846 for context on why cacheCompression is disabled
                            cacheCompression: false,

                            // Babel sourcemaps are needed for debugging into node_modules
                            // code.  Without the options below, debuggers like VSCode
                            // show incorrect code and set breakpoints on the wrong lines.
                            sourceMaps: true,
                            inputSourceMap: true,
                        },
                    },
                    {
                      test: /\.node$/,
                      loader: "node-loader",
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
                        exclude: [
                            /^$/,
                            /\.(js|mjs|jsx|ts|tsx)$/,
                            // /\.html$/,
                            /\.json$/,
                        ],
                        type: "asset/resource",
                    }
                    // ** STOP ** Are you adding a new loader?
                    // Make sure to add the new loader(s) before the "file" loader.
                ],
            },
        ].filter(Boolean),
    },
    experiments: {
        topLevelAwait: true,
    },
} as webpack.Configuration;
