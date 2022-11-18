/**
 * The Home Screen for RideSaver.
 * @author Elias Schablowski
 * @format
 */

import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { user, useSelector, useDispatch } from "@ridesaver/store";
import {
    LocationSelector,
    NumberInput,
    RideEstimate,
    useDebounce,
} from "@ridesaver/components";
import { TextInput, Avatar, TouchableRipple } from "react-native-paper";
import ImagePicker from "expo-image-picker";

export default () => {
    const dispatch = useDispatch();
    const { i18n } = useLingui();

    const [email, setEmail] = useState(useSelector(user.getEmail) as string);
    const [name, setName] = useState(useSelector(user.getName) as string);
    const [phone, setPhone] = useState(useSelector(user.getPhone) as string);
    const [avatar, setAvatar] = useState(useSelector(user.getAvatar) as string);
    const debouncedUser = {
        email: useDebounce(email, 500),
        name: useDebounce(name, 500),
        phoneNumber: useDebounce(phone, 500),
        avatar: avatar,
    };

    useEffect(() => {
        dispatch(user.update(debouncedUser));
    });

    return (
        <View>
            <View>
                <TouchableRipple
                    onPress={async () => {
                        const { accessPrivilidges } =
                            await ImagePicker.requestMediaLibraryPermissionsAsync(
                                false
                            );
                        if (accessPrivilidges === "none") return;
                        const image = await ImagePicker.launchImageLibraryAsync(
                            {
                                allowsEditing: true,
                            }
                        );
                    }}
                >
                    <Avatar.Image
                        source={{
                            uri: avatar,
                        }}
                    />
                </TouchableRipple>
                <View>
                    <TextInput
                        label={t(i18n)`Name`}
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        label={t(i18n)`E-Mail`}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        label={t(i18n)`Phone Number`}
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>
            </View>
        </View>
    );
};
