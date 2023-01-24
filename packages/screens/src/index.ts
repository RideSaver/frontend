/**
 * Reexports Screens from their respective files for easy access, as well as defining some properties for routing to specific screens.
 * @author Elias Schablowski
 * @format
 */

export { default as Login } from "./Login";
export { default as SignUp } from "./SignUp";

export { default as Request } from "./Request";
export { default as Home } from "./Home";

import type { PathConfigMap } from "@react-navigation/core";

export const paths: PathConfigMap<ReactNavigation.RootParamList> = {
    Home: {
        path: "/",
    },
    Request: "/request",
    SignUp: "/signup",
    Login: "/login",
};
