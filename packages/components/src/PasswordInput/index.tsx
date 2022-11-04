import React, { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { t } from "@lingui/macro";
import i18n from "@ridesaver/internationalization";

export default ({
    showStrength,
    onPasswordChange,
}: {
    showStrength: boolean;
    onPasswordChange: (password: string) => void;
}) => {
    const [password, setPassword] = useState("");
    const [secure, setSecure] = React.useState(true);
    return (
        <View>
            <TextInput
                mode="outlined"
                label={t(i18n)`Password`}
                secureTextEntry={secure}
                right={
                    <TextInput.Icon
                        icon="eye"
                        onPress={() => setSecure(!secure)}
                    />
                }
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                    onPasswordChange(text);
                }}
                accessibilityLabel="Password"
            />
            {showStrength ? (
                <PasswordStrengthIndicator password={password} />
            ) : undefined}
        </View>
    );
};
