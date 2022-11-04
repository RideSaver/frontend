import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { t, Trans } from "@lingui/macro";
import { useLinkProps, Link } from "@react-navigation/native";
import { PasswordInput } from "@ridesaver/components";
import { user, useDispatch } from "@ridesaver/store";
import i18n from "@ridesaver/internationalization";

export default () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const dispatch = useDispatch();
    const { onPress: onLogin, ...loginProps } = useLinkProps({
        to: {
            screen: "Login",
        },
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
                onTextInput={({ nativeEvent: text }) => setUsername(text.text)}
            />
            <PasswordInput showStrength={true} onPasswordChange={setPassword} />
            <HelperText type="error" visible={error}>
                <Trans>Error: Invalid Username or Password</Trans>
            </HelperText>
            <Trans>
                <Button
                    mode="outlined"
                    onPress={onLogin}
                    {...loginProps}
                >
                    Login
                </Button>
                <Button
                    mode="contained"
                    onPress={() => {
                        dispatch(
                            user.signUp({
                                // username,
                                password,
                            } as any)
                        )
                            .unwrap()
                            .catch(() => {
                                setError(true);
                            });
                    }}
                >
                    Sign Up
                </Button>
            </Trans>
        </View>
    );
};
