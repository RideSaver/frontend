/**
 * Exports Ride Request Details & Information regarding the driver & vehicle.
 * @author John Hanna
 * @author Elias Schablowski
 * @format
 */

import React from "react";
import {
    Box,
    Text,
    Divider,
    Image,
    VStack,
    HStack,
    ZStack,
    Icon,
    Avatar,
} from "native-base";
import { Trans, SelectOrdinal } from "@lingui/macro";
import { Ride } from "@RideSaver/api/redux";

export interface RequestDetailsProps {
    ride: Ride;
}

export default function RequestDetails(/*{ ride }: RequestDetailsProps*/) {
    //const vehicleImage = ride.driver.carPicture;
    //const driverImage = ride.driver.avatar;
    //const etaMinutes = ride.estimatedTimeOfArrival;
    const vehicleImage = "https://www.dualdrive.co.uk/wp-content/uploads/2019/07/2019_07_Corolla-Hybrid.png"
    const driverImage = "https://i.ibb.co/DL3mTks/demo-driver-image.jpg"


    return (
        <Box width="100%" height="100%" paddingTop="5" /* Parent Container */>
            <Trans>
                <HStack justifyContent="center">
                    <Text variant="info">
                        Your driver will be arriving in
                        <Box
                            rounded="md"
                            backgroundColor="secondary.300"
                            ml="1"
                            mr="1"
                            pr="2"
                            pl="2"
                            shadow="10" /* Estimate in minutes */
                        >
                            <Text bold>
                                {/*etaMinutes*/}{2}
                            </Text>
                        </Box>
                        <SelectOrdinal
                            value={2}//{etaMinutes}
                            one="minute"
                            other="minutes"
                        />
                        .
                    </Text>
                </HStack>
            </Trans>

            <Divider thickness={1} />

            <HStack space="2" flex="1">
                <VStack
                    flex="1"
                    width="container"
                    space={2}
                    justifyContent="center" /* Driver & Vehicle Information */
                >
                    <Box /* Vehicle Information */>
                        <HStack space={2}>
                            <Icon name="car" />
                            <Text>2013 Toyota Corolla</Text>
                        </HStack>
                    </Box>
                    <Box /* License Information */>
                        <HStack space={2}>
                            <Icon name="card-text-outline" />
                            <Text>3M53AF2</Text>
                        </HStack>
                    </Box>
                    <Box /* Driver Name */>
                        <HStack space={2}>
                            <Icon name="account" />
                            <Text>Luke Garrison</Text>
                        </HStack>
                    </Box>
                    <Box /* Driver Rating */>
                        <HStack space={2}>
                            <Icon name="star" />
                            <Text>4.9</Text>
                        </HStack>
                    </Box>
                </VStack>
                <ZStack flex="1" justifyContent="center" mt="8">
                    <Avatar /* Driver Image */
                        source={{ uri: driverImage }}
                        size="lg"
                        mr="-12" ml="110" mb="81"
                    />
                    <Image /* Vehicle Image */
                        source={{ uri: vehicleImage }}
                        size="xl"
                        ml="25"
                        resizeMode="contain"
                    />
                </ZStack>
            </HStack>
        </Box>
    );
}
