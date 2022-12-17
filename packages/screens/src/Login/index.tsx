/**
 * The Login Screen for RideSaver.
 * @author Elias Schablowski
 * @format
 */

import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { t, Trans } from "@lingui/macro";
import { useLinkProps, useLinkTo } from "@react-navigation/native";
import { PasswordInput } from "@RideSaver/components";
import i18n from "@RideSaver/internationalization";
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
            ("token" in loginResult.data || "jwtToken" in loginResult.data)
        ) {
            dispatch(user.slice.actions.setToken((loginResult.data as any).token || (loginResult.data as any).jwtToken));
        }
    }, [loginResult.isSuccess, loginResult.data]);

    return (
        <View>
            <TextInput
                mode="outlined"
                label={t(i18n)`Username`}
                value={username}
                onChangeText={(text: string) => setUsername(text)}
                accessibilityLabel="Username"
                error={error}
            />
            <PasswordInput
                showStrength={false}
                onPasswordChange={setPassword}
                error={error}
            />
            <HelperText type="error" visible={error}>
                <Trans>Error: Invalid Username or Password</Trans>
            </HelperText>
            <Trans>
                <Button
                    mode="outlined"
                    onPress={(...args) => {
                        console.log("Sign Up")
                        onSignUp(...args);
                    }}
                    {...signUpProps}
                >
                    Sign Up
                </Button>
                <Button
                    mode="contained"
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
        </View>
    );
};
