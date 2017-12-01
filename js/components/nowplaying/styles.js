const React = require("react-native");

const { StyleSheet } = React;
import {Platform} from "react-native"

export default {
  container: {
    backgroundColor: "#fff"
  }, headerFooterStyle: {
        backgroundColor:'#0681E6'
    }, tabHeaderTextStyle:{
        color:'#FFF'
    },menuTextStyle: {
        flexDirection:'row',
        alignItems: 'center'
    }, segmentStyle: {
        backgroundColor: Platform.OS === "ios" ? '#FFF' : '#0681E6'
    }
};
