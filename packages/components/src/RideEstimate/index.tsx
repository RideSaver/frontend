/**
 * A component do display a RideEstimate.
 * @author Elias Schablowski
 * @format
 */

import React from "react";
import { useLingui } from "@lingui/react";
import { Estimate } from "@RideSaver/api";
import { Card, Title, Button, Paragraph } from "react-native-paper";

export default ({ estimate }: { estimate: Estimate }) => {
    const { i18n } = useLingui();
    return (
        <Card>
            <Card.Title
                title={estimate.displayName}
                right={() => (
                    <Title>
                        {Intl.NumberFormat(i18n.locale, {
                            style: "currency",
                            currency: estimate.price.currency,
                        }).format(estimate.price.price)}
                    </Title>
                )}
            />
            <Card.Content>
                <Paragraph> </Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button>Request</Button>
            </Card.Actions>
        </Card>
    );
};
