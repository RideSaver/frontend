import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { t, Trans } from "@lingui/macro";
import { useLinkProps } from "@react-navigation/native";
import { PasswordInput } from "@ridesaver/components";
import { user, useDispatch } from "@ridesaver/store";
import i18n from "@ridesaver/internationalization";

export default () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const dispatch = useDispatch();
    const { onPress: onSignUp, ...signUpProps } = useLinkProps({
        to: {
            screen: "SignUp",
        }
    });

    useCallback(() => {
        dispatch(user.load());
    }, []);

    return (
        <View>
            <TextInput
                mode="outlined"
                label={t(i18n)`Username`}
                value={username}
                onChangeText={(text: string) => setUsername(text)}
                accessibilityLabel="Username"
            />
            <PasswordInput
                showStrength={false}
                onPasswordChange={setPassword}
            />
            <HelperText type="error" visible={error}>
                <Trans>Error: Invalid Username or Password</Trans>
            </HelperText>
            <Trans>
                <Button
                    mode="outlined"
                    onPress={(...args) => {
                        console.log("signup");
                        onSignUp(...args);
                    }}
                    {...signUpProps}
                >
                    Sign Up
                </Button>
                <Button
                    mode="contained"
                    onPress={() => {
                        dispatch(
                            user.login({
                                username,
                                password,
                            })
                        )
                            .unwrap()
                            .catch(() => {
                                setError(true);
                            });
                    }}
                >
                    Login
                </Button>
            </Trans>
        </View>
    );
};