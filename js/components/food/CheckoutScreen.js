import React, { Component } from "react";
import styles from "./styles";
import {
    Text, Container
} from "native-base";
import KeepAwake from 'react-native-keep-awake';


export default class CheckoutScreen extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            color: '#66ff66'
        }
    }

    render() {
        return (
            <Container style={{backgroundColor: this.state.color, justifyContent: 'center'}}>
                <Text style={styles.numberTextStyle}>
                    25
                </Text>
                <KeepAwake />
            </Container>
        );
    }
}