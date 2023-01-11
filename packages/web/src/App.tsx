/**
 * Provider and Screen configuration for the web based application
 * @author Elias Schablowski
 * @format
 */

import "./App.css";

import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { Provider as ReduxProvider } from "react-redux";
import * as Screens from "@RideSaver/screens";
import { store } from "@RideSaver/store";
import { Spinner, NativeBaseProvider } from "native-base";
import { I18nProvider } from "@lingui/react";
import i18n from "@RideSaver/internationalization";
import { t } from "@lingui/macro";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { language } from "@RideSaver/store";

export default function App() {
    const state = store.getState();
    const scheme = useColorScheme();
    console.log(scheme);
    useEffect(() => {
        store.dispatch(language.switchLocale("en-US"));
    }, []);

    if (state.auth.isLoading) {
        // We haven't finished checking for the token yet
        return <Spinner />;
    }

    const Stack = createNativeStackNavigator();

    return (
        <NativeBaseProvider>
            <I18nProvider i18n={i18n}>
                <ReduxProvider store={store}>
                    <NavigationContainer
                        linking={{
                            prefixes: [
                                "ridesaver://",
                                ...["https://", "http://", "//", ""].map(
                                    (protocol) =>
                                        protocol + window.location.host
                                ),
                            ],
                            config: {
                                screens: Screens.paths,
                            },
                        }}
                        documentTitle={{
                            formatter: (options, route) =>
                                t(i18n)`${
                                    options?.title ?? route?.name
                                } - RideSaver`,
                        }}
                    >
                        <Stack.Navigator
                            screenListeners={{
                                transitionStart: () =>
                                    console.log("Transition"),
                            }}
                        >
                            {state.auth.token === undefined ? (
                                // No token found, user isn't signed in
                                <>
                                    <Stack.Screen
                                        name="Login"
                                        component={Screens.Login}
                                        options={{
                                            title: t(i18n)`Log in`,
                                        }}
                                    />
                                    <Stack.Screen
                                        name="SignUp"
                                        component={Screens.SignUp}
                                        options={{
                                            title: t(i18n)`Sign Up`,
                                        }}
                                    />
                                </>
                            ) : (
                                // User is signed in
                                <>
                                    <Stack.Screen
                                        name="Home"
                                        component={Screens.Home}
                                        options={{
                                            title: t(i18n)`Home`,
                                        }}
                                    />
                                </>
                            )}
                        </Stack.Navigator>
                    </NavigationContainer>
                </ReduxProvider>
            </I18nProvider>
        </NativeBaseProvider>
    );
}
