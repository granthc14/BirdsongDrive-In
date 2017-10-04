

import React from "react";

import { Platform } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";

import Screens from "./Screens";

const AppNavigator = StackNavigator(
    {
        Screens: { screen: Screens },
    },
    {
        initialRouteName: "Screens",
        headerMode: "none",
    }
);

console.disableYellowBox = true;
export default () =>
    <Root>
        <AppNavigator />
    </Root>;
