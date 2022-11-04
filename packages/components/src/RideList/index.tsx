import React from "react";
import { Estimate } from "@RideSaver/api";
import { Text, View } from "react-native";

export default ({ estimates }: { estimates: Estimate[] }) => {
    return (
        <View>
            {estimates.map((estimate) => (
                <Text key={estimate.id}>
                    {estimate.displayName}: {estimate.price}
                </Text>
            ))}
        </View>
    );
};
