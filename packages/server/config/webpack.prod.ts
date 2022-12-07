import webpack from "webpack";
import merge from "webpack-merge";
import commonConfig from "./webpack.common";

process.env.NODE_ENV = "production";

export default merge(commonConfig, {
    mode: "production",
    devtool: "eval-source-map",
}) as webpack.Configuration;