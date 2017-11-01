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
        let response = await fetch('https://birdsong.mybluemix.net/order', {
            method: 'PUT',
            body: JSON.stringify(this.props.navigation.state.params.order)});
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