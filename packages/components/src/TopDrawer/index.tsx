/**
 * TextInput with specializations for location input.
 * @author Elias Schablowski
 * @format
 */

import React from "react";
import { useDisclose, VStack } from "native-base";
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
            maxHeight={isOpen ? "full" : "1/6"}
            overflowY="hidden"
            shadow={3}
            borderBottomRadius="full"
            borderBottomWidth="1"
            padding={2} paddingBottom={1}
            _light={{
                backgroundColor: "trueGray.900",
            }}
            _dark={{
                backgroundColor:"trueGray.900",
                borderColor: "coolGray.400"
            }}
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
