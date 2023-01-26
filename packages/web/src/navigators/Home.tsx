import React from "react";
import { useWindowDimensions } from "react-native";
import { Icon, useColorMode, useColorModeValue } from "native-base";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";

import { CustomDrawer } from "@RideSaver/components";
import * as Screens from "@RideSaver/screens";

const Drawer = createDrawerNavigator();

export default function Home() {
    const dimensions = useWindowDimensions();
    const { toggleColorMode } = useColorMode();
    const colorMode = useColorModeValue("light", "dark");
    const { i18n } = useLingui();
    return (
        <Drawer.Navigator
            useLegacyImplementation
            options={({ navigation }) => ({
                headerLeft: () => (
                    <Icon name="menu" onPress={() => navigation.openDrawer()} />
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
                name="Estimates"
                component={Screens.Estimates}
                options={{
                    title: t(i18n)`Estimates`,
                }}
            />
            <Drawer.Screen
                name="Request"
                component={Screens.Request}
                options={{
                    title: t(i18n)`Ride Details`,
                }}
            />
        </Drawer.Navigator>
    );
}
