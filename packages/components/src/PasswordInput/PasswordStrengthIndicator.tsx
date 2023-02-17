/**
 * A Strength Indicator for passwords, supports localization, as well as
 * @author Elias Schablowski
 * @format
 */

import React, { useState } from "react";
import { zxcvbn, ZxcvbnResult } from "@zxcvbn-ts/core";
import { Trans, Select, SelectOrdinal } from "@lingui/macro";
import { FormControl, Pressable, Progress, VStack } from "native-base";
import { useLingui } from "@lingui/react";

const crackTypes = [
    "offlineFastHashing1e10PerSecond",
    "offlineSlowHashing1e4PerSecond",
    "onlineNoThrottling10PerSecond",
    "onlineThrottling100PerHour",
] as unknown as keyof ZxcvbnResult["crackTimesSeconds"];

export default ({
    password,
    testID,
}: {
    password: string;
    testID?: string;
}) => {
    const { i18n } = useLingui();
    const strength = zxcvbn(password);
    const [timeScenario, setTimeScenario] = useState<number>(1);
    const saneTime = saneUnit(
        strength.crackTimesSeconds[crackTypes[timeScenario]]
    );

    return (
        <VStack testID={testID}>
            <Progress mt="1"
                value={strength.score * 25}
                colorScheme={strength.score < 2 ? "warning" : "emerald"}
                testID="password-score-bar"
            />
            <Pressable
                onPress={() =>
                    setTimeScenario(
                        timeScenario < crackTypes.length - 1
                            ? timeScenario + 1
                            : 0
                    )
                }
            >
                <FormControl.HelperText testID="password-strength-text" mb="2">
                    <Trans comment="Number has an added unit">
                        Password Strength: 
                        <SelectOrdinal
                            value={strength.score}
                            _0="Very Weak"
                            _1="Weak"
                            _2="Average"
                            _3="Strong"
                            _4="Very Strong"
                        />
                        {/*, Time to Crack:{" "}
                        {Intl.NumberFormat(i18n.locale, {
                            style: "unit",
                            unit: saneTime[1],
                            maximumSignificantDigits: 3,
                            notation: "engineering",
                            unitDisplay: "long",
                        }).format(saneTime[0])}
                        ,
                        <Select
                            value={crackTypes[timeScenario]}
                            offlineFastHashing1e10PerSecond="Offline Cracking, needs Data Breach AND cryptographic failure"
                            offlineSlowHashing1e4PerSecond="Offline Cracking, needs Data Breach"
                            onlineNoThrottling10PerSecond="Online Cracking, rate limiting bypassed"
                            onlineThrottling100PerHour="Online Cracking"
                            other={undefined}
                        />*/}
                    </Trans>
                </FormControl.HelperText>
            </Pressable>
        </VStack>
    );
};

function saneUnit(
    seconds: number
): [number, "second" | "minute" | "hour" | "day" | "year"] {
    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInYear = secondsInDay * 365.25;

    if (seconds < secondsInMinute) {
        return [seconds, "second"];
    } else if (seconds < secondsInHour) {
        return [seconds / secondsInMinute, "minute"];
    } else if (seconds < secondsInDay) {
        return [seconds / secondsInHour, "hour"];
    } else if (seconds < secondsInYear) {
        return [seconds / secondsInDay, "day"];
    } else {
        return [seconds / secondsInYear, "year"];
    }
}
