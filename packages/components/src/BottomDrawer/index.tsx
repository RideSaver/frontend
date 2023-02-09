/**
 * TextInput with specializations for location input.
 * @author Elias Schablowski
 * @format
 */

import React, { useState } from "react";
import { Container, useDisclose, ScrollView, VStack } from "native-base";
import PropTypes, { InferProps } from "prop-types";
import DrawerBar from "./DrawerBar";

const Props = {};
export default function BottomDrawer({
    children,
    ...props
}: InferProps<typeof BottomDrawer.propTypes>) {
    const defaultDisclose = useDisclose(false);
    const { isOpen, onOpen, onClose, onToggle } = Object.assign(
        defaultDisclose,
        props
    );
    return (
        <VStack
            top={isOpen ? "0" : "5/6"}
            position="absolute"
            zIndex={isOpen ? 50 : 30}
            w="full"
            backgroundColor="tertiary.400"
            maxHeight={isOpen ? "full" : "1/6"}
        >
            <DrawerBar onPress={onToggle} />
            {children}
        </VStack>
    );
}

BottomDrawer.propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onToggle: PropTypes.func,
};
