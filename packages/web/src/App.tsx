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
import { NativeBaseProvider, Spinner, Button, Box } from "native-base";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useDispatch, useSelector, user } from "@RideSaver/store";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { language } from "@RideSaver/store";
import { LinearGradient } from "expo-linear-gradient";
import IconSet from 'react-native-vector-icons/MaterialCommunityIcons';

const config = {
    dependencies: {
      'linear-gradient': LinearGradient
    }
};
const Drawer = createDrawerNavigator();

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
        <NativeBaseProvider config={config}>
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
            <Drawer.Navigator
                screenListeners={{
                    transitionStart: () => console.log("Transition"),
                }}
            >
                {token === undefined ? (
                    // No token found, user isn't signed in
                    <Drawer.Group navigationKey={"guest"}>
                        <Drawer.Screen
                            name="Request"
                            component={Screens.Request}
                            options={({ navigation }) => ({ 
                                title: t(i18n)`Request Details`,
                                headerTitleAlign: "center",
                                headerStyle:{
                                  backgroundColor: '#27272a',
                                  borderBottomColor: '#0077e6',
                                },
                                headerTitleStyle:{
                                    fontFamily: "Roboto",
                                    fontWeight: "bold",
                                    color: "#f0f9ff",
                                },
                                headerRight: () => (
                                    <IconSet name="menu" size={21} color="#E0E0E0"
                                    onPress={() => navigation.navigate('Home')}
                                  />
                                ),
                            })}
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
                            name="Home"
                            component={Screens.Home}
                            options={{
                                title: t(i18n)`Home`,
                            }}
                        />
                    </Drawer.Group>
                )}
            </Drawer.Navigator>
        </NavigationContainer>
        </NativeBaseProvider>
    );
}
