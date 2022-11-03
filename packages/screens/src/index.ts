export { default as Login } from "./Login";
export { default as SignUp } from "./SignUp";

export { default as Home } from "./Home";

import type {PathConfigMap} from "@react-navigation/core";

export const paths: PathConfigMap<ReactNavigation.RootParamList> = {
    Home: {
        path: "/"
    },
    SignUp: {
        path: "/signup"
    },
    Login: {
        path: "/login"
    }
};