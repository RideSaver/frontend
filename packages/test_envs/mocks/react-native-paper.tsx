/** @format */

import React from "react";
import { Text, TextInput, View } from "react-native";

const rnPaper =
    jest.requireActual<typeof import("react-native-paper")>(
        "react-native-paper"
    );

module.exports = {
    __esmodule: true,
    TextInput: ({ left, right, ...opts }) => (
        <>
            {left}
            <TextInput {...opts} />
            {right}
        </>
    ),
    HelperText: ({ visible, children, ...opts }) =>
        visible ? <Text {...opts}>{children}</Text> : <Text {...opts} />,
    useTheme: jest.fn(() => rnPaper.MD3LightTheme),
    ProgressBar: (props) => <View {...props}>{props.children}</View>,
    // React.createElement("ProgressBar", props, props.children),
};

module.exports.TextInput.Icon = (props) => {
    const elem = React.createElement("Icon", props, props.children);
    elem.type = "Icon";
    return elem;
};
