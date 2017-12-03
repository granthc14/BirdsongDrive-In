import React, { Component } from 'react';
import styles from "./styles";
import {ActivityIndicator, View, AsyncStorage, Platform} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import SideBar from "../sidebar/index.js"
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

let EMAIL_KEY = "@MyEmail:key";


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
            email:'',
            notes:'',
            numberKetchup:'',
            numberMustard:'',
            numberMayonnaise:'',
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
            emailValidation: {
                valid: false,
                validIcon: this.errorIcon,
                validIconColor: this.errorColor
            },
            isLoading: true
        };

        this.getEmail();
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
    onEmailValueChange(value: string) {
        if (value === "" || value.indexOf('@') === -1) {
            this.setState({
                email: value,
                emailValidation: {
                    valid: false,
                    validIcon: this.errorIcon,
                    validIconColor: this.errorColor
                }
            });
        } else {
            this.setState({
                email: value,
                emailValidation: {
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

    onKetchupValueChange(value: string) {
        this.setState({
            numberKetchup: value
        });
    }

    onMustardValueChange(value: string) {
        this.setState({
            numberMustard: value
        });
    }
    onMayoValueChange(value: string) {
        this.setState({
            numberMayonnaise: value
        });
    }

    saveEmail(value: string) {
        try {
            AsyncStorage.setItem(EMAIL_KEY, value);
            this.onEmailValueChange(value);
            this.setState({email:value});
        } catch (error) {
            console.log("Error saving email");
        }
    }

    async getEmail() {
        try {
            let value = await AsyncStorage.getItem(EMAIL_KEY);
            if (value === null) {
                value = ""
            }
            this.setState({isLoading: false, email: value});
            this.onEmailValueChange(value);
        } catch (error) {
            console.log(error);
        }
    }

    getButtonOrTextColor() {
        return (this.state.makeValidation.valid && this.state.colorValidation.valid && this.state.modelValidation.valid && this.state.emailValidation.valid) ? this.successColor : this.errorColor
    }


    render() {

        const {state} = this.props.navigation;
        const {navigate} = this.props.navigation;
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            )
        } else {
            return (

                <Container style={styles.container}>
                    <Header style={styles.headerFooterStyle}>
                        <Left style={styles.menuTextStyle}>
                            <Button transparent onPress={() => navigate("Food", {
                                order: state.params.order,
                                totalAmount: state.params.totalAmount,
                                totalAmountWithDiscount: state.params.totalAmountWithDiscount
                            })}>
                                <Icon name="arrow-left" size={25} style={{color: 'white'}}/>
                            </Button>
                            <Title style={styles.tabHeaderTextStyle}>Your Order</Title>
                        </Left>
                        <Right/>
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
                                    <Item regular success={this.state.makeValidation.valid}
                                          error={!this.state.makeValidation.valid}>
                                        <Input placeholder="Car Make" onChangeText={this.onMakeValueChange.bind(this)}/>
                                        <Icon name={this.state.makeValidation.validIcon}
                                              color={this.state.makeValidation.validIconColor} size={25}/>
                                    </Item>
                                    <Item regular success={this.state.modelValidation.valid}
                                          error={!this.state.modelValidation.valid}>
                                        <Input placeholder="Car Model"
                                               onChangeText={this.onModelValueChange.bind(this)}/>
                                        <Icon name={this.state.modelValidation.validIcon}
                                              color={this.state.modelValidation.validIconColor} size={25}/>
                                    </Item>
                                    <Item regular success={this.state.colorValidation.valid}
                                          error={!this.state.colorValidation.valid}>
                                        <Input placeholder="Car Color"
                                               onChangeText={this.onColorValueChange.bind(this)}/>
                                        <Icon name={this.state.colorValidation.validIcon}
                                              color={this.state.colorValidation.validIconColor} size={25}/>
                                    </Item>

                                    <Item regular success={this.state.emailValidation}
                                          error={!this.state.emailValidation}>
                                        <Input
                                            placeholder="My Email"
                                            value={this.state.email}
                                            onChangeText={this.saveEmail.bind(this)}/>
                                        <Icon name={this.state.emailValidation.validIcon}
                                              color={this.state.emailValidation.validIconColor} size={25}/>
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
                                            placeholder='# of Mustard Packets'
                                            onChangeText={this.onMustardValueChange.bind(this)}/>
                                    </Item>
                                    <Item regular>
                                        <Input
                                            keyboardType="numeric"
                                            maxLength={2}
                                            placeholder='# of Ketchup Packets'
                                            onChangeText={this.onKetchupValueChange.bind(this)}/>
                                    </Item>
                                    <Item regular>
                                        <Input
                                            keyboardType="numeric"
                                            maxLength={2}
                                            placeholder='# of Mayonnaise Packets'
                                            onChangeText={this.onMayoValueChange.bind(this)}/>
                                    </Item>
                                </Form>
                            </Content>
                        </Content>

                    </Container>
                    <Footer>
                        <FooterTab>
                            <Button block
                                    backgroundColor={this.getButtonOrTextColor()}
                                    style={styles.checkout}
                                    onPress={() => {
                                        if (this.state.makeValidation.valid && this.state.colorValidation.valid && this.state.modelValidation.valid) {
                                            navigate("CheckoutScreen", {
                                                order: {
                                                    screenNo: this.state.screen,
                                                    orderNo: 0,
                                                    carMake: this.state.make,
                                                    carModel: this.state.model,
                                                    carColor: this.state.color,
                                                    cashOrCard: this.state.paymentMethod,
                                                    items: state.params.order,
                                                    cost: state.params.totalAmount,
                                                    extras: {
                                                        email: this.state.email,
                                                        notes: this.state.notes,
                                                        numKetchup: this.state.numberKetchup,
                                                        numMustard: this.state.numberMustard,
                                                        numMayonnaise: this.state.numberMayonnaise
                                                    },
                                                    displayNo: 0
                                                }
                                            });
                                        }
                                    }}>
                                <Body>
                                <Text style={{
                                    fontSize: 20,
                                    color: Platform.OS === 'ios' ? this.getButtonOrTextColor() : "#fff"
                                }}>Checkout</Text>
                                </Body>
                                <Right>
                                    <Text style={{
                                        fontSize: 20,
                                        color: Platform.OS === 'ios' ? this.getButtonOrTextColor() : "#fff"
                                    }}>${state.params.totalAmountWithDiscount}</Text>
                                </Right>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            );
        }
    }
}