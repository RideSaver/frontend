import { jest } from "@jest/globals";
import React from "react";
export default jest.fn(({ children, ...props }) =>
    React.createElement("App", props, children)
);
