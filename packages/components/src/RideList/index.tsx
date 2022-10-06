import React from "react";
import { Estimate } from "@ride-saver/api";
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
