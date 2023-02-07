import * as React from "react";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";

import { Switch, Container, FormControl } from "native-base";
import { Trans, t } from "@lingui/macro";

export default function CustomDrawerContent({
    colorMode,
    toggleColorMode,
    ...props
}) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <Container flex={1} />
            <DrawerItem
                label={() => (
                    <>
                        <Trans>
                            <FormControl>
                                <FormControl.Label>Dark Mode</FormControl.Label>
                                <Switch
                                    isChecked={colorMode == "dark"}
                                    accessibilityLabel={t`Dark Mode`}
                                />
                            </FormControl>
                        </Trans>
                    </>
                )}
                onPress={() => {
                    toggleColorMode();
                }}
            />
        </DrawerContentScrollView>
    );
}