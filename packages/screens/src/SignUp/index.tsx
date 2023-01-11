/**
 * The SignUp screen for RideSaver.
 * @author Elias Schablowski
 * @format
 */

import React, { useState } from "react";
import { Button, Input, FormControl } from "native-base";
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
                <FormControl.Label>
                    <Trans>Username</Trans>
                </FormControl.Label>
                <Input
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <FormControl.ErrorMessage></FormControl.ErrorMessage>
            </FormControl>
            <PasswordInput showStrength={true} onPasswordChange={setPassword} />
            
            <FormControl.Label>
                <Trans>
                    Name
                </Trans>
            </FormControl.Label>
            <Input
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <FormControl.Label>
                <Trans>
                    E-Mail
                </Trans>
            </FormControl.Label>
            <Input
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <FormControl.HelperText>
                <Trans>Optional</Trans>
            </FormControl.HelperText>

            <FormControl.Label>
                <Trans>
                    Phone Number
                </Trans>
            </FormControl.Label>
            <Input
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />
            <FormControl.HelperText>
                <Trans>Optional</Trans>
            </FormControl.HelperText>
            <Trans>
                <Button
                    onPress={onLogin}
                    {...loginProps}
                    disabled={signUpResult.isLoading}
                >
                    Login
                </Button>
                <Button
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
            </Trans>
        </FormControl>
    );
};
