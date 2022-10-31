import React from "react";
import { View } from "react-native";
import {
  LocationSelector,
  RideList,
  RideSettings,
} from "@ridesaver/components";

export default () => {

  return (
    <View>
      <LocationSelector location="startPoint" />
      <LocationSelector location="endPoint" />
      <RideSettings />
      <RideList estimates={[]}/>
    </View>
  );
};
