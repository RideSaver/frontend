/**
 * Provider and Screen configuration for the web based application
 * @author Elias Schablowski
 * @format
 */

import "./App.css";

import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import * as Screens from "@RideSaver/screens";
import { Spinner } from "native-base";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useDispatch, useSelector, user } from "@RideSaver/store";

import { createStackNavigator } from "@react-navigation/stack";

import { language } from "@RideSaver/store";

const Stack = createStackNavigator();

export default function App() {
    const { i18n } = useLingui();
    const dispatch = useDispatch();
    const isLoading = useSelector(user.getIsLoading) as boolean;
    const token = useSelector(user.getToken) as boolean;

    const scheme = useColorScheme();
    console.log(scheme);
    useEffect(() => {
        dispatch(language.switchLocale("en-US"));
    }, [dispatch]);

    if (isLoading) {
        // We haven't finished checking for the token yet
        return <Spinner />;
    }

    return (
        <NavigationContainer
            linking={{
                prefixes: [
                    "ridesaver://",
                    ...["https://", "http://", "//", ""].map(
                        (protocol) => protocol + window.location.host
                    ),
                ],
                config: {
                    screens: Screens.paths,
                },
            }}
            documentTitle={{
                formatter: (options, route) =>
                    t(i18n)`${options?.title ?? route?.name} - RideSaver`,
            }}
        >
            <Stack.Navigator
                screenListeners={{
                    transitionStart: () => console.log("Transition"),
                }}
            >
                {token === undefined ? (
                    // No token found, user isn't signed in
                    <Stack.Screen
                        name="Login"
                        component={Screens.Login}
                        options={{
                            title: t(i18n)`Log in`,
                        }}
                    />
                ) : (
                    // User is signed in
                    <Stack.Screen
                        name="Home"
                        component={Screens.Home}
                        options={{
                            title: t(i18n)`Home`,
                        }}
                    />
                )}
                <Stack.Screen
                    name="SignUp"
                    component={Screens.SignUp}
                    options={{
                        title: t(i18n)`Sign Up`,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
