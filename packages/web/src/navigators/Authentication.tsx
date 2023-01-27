import React from "react";
import { Icon, useColorMode, useColorModeValue } from "native-base";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";

import { CustomDrawer } from "@RideSaver/components";
import * as Screens from "@RideSaver/screens";

const Drawer = createDrawerNavigator();

export default function Authentication() {

    const { toggleColorMode } = useColorMode();
    const colorMode = useColorModeValue("light", "dark");
    const { i18n } = useLingui();
    
    return (
        <Drawer.Navigator
            useLegacyImplementation
            options={({ navigation }) => ({
                headerLeft: () => (
                    <Icon
                        name="menu"
                        onPress={() => {
                            console.log("a");
                            navigation.openDrawer();
                        }}
                    />
                ),
            })}
            drawerContent={(props) => (
                <CustomDrawer
                    {...props}
                    toggleColorMode={toggleColorMode}
                    colorMode={colorMode}
                />
            )}
        >
            <Drawer.Screen
                name="Login"
                component={Screens.Login}
                options={{
                    title: t(i18n)`Log In`,
                }}
            />
            <Drawer.Screen
                name="SignUp"
                component={Screens.SignUp}
                options={{
                    title: t(i18n)`Sign Up`,
                }}
            />
        </Drawer.Navigator>
    );
}
