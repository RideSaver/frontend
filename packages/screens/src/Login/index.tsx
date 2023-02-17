/**
 * The Login Screen for RideSaver.
 * @author Elias Schablowski
 * @format
 */

import React, { useEffect, useState } from "react";
import { Box, Button, Center, FormControl, Heading, Input, Link, VStack } from "native-base";
import { Trans } from "@lingui/macro";
import { useLinkProps } from "@react-navigation/native";
import { PasswordInput } from "@RideSaver/components";
import { useAuthenticateMutation } from "@RideSaver/api/redux";
import { user, useDispatch } from "@RideSaver/store";

export default () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const [login, loginResult] = useAuthenticateMutation();
    const { onPress: onSignUp, ...signUpProps } = useLinkProps({
        to: {
            screen: "SignUp",
        },
    });
    const dispatch = useDispatch();

    useEffect(() => {
        // Go to home screen if signed up
        if (
            loginResult.isSuccess &&
            typeof loginResult.data == "object" &&
            "jwttoken" in loginResult.data
        ) {
            dispatch(user.slice.actions.setToken(loginResult.data.jwttoken));
        } else if (loginResult.isError) {
            setError(true);
        }
    }, [loginResult.isSuccess, loginResult.data]);

    return (
      <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
          Welcome
        </Heading>
        <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading>
        <VStack space={3} mt="5">
                <FormControl isInvalid={error}>
                    <FormControl.Label fontFamily="Roboto" fontSize="sm" color="coolGray.800"
                     _dark={{ color: "warmGray.50" }}> 
                        <Trans>Username</Trans>
                    </FormControl.Label>
                    <Input
                        value={username}
                        onChangeText={(text: string) => setUsername(text)}
                        accessibilityLabel="Username"
                    />
                </FormControl>
                <FormControl isInvalid={error}>
                    <PasswordInput
                        showStrength={false}
                        onPasswordChange={setPassword}
                    />
                    <Link 
                    _text={{
                        fontSize: "xs",
                        fontWeight: "500",
                        color: "indigo.500"
                    }} 
                    alignSelf="flex-end" mt="1">
                    Forgot Password?
                    </Link>
                    <FormControl.ErrorMessage>
                        <Trans>Error: Invalid Account Information</Trans>
                    </FormControl.ErrorMessage>
                    <Trans>
                        <Button
                            mt="5"
                            onPress={() => {
                                login({
                                    userLogin: {
                                        username,
                                        password,
                                    },
                                });
                            }}
                        >
                            Login
                        </Button>
                        <Button 
                            mt="2" 
                            onPress={(...args) => {
                                console.log("Sign Up");
                                onSignUp(...args);
                            }}
                            variant="outline"
                            {...signUpProps}
                        >
                            Sign Up
                        </Button>
                    </Trans>
                </FormControl>
            </VStack> 
        </Box>
    </Center>
    );
};
