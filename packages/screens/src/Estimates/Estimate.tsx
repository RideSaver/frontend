/**
 * A component do display a RideEstimate.
 * @author Elias Schablowski
 * @format
 */

import React from "react";
import { View, HStack, Heading, Text, Button, PlayIcon, Divider } from "native-base";
import { Estimate } from "@RideSaver/api";
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/macro";
import { useLinkProps } from "@react-navigation/native";

export default ({ estimate }: { estimate: Estimate }) => {
    const { i18n } = useLingui();
    const { onPress: onRequest, ...requestProps } = useLinkProps({
        to: {
            screen: "Request",
            params: {
                id: estimate.id
            }
        },
    });

    return (
        <View mb="1">
            <HStack space={4} justifyContent="space-between">
                <Heading ml="3" color="coolGray.200">{estimate.displayName}</Heading>
                <Text 
                    alignSelf="center"
                    _light={{
                         color: "coolGray.200"
                    }}
                     _dark={{
                        color: "coolGray.200"
                   }}
                >
                    {new Intl.NumberFormat(i18n.locale, {
                        style: "currency",
                        currency: estimate.price.currency,
                    }).format(estimate.price.price)}
                </Text>
                <Button mr="3" rounded="md" fontWeight="semiBold" color="info.50" onPress={onRequest} {...requestProps} >
                    <Trans>Request</Trans>
                </Button>
            </HStack>
        </View>
    );
};
