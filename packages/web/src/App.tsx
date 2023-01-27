/**
 * Provider and Screen configuration for the web based application
 * @author Elias Schablowski
 * @format
 */

import "./App.css";

import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Spinner, useColorModeValue } from "native-base";
import { useDispatch, useSelector, user, language } from "@RideSaver/store";

import Home from "./navigators/Home";
import Authentication from "./navigators/Authentication";
import * as Screens from "@RideSaver/screens";
import { NavigationTheme } from "./theme";

import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { createDrawerNavigator } from "@react-navigation/drawer";

const RootDrawer = createDrawerNavigator();

export default function App() {

    const { i18n } = useLingui();
    const dispatch = useDispatch();
    const isLoading = useSelector(user.getIsLoading) as boolean;
    const token = useSelector(user.getToken) as boolean;

    useEffect(() => { dispatch(language.switchLocale("en-US"));}, [dispatch]);

    const navigationTheme = useColorModeValue( NavigationTheme.Light, NavigationTheme.Dark);

    if (isLoading) {  return <Spinner />; }   
        
    return (
        <NavigationContainer
            documentTitle={{ formatter: (options, route) => t(i18n)`${options?.title ?? route?.name} - RideSaver`}}
            theme={navigationTheme}
            linking={{ prefixes: [...["https://", "http://", "//", ""].map((protocol) => protocol + window.location.host),],
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
            }}>
            <RootDrawer.Navigator
                initialRouteName={token === undefined ? "Authentication" : "Home"}
                screenOptions={{ headerShown: false }}
            >       
               {token === undefined ? (<RootDrawer.Screen name="Authentication" component={Authentication} /> ) : ( <RootDrawer.Screen name="Home" component={Home} />)}
            </RootDrawer.Navigator>
        </NavigationContainer>
    );
}


