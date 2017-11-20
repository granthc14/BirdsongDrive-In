const React = require("react-native");

const { StyleSheet } = React;

export default {
  container: {
    backgroundColor: "#fff"
  },
    map: {
        ...StyleSheet.absoluteFillObject,
    }, headerFooterStyle: {
    backgroundColor:'#0681E6'
  }, tabHeaderTextStyle:{
        color:'#FFF'
    },menuTextStyle: {
        flexDirection:'row',
        alignItems: 'center'
    }
};
