/**
 * The Home Screen for RideSaver.
 * @author Elias Schablowski
 * @format
 */

import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Trans } from "@lingui/macro";
import { user, useSelector } from "@RideSaver/store";
import { usePatchUserMutation } from "@RideSaver/api/redux";
import { useDebounce } from "@RideSaver/components";
import { Input, FormControl, Avatar, Pressable } from "native-base";
import * as ImagePicker from "expo-image-picker";

export default () => {
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

    const [updateUser] = usePatchUserMutation();

    /*useEffect(() => {
        updateUser({
            username: useSelector(user.getUsername) as string,
            /*body: debouncedUser,
        });
    }, [debouncedUser]);*/

    return (
        <View>
            <View>
                <Pressable
                    onPress={async () => {
                        const { accessPrivileges } =
                            await ImagePicker.requestMediaLibraryPermissionsAsync(
                                false
                            );
                        if (accessPrivileges === "none") return;
                        const image = await ImagePicker.launchImageLibraryAsync(
                            {
                                allowsEditing: true,
                            }
                        );
                    }}
                >
                    <Avatar
                        source={{
                            uri: avatar,
                        }}
                    />
                </Pressable>
                <View>
                    <FormControl>
                        <FormControl.Label>
                            <Trans>Name</Trans>
                        </FormControl.Label>
                        <Input value={name} onChangeText={setName} />
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>
                            <Trans>E-Mail</Trans>
                        </FormControl.Label>
                        <Input value={email} onChangeText={setEmail} />
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>
                            <Trans>Phone Number</Trans>
                        </FormControl.Label>
                        <Input value={phone} onChangeText={setPhone} />
                    </FormControl>
                </View>
            </View>
        </View>
    );
};
