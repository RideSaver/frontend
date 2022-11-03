import React from "react";
import { View } from "react-native";
import { zxcvbn } from "@zxcvbn-ts/core";
import { t, Trans, defineMessage, Select } from "@lingui/macro";
import { HelperText, ProgressBar, useTheme } from "react-native-paper";
import { I18n } from "@lingui/core";
import { useLingui } from "@lingui/react";

export default ({ password }: { password: string }) => {
    const { i18n } = useLingui();
    const strength = zxcvbn(password);
    const theme = useTheme();

    const messageClass = {
        0: "very_weak",
        1: "weak",
        2: "average",
        3: "strong",
        4: "very_strong",
    };

    return (
        <View>
            <ProgressBar
                progress={strength.score / 4}
                color={
                    strength.score < 2
                        ? theme.colors.error
                        : theme.colors.secondary
                }
            />
            <HelperText type="info" visible={password.length > 0}>
                <Trans>
                    <Select
                        value={messageClass[strength.score]}
                        very_weak="Very Weak"
                        weak="Weak"
                        average="Average"
                        strong="Strong"
                        very_strong="Very Strong"
                        other={"Average"}
                    />
                    , Time to Crack:{" "}
                    {convertToTimeString(
                        strength.crackTimesSeconds
                            .offlineSlowHashing1e4PerSecond,
                        i18n
                    )}
                </Trans>
            </HelperText>
        </View>
    );
};

function convertToTimeString(seconds: number, i18n: I18n) {
    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 60;
    const secondsInYear = secondsInDay * 365.25;
    if (seconds < secondsInMinute) {
        return t(i18n)`${seconds} seconds`;
    } else if (seconds < secondsInHour) {
        return t(i18n)`${Math.ceil(seconds / secondsInHour)} minutes`;
    } else if (seconds < secondsInDay) {
        return t(i18n)`${Math.ceil(seconds / secondsInDay)} hours`;
    } else if (seconds < secondsInYear) {
        return t(i18n)`${Math.ceil(seconds / secondsInYear)} days`;
    } else if (seconds < 1000 * secondsInYear) {
        return t(i18n)`${Math.ceil(seconds / secondsInYear)} years`;
    } else {
        return t(i18n)`${(seconds / secondsInYear).toExponential(3)} years`;
    }
}
