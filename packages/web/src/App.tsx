/**
 * Provider and Screen configuration for the web based application
 * @author Elias Schablowski
 * @format
 */

import "./App.css";

import React, { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as Screens from "@RideSaver/screens";
import { Spinner, Icon, useColorMode, useColorModeValue } from "native-base";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useDispatch, useSelector, user, language } from "@RideSaver/store";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { CustomDrawer } from "@RideSaver/components";
import { NavigationTheme } from "./theme";

const Drawer = createDrawerNavigator();

export default function App() {
    const { i18n } = useLingui();
    const dispatch = useDispatch();
    const isLoading = useSelector(user.getIsLoading) as boolean;
    const token = useSelector(user.getToken) as boolean;
    const dimensions = useWindowDimensions();
    const { toggleColorMode } = useColorMode();
    useEffect(() => {
        dispatch(language.switchLocale("en-US"));
    }, [dispatch]);
    const navigaionTheme = useColorModeValue(
        NavigationTheme.Light,
        NavigationTheme.Dark
    );
    const colorMode = useColorModeValue("light", "dark");

    if (isLoading) {
        // We haven't finished checking for the token yet
        return <Spinner />;
    }
    console.log(navigaionTheme);

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
            theme={navigaionTheme}
        >
            <Drawer.Navigator
                screenListeners={{
                    transitionStart: () => console.log("Transition"),
                }}
                initalRouteName={token === undefined ? "Login" : "Estimates"}
                useLegacyImplementation
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Icon
                            name="menu"
                            onPress={() => navigation.openDrawer()}
                        />
                    ),
                    drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
                })}
                drawerContent={(props) => (
                    <CustomDrawer
                        {...props}
                        toggleColorMode={toggleColorMode}
                        colorMode={colorMode}
                    />
                )}
            >
                {token === undefined ? (
                    // No token found, user isn't signed in
                    <Drawer.Group navigationKey={"guest"}>
                        <Drawer.Screen
                            name="Request"
                            component={Screens.Request}
                            options={{
                                title: t(i18n)`Ride Details`,
                            }}
                        />
                        <Drawer.Screen
                            name="Login"
                            component={Screens.Login}
                            options={{
                                title: t(i18n)`Log in`,
                            }}
                        />
                        <Drawer.Screen
                            name="SignUp"
                            component={Screens.SignUp}
                            options={{
                                title: t(i18n)`Sign Up`,
                            }}
                        />
                    </Drawer.Group>
                ) : (
                    // User is signed in
                    <Drawer.Group navigationKey={"user"}>
                        <Drawer.Screen
                            name="Estimates"
                            component={Screens.Estimates}
                            options={{
                                title: t(i18n)`Estimates`,
                            }}
                        />
                    </Drawer.Group>
                )}
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
