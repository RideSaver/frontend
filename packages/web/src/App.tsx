import React from "react";
import { useColorScheme } from "react-native";
import { Provider as ReduxProvider } from "react-redux";
import * as Screens from "@ridesaver/screens";
import { store } from "@ridesaver/store";
import { ActivityIndicator } from "react-native-paper";
import { I18nProvider } from "@lingui/react";
import i18n from "@ridesaver/internationalization";
import { t } from "@lingui/macro";
import { Provider as PaperProvider } from "react-native-paper";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import * as Themes from "./themes";

export default function App() {
    const state = store.getState();
    const scheme = useColorScheme();
    const theme = scheme === "dark" ? Themes.dark : Themes.light;
    console.log(theme.colors)

    if (state.user.isLoading) {
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
            <style type="text/css">
                {`@font-face {
                    font-family: 'MaterialCommunityIcons';
                    src: url(${require("react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf")}) format('truetype');
                    font-display: swap
                }
                body {
                    background-color: ${theme.colors.background}
                }`}
            </style>
        </PaperProvider>
    );
}
