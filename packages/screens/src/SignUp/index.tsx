/**
 * The SignUp screen for RideSaver.
 * @author Elias Schablowski
 * @format
 */

import React, { useState } from "react";
import { View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { t, Trans } from "@lingui/macro";
import { useLinkProps, useLinkTo } from "@react-navigation/native";
import { PasswordInput } from "@RideSaver/components";
import i18n from "@RideSaver/internationalization";
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
    if(signUpResult.isSuccess && typeof signUpResult.data == "object" && "token" in signUpResult.data) {
        dispatch(user.slice.actions.setToken(signUpResult.data.token));
        linkTo('/home');
    }

    return (
        <View>
            <HelperText
                type="error"
                visible={
                    signUpResult.isError &&
                    parseInt(
                        (signUpResult.error as unknown as SerializedError).code
                    ) >= 500
                }
            >
                <Trans>
                    Something went wrong, please try again in 30 seconds.
                </Trans>
            </HelperText>
            <TextInput
                mode="outlined"
                label={t(i18n)`Username`}
                value={username}
                onChangeText={(text) => setUsername(text)}
                error={
                    signUpResult.isError &&
                    parseInt(
                        (signUpResult.error as unknown as SerializedError).code
                    ) < 500
                }
            />
            <HelperText
                type="error"
                visible={
                    signUpResult.isError &&
                    parseInt(
                        (signUpResult.error as unknown as SerializedError).code
                    ) < 500
                }
            >
                <Trans>Error: Username is already used.</Trans>
            </HelperText>
            <PasswordInput showStrength={true} onPasswordChange={setPassword} />
            <TextInput
                mode="outlined"
                label={t(i18n)`Name`}
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                mode="outlined"
                label={t(i18n)`E-Mail`}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <HelperText type="info" visible={true}>
                <Trans>Optional</Trans>
            </HelperText>

            <TextInput
                mode="outlined"
                label={t(i18n)`Phone Number`}
                value={email}
                onChangeText={(text) => setPhone(text)}
            />
            <HelperText type="info" visible={true}>
                <Trans>Optional</Trans>
            </HelperText>
            <Trans>
                <Button
                    mode="outlined"
                    onPress={onLogin}
                    {...loginProps}
                    disabled={signUpResult.isLoading}
                >
                    Login
                </Button>
                <Button
                    mode="contained"
                    onPress={() => {
                        signUp({
                            body: {
                                username,
                                password,
                                name,
                                phone_number: phone,
                                email,
                                authorized_services: [],
                            },
                        });
                    }}
                >
                    Sign Up
                </Button>
            </Trans>
        </View>
    );
};
