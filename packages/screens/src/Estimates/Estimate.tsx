/**
 * A component do display a RideEstimate.
 * @author Elias Schablowski
 * @format
 */

import React from "react";
import { useLingui } from "@lingui/react";
import { Estimate } from "@RideSaver/api";
import { VStack, HStack, Heading, Text, Button } from "native-base";
import { Trans } from "@lingui/macro";

export default ({ estimate }: { estimate: Estimate }) => {
    const { i18n } = useLingui();
    return (
        <VStack>
            <HStack>
                <Heading>{estimate.displayName}</Heading>
                <Text>
                    {new Intl.NumberFormat(i18n.locale, {
                        style: "currency",
                        currency: estimate.price.currency,
                    }).format(estimate.price.price)}
                </Text>
            </HStack>
            <HStack direction="row-reverse">
                <Button>
                    <Trans>
                        Reserve
                    </Trans>
                </Button>
            </HStack>
        </VStack>
    );
};
