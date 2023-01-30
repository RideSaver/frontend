/**
 * Reexports all components for easier access through module name.
 * @author John Hanna
 * @format
 */

import React from "react";
import { Box, VStack, Container } from "native-base";
import RequestMap from "./RequestMap";
import RequestDetails from "./RequestDetails";
import RequestButtons from "./RequestButtons";
import Map from "@RideSaver/components"

import { useGetRideQuery } from "@RideSaver/api/redux";

export default ({ route }) => {
    
    const { id } = route;
    const { data: request } = useGetRideQuery(id, { pollingInterval: 10000 });
    
    return (
        <Box /* Parent Container */
            flex="1"
            borderWidth="1"
            borderTopWidth="0"
            borderBottomLeftRadius={15}
            borderBottomRightRadius={15}
            overflow="hidden"
        >
            <VStack /* Contains: 1) Map Container 2) Information Container 3) Buttons/Footer Container */
                space={0}
                alignItems="center"
                flex="1"
                width="100%"
                height="100%"
                overflow="hidden"
            >
                <Box /* Map */
                    width="container"
                    flex="2"
                    overflow="hidden"
                    alignItems="center"
                    /* TODO: Add the map back */
                >
                    
                </Box>

                <Box /* Parent Information-Container */
                    roundedBottom="lg"
                    overflow="hidden"
                    flex="1"
                    width="100%"
                    borderTopColor="darkBlue.500:alpha.90"
                    borderTopWidth="2"
                    borderTopLeftRadius="15"
                    borderTopRightRadius="15"
                    borderTopStyle="inset"
                    _light={{
                        backgroundColor: "muted.100",
                    }}
                    _dark={{
                        backgroundColor: "muted.800",
                    }}
                >
                    <Container /* Driver & Car information */
                        width="100%"
                        flex="4"
                        justifyContent="center"
                        alignSelf="center"
                    >
                        <RequestDetails /*driver={}*/ />
                    </Container>

                    <Box /* Request Footer */
                        width="100%"
                        borderTopWidth="1"
                        borderTopColor="darkBlue.500:alpha.50"
                        borderTopStyle="inset"
                        rounded="lg"
                    >
                        <RequestButtons />
                    </Box>
                </Box>
            </VStack>
        </Box>
    );
};
