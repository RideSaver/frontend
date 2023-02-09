/**
 * TextInput with specializations for location input.
 * @author Elias Schablowski
 * @format
 */

import React from "react";
import { Center, Icon, Pressable, IPressableProps } from "native-base";

export default function DrawerBar(props: IPressableProps) {
    return (
        <Pressable {...props}>
            <Center>
                <Icon name="minus" size="2xl"/>
            </Center>
        </Pressable>
    );
}

DrawerBar.propTypes = (Pressable as unknown as any).propTypes || {};

export type DrawerBarProps = IPressableProps;
