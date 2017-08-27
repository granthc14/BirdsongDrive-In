/* @flow */

import React from "react";
import { DrawerNavigator } from "react-navigation";

import SideBar from "./components/sidebar";
import InfoScreen from "./components/info/InfoScreen";
import NowPlayingScreen from "./components/nowplaying/NowPlayingScreen";
import FoodScreen from "./components/food/FoodScreen";
import MapScreen from "./components/map/MapScreen";

const DrawerExample = DrawerNavigator(
  {
    NowPlaying: { screen: NowPlayingScreen },
    Food: { screen: FoodScreen },
    Info: { screen: InfoScreen },
    Map: { screen: MapScreen },
  },
  {
    initialRouteName: "Info",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

export default DrawerExample;
