const React = require("react-native");

const { StyleSheet } = React;

export default {
  container: {
    backgroundColor: "#fff"
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
      fontSize: 20
    },
    numberTextStyle: {
        color: "#000",
        fontSize: 200,
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
    }
};
