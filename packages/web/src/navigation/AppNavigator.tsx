import React, {useState} from "react";
import { Button, Icon, useColorMode, useColorModeValue } from "native-base";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawer } from "@RideSaver/components";
import { useLingui } from "@lingui/react";
import { t } from "@lingui/macro";

import { Login } from "@RideSaver/screens";
import { SignUp } from "@RideSaver/screens";
import { Estimates } from "@RideSaver/screens";
import { Request } from "@RideSaver/screens";
import { createStackNavigator } from "@react-navigation/stack";
import {  NavigationContainer } from "@react-navigation/native";
import { NavigationTheme } from "../theme";
import { i18n } from "@lingui/core";


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
    
const SignupStack = createStackNavigator(); // Signup Screen
function SignupStackScreen() { 
    return( 
            <SignupStack.Navigator screenOptions={{ headerShown: false }}>
                <SignupStack.Screen name="SignUp" component={SignUp} />
            </SignupStack.Navigator>
        );}
    
const RootDrawer = createDrawerNavigator(); // Root Drawer Navigator
function HomeTabs( {token} : {token: boolean} ) {
        
        const { toggleColorMode } = useColorMode();
        const colorMode = useColorModeValue("light", "dark");
        const { i18n } = useLingui();

return( <RootDrawer.Navigator
                useLegacyImplementation
                initialRouteName={token === undefined ? "Login" : "Estimates"}
                screenOptions={({ navigation }) => ({ headerLeft: () => ( <Icon name="menu" onPress={() => navigation.openDrawer()} />), })}       
                drawerContent={(props) => ( <CustomDrawer {...props} toggleColorMode={toggleColorMode} colorMode={colorMode} />)}>

                                    {token === undefined ? (<RootDrawer.Group navigationKey={"guest"}>
            
                        <RootDrawer.Screen name="Login" component={LoginStackScreen} options={{ title: t(i18n)`Login` }}/>
                        <RootDrawer.Screen name="SignUp" component={SignupStackScreen} options={{title: t(i18n)`Register` }}/>
                  
                                        </RootDrawer.Group>):(<RootDrawer.Group navigationKey="{user}">
                                            
                        <RootDrawer.Screen name="Estimates" component={EstimateStackScreen} options={{ title: t(i18n)`Rides & Services`}} />
                        <RootDrawer.Screen name="Request" component={RequestStackScreen} options={{ title: t(i18n)`Ride Details`}}  />

                                                            </RootDrawer.Group>)}
        
        </RootDrawer.Navigator>
    )
}

const RootStack = createStackNavigator(); // Root Stack Navigator
export default function AppNavigator({ token } : {token : boolean} ) {

    const [userToken, setUserToken] = useState(token); // TODO -> Update user JWT token for nav-groups.
    const navigationTheme = useColorModeValue( NavigationTheme.Light, NavigationTheme.Dark);

    return( 
        <NavigationContainer
            theme={navigationTheme}
            documentTitle= {{ formatter: (options, route) => t(i18n)`${options?.title ?? route?.name} - RideSaver` }}>

                <RootStack.Navigator screenOptions={{ headerShown: false }}>
                            <RootStack.Screen 
                            name="HomeTabs" 
                            component={HomeTabs}  
                            options= {({ route, navigation }) =>  ({ headerLeft: () => <Button onPress={navigation.navigate(route, { token: {userToken}})}/>})}
                            />
                </RootStack.Navigator>
                
        </NavigationContainer>
    );
}
