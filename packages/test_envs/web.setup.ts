/**
 * Define the react native Jest Enviroment
 * @TODO
 * @author Elias Schablowski
 * @format
 */

import { jest } from "@jest/globals";
import "react-native/jest/setup";

[
    "react-native-paper",
    "@react-native-async-storage/async-storage",
    "@ridesaver/internationalization",
    "@zxcvbn-ts/core",
].forEach((module) =>
    jest.mock(module, jest.requireActual(`./mocks/${module}`))
);

jest.mock("react-native", () => jest.requireActual("react-native-web"));
