/**
 * TextInput with specilizations for password input.
 * @author Elias Schablowski
 * @format
 */

import React, { useState } from "react";
import { Input, IInputProps, Icon, FormControl } from "native-base";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { Trans } from "@lingui/macro";

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
} & Partial<IInputProps>) => {
    const [_password, setPassword] = useState(password);
    const [secure, setSecure] = React.useState(!visible);
    return (
        <FormControl>
            <FormControl.Label fontFamily="Roboto" fontSize="sm" color="coolGray.800"
                     _dark={{ color: "warmGray.50" }}>
                <Trans>
                    Password
                </Trans>
            </FormControl.Label>
            <Input
                secureTextEntry={secure}
                InputRightElement={
                    <Icon
                        name="eye"
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
        </FormControl>
    );
};
