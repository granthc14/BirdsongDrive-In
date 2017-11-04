import React, { Component } from "react";
import styles from "./styles";
import {
    Text, Container, Button
} from "native-base";
import {ActivityIndicator, View} from "react-native";
import KeepAwake from 'react-native-keep-awake';


export default class CheckoutScreen extends Component {

    constructor(props)
    {
        super(props);
        this.info = {};
        this.state = {
            isLoading: true,
            color: '',
            displayNumber: '0'
        };
        this.getOrderNumberAndColor();
    }


    async getOrderNumberAndColor() {

        if (!String.prototype.format) {
            String.prototype.format = function() {
                let args = arguments;
                return this.replace(/{(\d+)}/g, function(match, number) {
                    return typeof args[number] !== 'undefined'
                        ? args[number] : match;
                });
            };
        }

        let order = this.props.navigation.state.params.order;
        let params = '?screenNo={0}&carMake={1}&carModel={2}&carColor={3}&cashOrCard={4}&orderItems={5}&cost={6}'.format(order.screenNo, order.carMake, order.carModel, order.carColor, order.cashOrCard, JSON.stringify(order.items), order.cost);
        let response = await fetch('https://birdsong.mybluemix.net/order' + params, {
            method: 'PUT'});
        let bodyText = await response._bodyText;
        this.info = JSON.parse(bodyText);
        this.setState({isLoading: false, color: this.info.orderColor, displayNumber: this.info.displayNumber})
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <Container style={{backgroundColor: this.state.color, justifyContent: 'center'}}>
                <Text style={styles.numberTextStyle}>
                    {this.state.displayNumber}
                </Text>
                <KeepAwake />
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                    <Text>Go Back</Text>
                </Button>
            </Container>
        );
    }
}