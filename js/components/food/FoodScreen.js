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
    Tabs
} from "native-base";
export default class FoodScreen extends Component {
    render() {

        return (
            <Container style={styles.container}>
                <Header
                    hasTabs>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu" size={25}/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Food</Title>
                    </Body>
                    <Right />

                </Header>
                <Tabs>
                    <Tab heading={ <TabHeading><Icon name="food" size={25}/><Text>Food</Text></TabHeading>}>
                    </Tab>
                    <Tab heading={ <TabHeading><Icon name="water" size={25} /><Text>Drink</Text></TabHeading>}>
                    </Tab>
                    <Tab heading={ <TabHeading><Icon name="popcorn" size={25}/><Text>Popcorn</Text></TabHeading>}>
                    </Tab>

                </Tabs>
                <Content padder>
                </Content>
            </Container>
        );
    }
}