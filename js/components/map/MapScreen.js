import React, { Component } from 'react';
import styles from "./styles";
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    H3,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Body
} from "native-base";
export default class MapScreen extends Component {
    render() {

        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}
                        >
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Map</Title>
                    </Body>
                    <Right />

                </Header>

                <Content padder>
                    <Text>
                        This is the map screen
                    </Text>

                </Content>
            </Container>
        );
    }
}