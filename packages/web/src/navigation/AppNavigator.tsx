/**
 * Contains the application navigational components. 
 * @author Elias Schablowski & John Hanna
 * @format
 */

import React from "react";

import { Button, Icon, useColorMode, useColorModeValue, Spinner } from "native-base";
import { Login, SignUp, Estimates, Request } from "@RideSaver/screens";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { CustomDrawer } from "@RideSaver/components";
import { Provider, useSelector } from "react-redux";
import { store, user } from "@RideSaver/store";
import { NavigationTheme } from "../theme";
import { useLingui } from "@lingui/react";
import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";

const EstimateStack = createStackNavigator(); // Estimates Screen
function EstimateStackScreen() { 
    return(
            <EstimateStack.Navigator screenOptions={{ headerShown: false }}>
                <EstimateStack.Screen name="Estimates" component={Estimates} />
            </EstimateStack.Navigator>
        );}
        
const RequestStack = createStackNavigator(); // Requests Screen
function RequestStackScreen() { 
    return(
            <RequestStack.Navigator screenOptions={{ headerShown: false }}>
                <RequestStack.Screen name="Request" component={Request} />
            </RequestStack.Navigator>
        );}
    
const LoginStack = createStackNavigator(); // Login Screen
function LoginStackScreen() { 
    return(
            <LoginStack.Navigator screenOptions={{ headerShown: false }}>
                <LoginStack.Screen name="Login" component={Login} />            
            </LoginStack.Navigator>
        );}
    
const RegisterStack = createStackNavigator(); // Registration Screen
function RegisterStackScreen() { 
    return( 
            <RegisterStack.Navigator screenOptions={{ headerShown: false }}>
                <RegisterStack.Screen name="SignUp" component={SignUp} />
            </RegisterStack.Navigator>
        );}
    
const RootDrawer = createDrawerNavigator(); // Primary/Root Drawer Navigator
function HomeTabs() 
    {
        const isLoading = useSelector(user.getIsLoading) as boolean;
        const token = useSelector(user.getToken) as string;
        const { toggleColorMode } = useColorMode();
        const colorMode = useColorModeValue("light", "dark");
        const { i18n } = useLingui();

        if(isLoading) { return <Spinner/>; }

        return( 
        <RootDrawer.Navigator
            initialRouteName={token === undefined ? "Login" : "Estimates"} useLegacyImplementation
            screenOptions={({ navigation }) => ({ headerLeft: () => ( <Icon name="menu" onPress={() => navigation.openDrawer()}/>)})}       
            drawerContent={(props) => ( <CustomDrawer {...props} toggleColorMode={toggleColorMode} colorMode={colorMode}/>)}>
            {token === undefined ? 
                (
                    <RootDrawer.Group navigationKey={"guest"}>
                
                        <RootDrawer.Screen name="Login" component={LoginStackScreen} options={{ title: t(i18n)`Login` }}/>
                        <RootDrawer.Screen name="SignUp" component={RegisterStackScreen} options={{title: t(i18n)`Register` }}/>
            
                    </RootDrawer.Group> ):( <RootDrawer.Group navigationKey="{user}">
                                            
                        <RootDrawer.Screen name="Estimates" component={EstimateStackScreen} options={{ title: t(i18n)`Rides & Services` }}/>
                        <RootDrawer.Screen name="Request" component={RequestStackScreen} options={{ title: t(i18n)`Ride Details` }} />

                    </RootDrawer.Group>
                )
            }    
        </RootDrawer.Navigator>
    )
}

const RootStack = createStackNavigator(); // Primary/Root Stack Navigator
export default function AppNavigator() {

    const navigationTheme = useColorModeValue( NavigationTheme.Light, NavigationTheme.Dark);

    return( 
        <Provider store={store}>
            <NavigationContainer theme={navigationTheme}
                documentTitle= {{ formatter: (options, route) => t(i18n)`${options?.title ?? route?.name} - RideSaver` }}>

                    <RootStack.Navigator screenOptions={{ headerShown: false }}>

                                <RootStack.Screen 
                                name="HomeTabs" 
                                component={HomeTabs}  
                                options= {({ route, navigation }) =>  ({ headerLeft: () => <Button onPress={navigation.navigate(route)}/>})}
                                />

                    </RootStack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}