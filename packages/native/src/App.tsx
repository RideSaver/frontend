/**
 * The main provider and screen setup for the ReactNative app.
 * @author Elias Schablowski
 * @format
 */

import React from "react";
import { View, useColorScheme, StyleSheet } from "react-native";
import { Provider as ReduxProvider } from "react-redux";
import * as Screens from "@RideSaver/screens";
import { store } from "@RideSaver/store";
import { Spinner, NativeBaseProvider } from "native-base";
import { I18nProvider } from "@lingui/react";
import i18n from "@RideSaver/internationalization";
import { t } from "@lingui/macro";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import * as Themes from "./themes";

export default function App() {
    const state = store.getState();
    const scheme = useColorScheme();
    const theme = scheme === "dark" ? Themes.dark : Themes.light;

    if (state.auth.isLoading) {
        // We haven't finished checking for the token yet
        return <Spinner />;
    }

    const Stack = createNativeStackNavigator();

    const backgroundStyle = StyleSheet.create({
        backgroundContainer: {
            backgroundColor: theme.colors.background,
        },
    });

    return (
        <NativeBaseProvider>
            <View style={backgroundStyle.backgroundContainer}>
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
                            theme={theme}
                        >
                            <Stack.Navigator>
                                {state.user.token === undefined ? (
                                    // No token found, user isn't signed in
                                    <>
                                        <Stack.Screen
                                            name="Login"
                                            component={Screens.Login}
                                            options={{
                                                title: t(i18n)`Login`,
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
            </View>
        </NativeBaseProvider>
    );
}
