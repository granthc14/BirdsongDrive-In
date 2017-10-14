import React from "react";
import { DrawerNavigator } from "react-navigation";

import SideBar from "./components/sidebar";
import NowPlayingScreen from "./components/nowplaying/NowPlayingScreen";
import FoodScreen from "./components/food/FoodScreen";
import MapScreen from "./components/map/MapScreen";
import ShoppingCart from "./components/food/ShoppingCart";
import CreditCardScreen from "./components/food/CheckoutScreen";
import SettingsScreen from "./components/settings/SettingsScreen";

const Screens = DrawerNavigator(
  {
    NowPlaying: { screen: NowPlayingScreen },
    Food: { screen: FoodScreen },
    Map: { screen: MapScreen },
    ShoppingCart: {screen: ShoppingCart},
    CheckoutScreen: {screen: CreditCardScreen},
    Settings: {screen: SettingsScreen}
  },
  {
    initialRouteName: "Food",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

export default Screens;
