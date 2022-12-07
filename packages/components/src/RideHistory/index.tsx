/**
 * A component do display a RideEstimate.
 * @author Elias Schablowski
 * @format
 */

import React from "react";
import { Estimate } from "@RideSaver/api";
import { DataTable } from "react-native-paper";
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/macro";
import { useGetHistoryQuery, useGetServicesQuery } from "@RideSaver/api/redux";
import { useSelector } from "react-redux";
import { user } from "@RideSaver/store";

export default ({ estimate }: { estimate: Estimate }) => {
    const history = useGetHistoryQuery({
        username: useSelector(user.getUsername),
    });

    const services = useGetServicesQuery({});

    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>
                    <Trans>Date</Trans>
                </DataTable.Title>{" "}
                <DataTable.Title>
                    <Trans>RideShare Service</Trans>
                </DataTable.Title>
                <DataTable.Title>
                    <Trans>Price</Trans>
                </DataTable.Title>
                <DataTable.Title>
                    <Trans>More Information</Trans>
                </DataTable.Title>
            </DataTable.Header>
            {history.data
                .sort((ride) => new Date(ride.estimatedTimeOfArrival).getTime())
                .map((ride) => (
                    <DataTable.Row>
                        <DataTable.Cell>{ride.id}</DataTable.Cell>
                    </DataTable.Row>
                ))}
        </DataTable>
    );
};
