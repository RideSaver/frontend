

import React from "react";
import { Icon, useColorMode, useColorModeValue } from "native-base";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawer } from "@RideSaver/components";
import { useLingui } from "@lingui/react";
import { t } from "@lingui/macro";
import * as Screens from "@RideSaver/screens";

const AuthDrawer = createDrawerNavigator();
    
export default function Authentication() {

        const { toggleColorMode } = useColorMode();
        const colorMode = useColorModeValue("light", "dark");
        const { i18n } = useLingui();

    return( 
                <AuthDrawer.Navigator
                    useLegacyImplementation
                    screenOptions={({ navigation }) => ({ headerLeft: () => ( <Icon name="menu" onPress={() => navigation.openDrawer()} />), })}       
                    drawerContent={(props) => ( <CustomDrawer {...props} toggleColorMode={toggleColorMode} colorMode={colorMode} />)}
                >
                        <AuthDrawer.Screen name="Login" component={Screens.Login} options={{ title: t(i18n)`Sign in.` }}/>
                        <AuthDrawer.Screen name="SignUp" component={Screens.Request} options={{title: t(i18n)`Sign up.` }}/>
                </AuthDrawer.Navigator>
)}

