/**
 * TextInput with specializations for location input.
 * @author Elias Schablowski
 * @format
 */

import React from "react";
import { useDisclose, VStack } from "native-base";
import PropTypes, { InferProps } from "prop-types";
import DrawerBar from "./DrawerBar";

export default function BottomDrawer({
    children,
    ...props
}: InferProps<typeof BottomDrawer.propTypes>) {
    const defaultDisclose = useDisclose(false);
    const {
        isOpen,
        onToggle = () => {
            // Do nothing, we are non-interactive
        },
    } = "isOpen" in props ? props : defaultDisclose;
    return (
        <VStack
            bottom="0"
            position="fixed"
            zIndex={isOpen ? 50 : 30}
            w="full"
            backgroundColor="tertiary.400"
            maxHeight={isOpen ? "full" : "1/6"}
            shadow="3"
            borderTopRadius="2xl"
        >
            <DrawerBar onPress={onToggle} flex="0" />
            {children}
        </VStack>
    );
}

BottomDrawer.propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    onToggle: PropTypes.func,
};
