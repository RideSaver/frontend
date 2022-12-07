/**
 * TextInput with specilizations for password input.
 * @author Elias Schablowski
 * @format
 */

import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { t } from "@lingui/macro";
import i18n from "@RideSaver/internationalization";

export default ({
    password = "",
    onPasswordChange,
    showStrength = false,
    visible = false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChangeVisibility = () => {},
    ...options
}: {
    showStrength?: boolean;
    password?: string;
    onPasswordChange: (password: string) => void;
    visible?: boolean;
    onChangeVisibility?: (visibility: boolean) => void;
} & Partial<TextInputProps>) => {
    const [_password, setPassword] = useState(password);
    const [secure, setSecure] = React.useState(!visible);
    return (
        <View>
            <TextInput
                mode="outlined"
                label={t(i18n)`Password`}
                secureTextEntry={secure}
                right={
                    <TextInput.Icon
                        icon="eye"
                        onPress={() => {
                            setSecure(!secure);
                            onChangeVisibility(secure);
                        }}
                        testID="password-visibility-toggle"
                    />
                }
                value={_password}
                onChangeText={(text) => {
                    setPassword(text);
                    onPasswordChange(text);
                }}
                accessibilityLabel="Password"
                {...options}
            />
            {showStrength ? (
                <PasswordStrengthIndicator
                    password={_password}
                    testID="password-strength"
                />
            ) : undefined}
        </View>
    );
};
