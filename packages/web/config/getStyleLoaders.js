const paths = require("./paths");

module.exports = function getStyleLoaders(isEnvDevelopment, cssOptions, preProcessor) {
    const isEnvProduction = !isEnvDevelopment;
    const loaders = [
        isEnvDevelopment && require.resolve('style-loader'),
        isEnvProduction && {
            loader: MiniCssExtractPlugin.loader,
            // css is located in `static/css`, use '../../' to locate index.html folder
            // in production `paths.publicUrlOrPath` can be a relative path
            options: paths.publicUrlOrPath.startsWith('.')
                ? { publicPath: '../../' }
                : {},
        },
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        },
        {
            // Options for PostCSS as we reference these options twice
            // Adds vendor prefixing based on your specified browser support in
            // package.json
            loader: require.resolve('postcss-loader'),
            options: {
                postcssOptions: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebook/create-react-app/issues/2677
                    ident: 'postcss',
                    config: false,
                    plugins: [
                        'postcss-flexbugs-fixes',
                        [
                            'postcss-preset-env',
                            {
                                autoprefixer: {
                                    flexbox: 'no-2009',
                                },
                                stage: 3,
                            },
                        ],
                        // Adds PostCSS Normalize as the reset css with default options,
                        // so that it honors browserslist config in package.json
                        // which in turn let's users customize the target behavior as per their needs.
                        'postcss-normalize',
                    ],
                },
                sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
            },
        },
    ].filter(Boolean);
    if (preProcessor) {
        loaders.push(
            {
                loader: require.resolve('resolve-url-loader'),
                options: {
                    sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
                    root: paths.appSrc,
                },
            },
            {
                loader: require.resolve(preProcessor),
                options: {
                    sourceMap: true,
                },
            }
        );
    }
    return loaders;
};
