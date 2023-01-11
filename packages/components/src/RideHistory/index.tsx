/**
 * A component do display a RideEstimate.
 * @author Elias Schablowski
 * @format
 */

import React from "react";
import { Text } from "native-base";
import { Trans } from "@lingui/macro";
import { useGetHistoryQuery, useGetServicesQuery } from "@RideSaver/api/redux";
import { useSelector } from "react-redux";
import { user } from "@RideSaver/store";

export default () => {
    const history = useGetHistoryQuery({
        username: useSelector(user.getUsername),
    });

    const services = useGetServicesQuery({});

    return (
        <Text>
            {JSON.stringify(history, null, 4)}
        </Text>
    );
};
