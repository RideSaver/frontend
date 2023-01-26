/**
 * Provider and Screen configuration for the web based application
 * @author Elias Schablowski
 * @format
 */

import "./App.css";

import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Screens from "@RideSaver/screens";
import { Spinner, Icon, useColorMode, useColorModeValue } from "native-base";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useDispatch, useSelector, user, language } from "@RideSaver/store";

import { createStackNavigator } from "@react-navigation/stack";

import { NavigationTheme } from "./theme";
import Home from "./navigators/Home";
import Authentication from "./navigators/Authentication";

const Drawer = createStackNavigator();

export default function App() {
    const { i18n } = useLingui();
    const dispatch = useDispatch();
    const isLoading = useSelector(user.getIsLoading) as boolean;
    const token = useSelector(user.getToken) as boolean;
    useEffect(() => {
        dispatch(language.switchLocale("en-US"));
    }, [dispatch]);
    const navigaionTheme = useColorModeValue(
        NavigationTheme.Light,
        NavigationTheme.Dark
    );

    if (isLoading) {
        // We haven't finished checking for the token yet
        return <Spinner />;
    }

    return (
        <NavigationContainer
            linking={{
                prefixes: [
                    ...["https://", "http://", "//", ""].map(
                        (protocol) => protocol + window.location.host
                    ),
                ],
                config: {
                    screens: {
                        Home: {
                            screens: {
                                Estimates: "/estimates",
                                Request: "/request/:id",
                            },
                        },
                        Authentication: {
                            screens: {
                                SignUp: "/signup",
                                Login: "/login",
                            }
                        }
                    },
                },
            }}
            documentTitle={{
                formatter: (options, route) =>
                    t(i18n)`${options?.title ?? route?.name} - RideSaver`,
            }}
            theme={navigaionTheme}
        >
            <Drawer.Navigator
                initalRouteName={token === undefined ? "Authentication" : "Home"}
                options={{
                    headerShown: false
                }}
            >
                {token === undefined ? (
                    <Drawer.Screen name="Authentication" component={Authentication} />
                ) : (
                    <Drawer.Screen name="Home" component={Home} />
                )}
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
