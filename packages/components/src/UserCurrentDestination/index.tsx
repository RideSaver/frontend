import React, { useState } from 'react';
import { NumberInput } from "../index"
import { IInputProps, Input, View , Button, Text, Box, HStack, VStack, SearchIcon, QuestionIcon } from "native-base";
import * as Location from 'expo-location';

Location.setGoogleApiKey("AIzaSyA3NFMJxqPN_q7JU_ctLAoi4eUaWxCcYtk");

export type location = {
    latitude: number;
    longitude: number;
};

interface Props extends Partial<IInputProps> {
    seats?: number;
    onUpdateSeats?: (seats : number) => void;
    onUpdateLocation?: (userLocation: location) => void;
    onUpdateView?:( userAddress: location) => void;
}

export default (options: Props) => {

    const [userAddress, setUserAddress] = useState("");
    const handleTextChange = (text : string) => { setUserAddress(text); }

    const clickHandler = async () => {
            const location = await Location.geocodeAsync(userAddress, { 
                useGoogleMaps: true 
            });
            options.onUpdateLocation({ 
                latitude: location[0].latitude, 
                longitude: location[0].longitude 
            });
            options.onUpdateView({ 
                latitude: location[0].latitude, 
                longitude: location[0].longitude 
            });
    }

    return(
        <View backgroundColor="blueGray.900" borderRadius="30px" borderTopRadius="0" paddingBottom={3} shadow="6"> 
            <VStack space={1}>
                <View mt="10px" ml="10px" mr="10px" mb="5px">
                    <Input 
                        InputLeftElement={<QuestionIcon name="question" marginLeft="2"/>}
                        color="white"
                        borderColor="warmGray.500"
                        backgroundColor="coolGray.800"
                        placeholder="Where would you like to go?"                       
                        onChangeText={handleTextChange}
                     />
                </View>
                <View display="flex" flex="1" width="100%"> 
                    <View flex="1" flexDirection="row" justifyContent="center">
                        <Box 
                            mt="2" 
                            mr="5">
                                <Text 
                                    fontWeight="black" 
                                    fontFamily="roboto" 
                                    color="warmGray.300"
                                    >
                                        Passengers?
                                </Text>
                        </Box>
                        <NumberInput 
                            color="white"
                            maxW="90px"
                            borderColor="warmGray.500"
                            backgroundColor="coolGray.800"
                            textAlign="center"
                            variant="underlined"
                            value={options.seats} 
                            onChangeValue={options.onUpdateSeats}
                        />
                        <Button 
                            onPress={clickHandler} 
                            borderRadius="full" 
                            leftIcon={<SearchIcon name="search" />} 
                            ml="20" 
                            shadow="9" 
                            variant="ghost" 
                            borderColor="warmGray.500" 
                            borderWidth="1"> 
                        </Button>
                    </View>
                </View>
            </VStack>
            {/*<Divider thickness={1}/>*/}
        </View>
    );
};

