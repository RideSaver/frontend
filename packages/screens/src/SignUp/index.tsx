/**
 * The SignUp screen for RideSaver.
 * @author Elias Schablowski
 * @format
 */

import React, { useState } from "react";
import { Button, Input, FormControl, Box, Heading, Center, VStack } from "native-base";
import { Trans } from "@lingui/macro";
import { useLinkProps, useLinkTo } from "@react-navigation/native";
import { PasswordInput } from "@RideSaver/components";
import { useSignUpMutation } from "@RideSaver/api/redux";
import type { SerializedError } from "@reduxjs/toolkit";
import { user, useDispatch } from "@RideSaver/store";

export default () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [signUp, signUpResult] = useSignUpMutation();
    const { onPress: onLogin, ...loginProps } = useLinkProps({
        to: {
            screen: "Login",
        },
    });
    const linkTo = useLinkTo();
    const dispatch = useDispatch();

    // Go to home screen if signed up
    if (
        signUpResult.isSuccess &&
        typeof signUpResult.data == "object" &&
        "token" in signUpResult.data
    ) {
        dispatch(user.slice.actions.setToken(signUpResult.data.token));
        linkTo("/home");
    }

    return (
    <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Welcome
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
                <FormControl
                    isInvalid={
                        signUpResult.isError &&
                        parseInt(
                            (signUpResult.error as unknown as SerializedError).code
                        ) >= 500
                    }
                >
                    <FormControl.ErrorMessage>
                        <Trans>
                            Something went wrong, please try again in 30 seconds.
                        </Trans>
                    </FormControl.ErrorMessage>
                    <FormControl
                        isInvalid={
                            signUpResult.isError &&
                            parseInt(
                                (signUpResult.error as unknown as SerializedError).code
                            ) < 500
                        }
                    >
                        <FormControl.Label fontFamily="Roboto" fontSize="sm"  color="coolGray.800"
                     _dark={{ color: "warmGray.50" }}>
                            <Trans>Username</Trans>
                        </FormControl.Label>
                        <Input
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                        />
                        <FormControl.ErrorMessage></FormControl.ErrorMessage>
                    </FormControl>
                    <PasswordInput showStrength={true} onPasswordChange={setPassword} />
                    
                    <FormControl.Label fontFamily="Roboto" fontSize="sm"  color="coolGray.800"
                     _dark={{ color: "warmGray.50" }}>
                        <Trans>
                            Full Name
                        </Trans>
                    </FormControl.Label>
                    <Input
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <FormControl.Label fontFamily="Roboto" fontSize="sm" color="coolGray.800"
                     _dark={{ color: "warmGray.50" }}> 
                        <Trans>
                            Email
                        </Trans>
                    </FormControl.Label>
                    <Input
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <FormControl.Label fontFamily="Roboto" fontSize="sm" color="coolGray.800"
                     _dark={{ color: "warmGray.50" }}> 
                        <Trans>
                            Phone Number
                        </Trans>
                    </FormControl.Label>
                    <Input
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                    />
                    <Trans>
                    <Button
                            mt="5"
                            onPress={() => {
                                signUp({
                                    body: {
                                        username,
                                        password,
                                        name,
                                        phonenumber: phone,
                                        email,
                                        authorized_services: [],
                                    },
                                });
                            }}
                        >
                        Sign Up
                    </Button>
                    <Button
                        mt="2" 
                        onPress={onLogin}
                        {...loginProps}
                        disabled={signUpResult.isLoading}
                        variant="outline"
                    >
                        Login
                    </Button>
                    </Trans>
                </FormControl>
            </VStack>
        </Box>
    </Center>
    );
};
