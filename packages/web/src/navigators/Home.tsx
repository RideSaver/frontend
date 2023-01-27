

import React from "react";
import { Icon, useColorMode, useColorModeValue } from "native-base";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawer } from "@RideSaver/components";
import { useLingui } from "@lingui/react";
import { t } from "@lingui/macro";
import * as Screens from "@RideSaver/screens";

const HomeDrawer = createDrawerNavigator();
    
export default function Home() {

        const { toggleColorMode } = useColorMode();
        const colorMode = useColorModeValue("light", "dark");
        const { i18n } = useLingui();

    return( 
                <HomeDrawer.Navigator
                    useLegacyImplementation
                    screenOptions={({ navigation }) => ({ headerLeft: () => ( <Icon name="menu" onPress={() => navigation.openDrawer()} />), })}       
                    drawerContent={(props) => ( <CustomDrawer {...props} toggleColorMode={toggleColorMode} colorMode={colorMode} />)}
                >
                        <HomeDrawer.Screen name="Estimates" component={Screens.Estimates} options={{ title: t(i18n)`Rides & Services`}} />
                        <HomeDrawer.Screen name="Request" component={Screens.Request} options={{ title: t(i18n)`Ride Details`}}  />
                </HomeDrawer.Navigator>
    );
}

