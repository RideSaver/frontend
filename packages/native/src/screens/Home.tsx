import React from "react";
import { View } from "react-native";
import {
  LocationSelector,
  RideList,
  RideSettings,
} from "@ride-saver/components";

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
