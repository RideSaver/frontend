/**
 * Exports Ride Request Details & Information regarding the driver & vehicle.
 * @author John Hanna
 * @format
 */


import React from 'react';
import { Box, Text, Divider, Image, VStack, HStack, ZStack } from 'native-base';
import IconSet from 'react-native-vector-icons/MaterialCommunityIcons';

export default () => {

    const vehicleImage = "https://www.dualdrive.co.uk/wp-content/uploads/2019/07/2019_07_Corolla-Hybrid.png"
    const driverImage = "https://i.ibb.co/DL3mTks/demo-driver-image.jpg"

    return(
            <Box  width="100%" height= "100%" paddingTop="5" /* Parent Container */ >
    
                <HStack space="2" justifyContent="center" alignItems="center" /* Estimate Information */>
                    <Box>
                        <Text color="info.50" fontFamily="Roboto" fontSize="16" fontWeight="bold">
                            Your driver will be arriving in
                        </Text>
                    </Box>
                    <Box rounded="md" backgroundColor="darkBlue.100" pl="3" pr="3" shadow="10" /* Estimate in minutes */>
                        <Text color="dark.50" fontFamily="Roboto" fontSize="18" fontWeight="semibold" >
                            2
                        </Text>
                    </Box>
                    <Box>
                        <Text color="info.50" fontFamily="Roboto" fontSize="16" fontWeight="bold" >
                            minutes.
                        </Text>
                    </Box>
                </HStack>

                <Divider mt="5" thickness={1} backgroundColor="darkBlue.600" orientation="horizontal"/>

                <HStack space="2" flex="1">
                    <VStack flex="1" width="container" space={2} justifyContent="center" /* Driver & Vehicle Information */ >
                
                        <Box /* Vehicle Information */> 
                            <HStack space={2}>
                                <IconSet name="car" size={16} color="#E0E0E0"/>
                                <Text color="white" fontFamily="Roboto" fontSize="16" fontWeight="normal"> 
                                    2013 Toyota Corolla
                                </Text>
                            </HStack>
                        </Box>
                        <Box /* License Information */>
                            <HStack space={2}>
                                <IconSet name="card-text-outline" size={16} color="#E0E0E0"/>
                                <Text color="white" fontFamily="Roboto" fontSize="16" fontWeight="normal"> 
                                    3M53AF2
                                </Text>
                            </HStack>
                        </Box>
                        <Box /* Driver Name */>
                            <HStack space={2}>
                                <IconSet name="account" size={16} color="#E0E0E0"/>
                                <Text color="white" fontFamily="Roboto" fontSize="16" fontWeight="normal"> 
                                    Luke Garrison
                            </Text>
                            </HStack>
                        </Box>
                        <Box /* Driver Rating */>
                            <HStack space={2}>
                                <IconSet name="star" size={16} color="#E0E0E0"/>
                                <Text color="white" fontFamily="Roboto" fontSize="16" fontWeight="normal"> 
                                    4.9
                                </Text>
                            </HStack>
                        </Box>
                    </VStack>
                    <ZStack flex="1" width="container" justifyContent="center" mt="8">
                    <Image  /* Driver Image */
                            source={{ uri: driverImage }}
                            height="70px"
                            width="70px"
                            rounded="full"
                            ml="100"
                            mb="95"
                            borderWidth="3"
                            borderColor="darkBlue.600"
                            borderStyle="solid"
                            borderRadius="100"
                                />
                        <Image /* Vehicle Image */
                            source={{ uri: vehicleImage }}
                            height="150px"
                            width="150px"
                            resizeMode="contain"/>
                    </ZStack>
                </HStack>
            </Box>
        );
    };
