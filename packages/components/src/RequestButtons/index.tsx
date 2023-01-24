/**
 * Exports the ride-request footer which contains the buttons for getting the fare, contacting the driver, and cancelling the ride.
 * @author John Hanna
 * @format
 */

import React from 'react';
import { HStack, Button, Container } from "native-base";
import IconSet from 'react-native-vector-icons/MaterialCommunityIcons';

export default () => {
    return(
        <HStack width="100%" space={0} alignItems="stretch" justifyContent="space-evenly"/* Buttons stack */>

        <Button flex="1" bgColor="dark.50" rounded="lg" /* Fare Estimate */
        _text={{fontSize:"11", fontFamily:"Roboto", fontWeight:"bold"}} 
        _hover={{backgroundColor:"dark.200"}}>
            <Container alignSelf="center">
                <IconSet name="currency-usd" size={21} color="#E0E0E0"/>
            </Container>
            Fare
        </Button> 
        <Button flex="1" bgColor="dark.50" width="container"/* Contact Driver */
        _text={{fontSize:"11",  fontFamily:"Roboto", fontWeight:"bold"}} 
        _hover={{backgroundColor:"dark.200"}}>
            <Container alignSelf="center">
                <IconSet name="phone" size={21} color="#E0E0E0"/>
            </Container>
             Contact
        </Button> 
        <Button flex="1" bgColor="dark.50" roundedTopRight="lg"/* Cancel Ride */
        _text={{fontSize:"11", fontFamily:"Roboto", fontWeight:"bold"}} 
        _hover={{backgroundColor:"dark.200"}}>
            <Container alignSelf="center">
                <IconSet alignItems="middle" name="cancel" size={21} color="#E0E0E0"/>
            </Container>
            Cancel
        </Button> 
    </HStack>
    );
}
