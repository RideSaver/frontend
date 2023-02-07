/**
 * Exports the ride-request footer which contains the buttons for getting the fare, contacting the driver, and cancelling the ride.
 * @author John Hanna
 * @format
 */

import React from "react";
import { Button, Icon } from "native-base";

export default () => {
    return (
        <Button.Group
            isAttached
            colorScheme="blue"
            size="lg"
            flex={1}
        >
            <Button leftIcon={<Icon name="currency-usd" />} flex={1}>
                Fare
            </Button>
            <Button leftIcon={<Icon name="phone" />} flex={1}>
                Contact
            </Button>
            <Button leftIcon={<Icon name="cancel" />} flex={1}>
                Cancel
            </Button>
        </Button.Group>
    );
};
