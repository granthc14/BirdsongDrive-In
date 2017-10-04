import React, { Component } from 'react';
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    H3,
    Button,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
    Tab,
    TabHeading,
    Tabs,
    List,
} from "native-base";

export default class SettingsScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-left"  size={25} style={{color:'white'}} />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Settings</Title>
                    </Body>
                </Header>
            </Container>
        );
    }
}