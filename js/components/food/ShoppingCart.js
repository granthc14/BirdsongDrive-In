import React, { Component } from 'react';
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {
    Picker,
    Container,
    Header,
    Title,
    Content,
    Text,
    Form,
    Button,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
    ListItem,
    List,
    Item,
    Input
} from "native-base";


export default class ShoppingCart extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            paymentMethod: 'card',
            make:'',
            model:'',
            color:''
        }
    }

    onPaymentValueChange(value: string) {
        this.setState({
            paymentMethod:value
        });
    }
    onMakeValueChange(value: string) {
        this.setState({
            make:value
        });
    }
    onModelValueChange(value: string) {
        this.setState({
            model:value
        });
    }
    onColorValueChange(value: string) {
        this.setState({
            color:value
        });
    }

    render() {

        const {state} = this.props.navigation;
        return (
                <Container style={styles.container}>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon name="arrow-left" size={25} style={{color:'white'}} />
                            </Button>
                        </Left>
                        <Body>
                        <Title>Your Order</Title>
                        </Body>
                        <Right>
                            <Button
                                transparent
                                onPress={()=> this.props.navigation.navigate("Settings")}>
                                <Icon name="settings" style={{color: 'white'}} size={25}/>
                            </Button>
                        </Right>
                    </Header>
                <Container>
                    <Content>
                        <List
                            dataArray={state.params.order}
                            renderRow={orderItem =>
                                <ListItem>
                                    <Left>
                                        <Text>{orderItem.name}</Text>
                                    </Left>
                                    <Body style={styles.itemTotal}>
                                        <Text>${orderItem.price}</Text>
                                        <Text>#{orderItem.amount}</Text>
                                        <Text>${orderItem.itemTotal}</Text>
                                    </Body>
                                </ListItem>}
                        />
                        <Content>
                            <Text style={styles.selectPaymentText}>Select Payment Type</Text>
                            <Form>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Select Method"
                                    selectedValue={this.state.paymentMethod}
                                    onValueChange={this.onPaymentValueChange.bind(this)}>
                                    <Item label="Credit/Debit Card" value="card"/>
                                    <Item label="Cash" value="cash"/>
                                </Picker>
                            </Form>
                            <Item regular>
                                <Input placeholder='Car Make' onChangeText={this.onMakeValueChange.bind(this)}/>
                            </Item>
                            <Item regular>
                                <Input placeholder='Car Model' onChangeText={this.onModelValueChange.bind(this)}/>
                            </Item>
                            <Item regular>
                                <Input placeholder='Car Color' onChangeText={this.onColorValueChange.bind(this)}/>
                            </Item>
                        </Content>
                    </Content>

                </Container>
                    <Footer>
                        <FooterTab>
                            <Button block success style={styles.checkout}
                                onPress={() => this.props.navigation.navigate("CheckoutScreen")}>
                                <Body>
                                    <Text style={styles.checkoutText}>Checkout</Text>
                                </Body>
                                <Right>
                                    <Text style={styles.checkoutText}>${state.params.totalAmount}</Text>
                                </Right>
                            </Button>
                        </FooterTab>
                    </Footer>
            </Container>
        );
    }
}