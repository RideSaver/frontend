/**
 * The Login Screen for RideSaver.
 * @author Elias Schablowski
 * @format
 */

import React, { useEffect, useState } from "react";
import { Button, FormControl, Input, VStack } from "native-base";
import { Trans } from "@lingui/macro";
import { useLinkProps } from "@react-navigation/native";
import { PasswordInput } from "@RideSaver/components";
import { useAuthenticateMutation } from "@RideSaver/api/redux";
import { user } from "@RideSaver/store";
import { useDispatch } from "react-redux";

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
        <FormControl isInvalid={error}>
            <VStack>
                <FormControl.Label>
                    <Trans>Username</Trans>
                </FormControl.Label>
                <Input
                    value={username}
                    onChangeText={(text: string) => setUsername(text)}
                    accessibilityLabel="Username"
                />
                <PasswordInput
                    showStrength={false}
                    onPasswordChange={setPassword}
                />
                <FormControl.ErrorMessage>
                    <Trans>Error: Invalid Username or Password</Trans>
                </FormControl.ErrorMessage>
                <Trans>
                    <Button
                        onPress={(...args) => {
                            console.log("Sign Up");
                            onSignUp(...args);
                        }}
                        {...signUpProps}
                    >
                        Sign Up
                    </Button>
                    <Button
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
                </Trans>
            </VStack>
        </FormControl>
    );
};
