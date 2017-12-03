const React = require("react-native");

const { StyleSheet } = React;
import { Platform } from 'react-native';
export default {
  container: {
    backgroundColor: "#0681E6"
  },
    checkout: {
        flex: 1
    },
    checkoutText:{
      fontSize: 20,
        color: "#fff"
    },
    itemTotal: {
      flexDirection: 'row'
    },cardContainer: {
        backgroundColor: "#F5F5F5"
    },
    label: {
        color: "black",
        fontSize: 12,
    },
    input: {
        fontSize: 16,
        color: "black",
    },
    selectPaymentText: {
      marginLeft: 20,
      fontSize: 20
    },
    numberTextStyle: {
        color: "#000",
        fontSize: 160,
        textAlignVertical: "center",
        textAlign: "center"
    },
    drinksLeft: {
      flexDirection: 'column',
        flex: 1,
        marginLeft: 10,
        marginTop: 16
    }, drinkNames: {
      marginTop:10
    },drinksBody: {
        flexDirection: 'column',
        flex: 1
    }, drinksRight: {
        flexDirection: 'column',
        flex: 1
    }, plusMinusStyle: {
    }, headerFooterStyle: {
        backgroundColor:'#0681E6'
    }, totalTextStyle: {
        marginLeft: 10,
        fontSize: 25,
        color: '#FFF'
    },tabStyle: {
        backgroundColor:'#0681E6'
    }, tabHeaderTextStyle:{
      color:'#FFF'
    }, tabBarUnderlineStyle: {
      backgroundColor:'#FFF',
        marginBottom: 2
    },menuTextStyle: {
      flexDirection:'row',
        alignItems: 'center'
    }, tabIconActiveStyle: {
      color:'#FFF'
    }, tabIconNotActiveStyle: {
        color: Platform.OS === 'ios' ? '#033B6A' : ''
    }, plusMinusiOSStyle: {
      color:'#757575'
    }

};
