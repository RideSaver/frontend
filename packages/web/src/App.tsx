/**
 * Provider and Screen configuration for the web based application
 * @author Elias Schablowski
 * @format
 */

import "./App.css";

import React, { useCallback, useEffect } from "react";
import { useColorScheme } from "react-native";
import { Provider as ReduxProvider } from "react-redux";
import * as Screens from "@RideSaver/screens";
import { store } from "@RideSaver/store";
import { ActivityIndicator } from "react-native-paper";
import { I18nProvider } from "@lingui/react";
import i18n from "@RideSaver/internationalization";
import { t } from "@lingui/macro";
import { Provider as PaperProvider, Surface } from "react-native-paper";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import * as Themes from "./themes";
import { language } from "@RideSaver/store";

export default function App() {
    const state = store.getState();
    const scheme = useColorScheme();
    console.log(scheme);
    const theme = scheme === "dark" ? Themes.dark : Themes.light;
    useEffect(() => {
        store.dispatch(language.switchLocale("en-US"));
    }, []);
    useEffect(() => {
        if (typeof document !== "undefined")
        {
            document.body.style.backgroundColor = theme.colors.backdrop;
            document.getElementById("root").style.backgroundColor = theme.colors.background;
        }

    }, [theme.colors.background]);

    if (state.auth.isLoading) {
        // We haven't finished checking for the token yet
        return <ActivityIndicator />;
    }

    const Stack = createNativeStackNavigator();

    return (
        <PaperProvider
            settings={{
                icon: (props) => <MaterialIcon {...props} />,
            }}
            theme={theme}
        >
            <I18nProvider i18n={i18n}>
                <ReduxProvider store={store}>
                    <div style={{ backgroundColor: theme.colors.primaryContainer }}>
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
                            theme={theme}
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
                    </div>
                </ReduxProvider>
            </I18nProvider>
        </PaperProvider>
    );
}
