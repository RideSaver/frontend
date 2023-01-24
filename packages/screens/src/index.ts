/**
 * Reexports Screens from their respective files for easy access, as well as defining some properties for routing to specific screens.
 * @author Elias Schablowski
 * @format
 */

export { default as Login } from "./Login";
export { default as SignUp } from "./SignUp";

export { default as Request } from "./Request";
export { default as Estimates } from "./Estimates";

import type { PathConfigMap, RootParamList } from "@react-navigation/core";

export const paths: PathConfigMap<RootParamList> = {
    Estimates: {
        path: "/estimates",
    },
    Request: "/request",
    SignUp: "/signup",
    Login: "/login",
};
