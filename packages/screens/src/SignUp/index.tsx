/**
 * The SignUp screen for RideSaver.
 * @author Elias Schablowski
 * @format
 */

import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { t, Trans } from "@lingui/macro";
import { useLinkProps } from "@react-navigation/native";
import { PasswordInput } from "@RideSaver/components";
import { user, useDispatch } from "@RideSaver/store";
import i18n from "@RideSaver/internationalization";

export default () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [usernameExists, setUsernameExists] = useState(false);

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
                onChangeText={(text) => setUsername(text)}
                error={usernameExists}
            />
            <HelperText type="error" visible={usernameExists}>
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
                <Button mode="outlined" onPress={onLogin} {...loginProps}>
                    Login
                </Button>
                <Button
                    mode="contained"
                    onPress={() => {
                        dispatch(
                            user.signUp({
                                username,
                                password,
                                email,
                                phone,
                            } as unknown)
                        )
                            .unwrap()
                            .catch(() => {
                                setUsernameExists(true);
                            });
                    }}
                >
                    Sign Up
                </Button>
            </Trans>
        </View>
    );
};
