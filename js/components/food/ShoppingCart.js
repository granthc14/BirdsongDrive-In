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
    Input,
    Label
} from "native-base";


export default class ShoppingCart extends Component {

    errorColor = "#ff0700";
    successColor = "#0DD936";
    errorIcon = "alert-circle";
    successIcon = "check-circle";

    constructor(props)
    {
        super(props);
        this.state = {
            screen: '1',
            paymentMethod: 'card',
            make:'',
            model:'',
            color:'',
            notes:'',
            makeValidation: {
                valid: false,
                validIcon: this.errorIcon,
                validIconColor: this.errorColor
            },
            modelValidation: {
                valid: false,
                validIcon: this.errorIcon,
                validIconColor: this.errorColor
            },
            colorValidation: {
                valid: false,
                validIcon: this.errorIcon,
                validIconColor: this.errorColor
            },
        }
    }

    onScreenValueChange(value: string) {
        this.setState({
            screen:value
        });
    }
    onPaymentValueChange(value: string) {
        this.setState({
            paymentMethod:value
        });
    }
    onMakeValueChange(value: string) {
        if (value === "") {
            this.setState({
                make:value,
                makeValidation: {
                    valid: false,
                    validIcon: this.errorIcon,
                    validIconColor: this.errorColor
                }
            });
        } else {
            this.setState({
                make: value,
                makeValidation: {
                    valid: true,
                    validIcon: this.successIcon,
                    validIconColor: this.successColor
                }
            });
        }
    }
    onModelValueChange(value: string) {
        if (value === "") {
            this.setState({
                model:value,
                modelValidation: {
                    valid: false,
                    validIcon: this.errorIcon,
                    validIconColor: this.errorColor
                }
            });
        } else {
            this.setState({
                model: value,
                modelValidation: {
                    valid: true,
                    validIcon: this.successIcon,
                    validIconColor: this.successColor
                }
            });
        }
    }
    onColorValueChange(value: string) {
        if (value === "") {
            this.setState({
                color:value,
                colorValidation: {
                    valid: false,
                    validIcon: this.errorIcon,
                    validIconColor: this.errorColor
                }
            });
        } else {
            this.setState({
                color: value,
                colorValidation: {
                    valid: true,
                    validIcon: this.successIcon,
                    validIconColor: this.successColor
                }
            });
        }
    }

    onNotesValueChange(value: string) {
        this.setState({
            notes: value
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
                                        <Text>#{orderItem.amount}</Text>
                                        <Text>{orderItem.name}</Text>
                                    </Left>
                                    <Body>
                                        <Text> {orderItem.condiments.join(" ")}</Text>
                                    </Body>
                                    <Right style={styles.itemTotal}>
                                        <Text>${orderItem.itemTotal}</Text>
                                    </Right>
                                </ListItem>}
                        />
                        <Content>
                            <Text style={styles.selectPaymentText}>Screen #</Text>
                            <Form>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Select Method"
                                    selectedValue={this.state.screen}
                                    onValueChange={this.onScreenValueChange.bind(this)}>
                                    <Item label="Screen 1" value="1"/>
                                    <Item label="Screen 2" value="2"/>
                                </Picker>
                            </Form>

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
                            <Form>
                                <Item regular success={this.state.makeValidation.valid} error={!this.state.makeValidation.valid}>
                                    <Input placeholder="Car Make" onChangeText={this.onMakeValueChange.bind(this)}/>
                                    <Icon name={this.state.makeValidation.validIcon} color={this.state.makeValidation.validIconColor} size={25}/>
                                </Item>
                                <Item regular success={this.state.modelValidation.valid} error={!this.state.modelValidation.valid}>
                                    <Input placeholder="Car Model" onChangeText={this.onModelValueChange.bind(this)}/>
                                    <Icon name={this.state.modelValidation.validIcon} color={this.state.modelValidation.validIconColor} size={25}/>
                                </Item>
                                <Item regular success={this.state.colorValidation.valid} error={!this.state.colorValidation.valid}>
                                    <Input placeholder="Car Color"onChangeText={this.onColorValueChange.bind(this)}/>
                                    <Icon name={this.state.colorValidation.validIcon} color={this.state.colorValidation.validIconColor} size={25}/>
                                </Item>
                                <Item regular last>
                                    <Input placeholder="Notes" onChangeText={this.onNotesValueChange.bind(this)}/>
                                </Item>
                            </Form>
                            <Form>
                                <Item regular>
                                    <Input
                                        keyboardType="numeric"
                                        maxLength={2}
                                        placeholder='# of Mustard Packets'/>
                                </Item>
                                <Item regular>
                                    <Input
                                        keyboardType="numeric"
                                        maxLength={2}
                                        placeholder='# of Ketchup Packets'/>
                                </Item>
                                <Item regular>
                                    <Input
                                        keyboardType="numeric"
                                        maxLength={2}
                                        placeholder='# of Mayonnaise Packets'/>
                                </Item>
                            </Form>
                        </Content>
                    </Content>

                </Container>
                    <Footer>
                        <FooterTab>
                            <Button block
                                    backgroundColor={(this.state.makeValidation.valid && this.state.colorValidation.valid && this.state.modelValidation.valid) ? this.successColor : this.errorColor}
                                    style={styles.checkout}
                                onPress={() => {
                                    if (this.state.makeValidation.valid && this.state.colorValidation.valid && this.state.modelValidation.valid) {
                                        this.props.navigation.navigate("CheckoutScreen");
                                    }
                                }}>
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