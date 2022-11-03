import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { t, Trans } from "@lingui/macro";
import { useLinkTo } from "@react-navigation/native";
import { user, useDispatch } from "@ridesaver/store";
import i18n from "@ridesaver/internationalization";
import {
  LocationSelector,
  RideList,
  RideSettings,
} from "@ridesaver/components";


export default () => {
    const dispatch = useDispatch();
    const linkTo = useLinkTo();

    const [startPoint, setStartPoint] = useState(undefined);
    const [endPoint, setEndPoint] = useState(undefined);

    useCallback(() => {
        dispatch(user.load());
    }, []);

    return (
      <View>
        <LocationSelector onUpdateLocation={location=>setStartPoint} />
        <LocationSelector onUpdateLocation={location=>setEndPoint} />
        <RideSettings />
        <RideList estimates={[]}/>
      </View>
    );
};
