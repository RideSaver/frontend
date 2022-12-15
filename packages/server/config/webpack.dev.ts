import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import commonConfig from "./webpack.common";
import nodeExternals from "webpack-node-externals";

process.env.NODE_ENV = "development";

export default merge(commonConfig, {
    mode: "development",
    devtool: "eval-source-map",
    externals: [nodeExternals({
        allowlist: [/^@RideSaver\//],
        additionalModuleDirs: [path.resolve(__dirname, "..", "..", "..", "node_modules")]
    })], // in order to ignore all modules in node_modules folder
}) as webpack.Configuration;
