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
    Item,
    Input
} from "native-base";
import {ActivityIndicator, View, AsyncStorage} from "react-native";

let EMAIL_KEY = "@MyEmail:key";

export default class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "My Email",
            isLoading: true
        };
        this.getEmail();
    }
    saveEmail(value: string) {
        try {
            AsyncStorage.setItem(EMAIL_KEY, value);
            this.setState({email:value});
            console.log("Saved Email")
        } catch (error) {
            console.log("Error saving email");
        }
    }

    async getEmail() {
        try {
            let value = await AsyncStorage.getItem(EMAIL_KEY);
            if (value === null) {
                value = "My Email"
            }
            this.setState({isLoading: false, email: value});
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            )
        } else {
            return (
                <Container style={styles.container}>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon name="arrow-left" size={25} style={{color: 'white'}}/>
                            </Button>
                        </Left>
                        <Body>
                        <Title>Settings</Title>
                        </Body>
                    </Header>
                    <Content>
                        <Content>
                            <Text>Email:</Text>
                            <Item regular>
                                <Input
                                    value = {this.state.email}
                                    onChangeText={this.saveEmail.bind(this)}/>
                            </Item>
                        </Content>
                        <Content>
                            <Text>My Favorite Orders</Text>
                            <List>

                            </List>
                        </Content>
                    </Content>
                </Container>
            );
        }
    }
}