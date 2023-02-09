/**
 * A component do display a RideEstimate.
 * @author Elias Schablowski
 * @format
 */

import React from "react";
import { View, HStack, Heading, Text, Button } from "native-base";
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
        <View>
            <HStack space={4} justifyContent="space-between">
                <Heading>{estimate.displayName}</Heading>
                <Text>
                    {new Intl.NumberFormat(i18n.locale, {
                        style: "currency",
                        currency: estimate.price.currency,
                    }).format(estimate.price.price)}
                </Text>
                <Button onPress={onRequest} {...requestProps}>
                    <Trans>Get Ride</Trans>
                </Button>
            </HStack>
        </View>
    );
};
