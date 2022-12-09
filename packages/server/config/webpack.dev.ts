import webpack from "webpack";
import merge from "webpack-merge";
import commonConfig from "./webpack.common";

process.env.NODE_ENV = "development";

export default merge(commonConfig, {
    mode: "development",
    devtool: "eval-source-map",
}) as webpack.Configuration;
