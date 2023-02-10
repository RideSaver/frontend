/**
 * TextInput with specializations for location input.
 * @author Elias Schablowski
 * @format
 */

import React, { useState } from "react";
import { Container, useDisclose, ScrollView, VStack } from "native-base";
import PropTypes, { InferProps } from "prop-types";
import DrawerBar from "./DrawerBar";

export default function TopDrawer({
    children,
    ...props
}: InferProps<typeof TopDrawer.propTypes>) {
    const defaultDisclose = useDisclose(false);
    const { isOpen, onOpen, onClose, onToggle } = Object.assign(
        defaultDisclose,
        props
    );
    return (
        <VStack
            top="0"
            position="absolute"
            zIndex={isOpen ? 50 : 30}
            w="full"
            backgroundColor="tertiary.400"
            maxHeight={isOpen ? "full" : "1/6"}
            overflowY="hidden"
            shadow={3}
            borderBottomRadius="2xl"
            padding="3"
            paddingBottom={1}
        >
            {children}
            <DrawerBar onPress={onToggle} flex="0" marginBottom={"-0.4em"}/>
        </VStack>
    );
}

TopDrawer.propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onToggle: PropTypes.func,
};
