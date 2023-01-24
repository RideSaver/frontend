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
            size="sm"
            flex={1}
        >
            <Button leftIcon={<Icon name="currency-usd" size="sm" />} flex={1}>
                Fare
            </Button>
            <Button leftIcon={<Icon name="phone" size="sm" />} flex={1}>
                Contact
            </Button>
            <Button leftIcon={<Icon name="cancel" size="sm" />} flex={1}>
                Cancel
            </Button>
        </Button.Group>
    );
};
