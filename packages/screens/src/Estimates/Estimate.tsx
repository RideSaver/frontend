/**
 * A component do display a RideEstimate.
 * @author Elias Schablowski
 * @format
 */

import React from "react";
import { View, HStack, Heading, Text, Button } from "native-base";
import { Estimate } from "@RideSaver/api";
import { useLingui } from "@lingui/react";

export default ({ estimate }: { estimate: Estimate }) => {
    const { i18n } = useLingui();
    
    return (
        <View>
            <HStack space={4} justifyContent="flex-start">
                <Heading>{estimate.displayName}</Heading>
                <Text>
                    {new Intl.NumberFormat(i18n.locale, {
                        style: "currency",
                        currency: estimate.price.currency,
                    }).format(estimate.price.price)}
                </Text>
            </HStack>
        </View>
    );
};
