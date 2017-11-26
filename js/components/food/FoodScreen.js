import React, { Component } from 'react';
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Platform } from 'react-native';
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
import FoodListItem from "./FoodListItem";
export default class FoodScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            food: {
                hamburger: {name: "Hamburger", price: 3.50, amount: 0, hasCondiments: true, itemsWithCondiments: []},
                cheeseburger: {name: "Cheeseburger", price: 4.00, amount: 0, hasCondiments: true, itemsWithCondiments: []},
                hotdog: {name: "Hotdog", price: 3.00, amount: 0},
                chilicheesedog: {name: "Chili-Cheese Dog", price: 4.00, amount: 0},
                smallnachos: {name: "Small Nachos", price: 3.00, amount: 0},
                largenachos: {name: "Large Nachos", price: 5.00, amount: 0},
                chilicheesenachos: {name: "Chili-Cheese Nachos", price: 5.00, amount: 0},
                pickle: {name: "Pickle", price: 1.00, amount: 0},
                superpretzel: {name: "Super Pretzel", price: 3.00, amount: 0},
                superpretzelwithcheese: {name: "Super Pretzel with Cheese", price: 3.50, amount: 0},
                cottoncandy: {name: "Cotton Candy", price: 3.00, amount: 0},
                smallcandy: {name: "Small Candy", price: 2.00, amount: 0},
                largecandy: {name: "Large Candy", price: 2.50, amount: 0},
                dots: {name: "Dippin' Dots", price: 3.50, amount: 0}
            },
            drink:{
                small: {name: "Small Drink", price: 2.00, amount: 0, hasFlavors: true, itemsWithCondiments: [], size:"Small"},
                medium: {name: "Medium Drink", price: 3.00, amount: 0, hasFlavors: true, itemsWithCondiments: [], size:"Medium"},
                large: {name: "Large Drink", price: 4.00, amount: 0, hasFlavors: true, itemsWithCondiments: [], size:"Large"},
                dasani: {name: "Dasani Bottled Water", price: 2.00, amount: 0},
                yoohoo: {name: "Yoo-Hoo", price: 2.00, amount: 0},
                monster: {name: "Monster Energy Drink", price: 3.00, amount: 0},
            },
            popcorn:{
                small: {name: "Small Popcorn", price: 3.00, amount: 0},
                medium: {name: "Medium Popcorn", price: 4.00, amount: 0},
                large: {name: "Large Popcorn", price: 5.00, amount: 0},
                jumbo: {name: "Jumbo Collectors Bucket", price: 7.00, amount: 0},
                combo: {name: "Combo Deal (1 Large Popcorn and 2 Large Drinks)", price: 12.00, amount: 0},
            },
            order: [],
            totalAmount: 0,
            shoppingCartColor: 'white',
            foodSelected: true,
            drinkSelected: false,
            popcornSelected: false
        };
        this.addPreviousOrder();
        this.totalHandler = this.addTotal.bind(this);
    }

    emptyCartColor = 'white';
    fullCartColor = '#4BFF32';

    addPreviousOrder() {
        if (this.props.navigation !== undefined) {
            if (this.props.navigation.state.params !== undefined) {
                if (this.props.navigation.state.params.order !== undefined) {
                    this.state.totalAmount = this.props.navigation.state.params.totalAmount;
                    this.state.order = this.props.navigation.state.params.order;
                    let color = this.emptyCartColor;

                    if (this.state.totalAmount > 0) {
                        color = this.fullCartColor;
                    }
                    this.state.shoppingCartColor = color;
                    this.updateItems(this.state.food);
                    this.updateItems(this.state.drink);
                    this.updateItems(this.state.popcorn);
                }
            }
        }
    }

    updateItems(items) {
        for (item of this.state.order) {
            for (foodItem in items) {
                if (item.name === items[foodItem].name || (item.name.split(" ")[0] === items[foodItem].name.split(" ")[0] && items[foodItem].name.split(" ")[1] === "Drink")) {
                    if (items[foodItem].hasCondiments || items[foodItem].hasFlavors) {
                        items[foodItem].amount += item.amount;
                        items[foodItem].itemsWithCondiments.push(item);
                    } else {
                        items[foodItem].amount = item.amount;
                    }
                }
            }
        }
    }

    addTotal(items) {
        let i;
        let newOrder = this.state.order;
        for (item of items) {
            newOrder = newOrder.filter(function (element) {
                return element.name !== item.name;
            });
        }
        for (item of items) {
            if (parseInt(item.amount) > 0) {
                newOrder.push({
                    name: item.name,
                    price: item.price,
                    amount: item.amount,
                    itemTotal: item.amount * item.price,
                    condiments: item.condiments
                });
            }
        }

        let total = 0;
        for (i = 0; i < newOrder.length; i++) {
            total = total + newOrder[i].itemTotal;
        }
        let color = this.emptyCartColor;
        if (total > 0) {
            color = this.fullCartColor;
        }
        this.setState({order: newOrder, totalAmount: total, shoppingCartColor: color});
    }

    onChangeTab(tab) {
        if (tab.i === 0) {
            this.setState({foodSelected: true, drinkSelected: false, popcornSelected: false})
        } else if (tab.i === 1) {
            this.setState({foodSelected: false, drinkSelected: true, popcornSelected: false})
        } else {
            this.setState({foodSelected: false, drinkSelected: false, popcornSelected: true})
        }
    }


    render() {

        const {navigate} = this.props.navigation;
        return (
            <Container style={styles.container}>
                <Header
                    hasTabs
                    style={styles.headerFooterStyle}>
                    <Left style={styles.menuTextStyle}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu" style={{color: 'white'}} size={25}/>
                        </Button>
                        <Title style={styles.tabHeaderTextStyle}>Food</Title>
                    </Left>
                    <Body>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={()=> this.props.navigation.navigate("Settings")}>
                            <Icon name="settings" style={styles.tabHeaderTextStyle} size={25}/>
                        </Button>
                    </Right>
                </Header>
                <Tabs
                    tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                    onChangeTab={this.onChangeTab.bind(this)}>
                    <Tab heading={ <TabHeading style={styles.tabStyle}><Icon style={this.state.foodSelected ? styles.tabIconActiveStyle : styles.tabIconNotActiveStyle} name="food" size={25} /><Text style={this.state.foodSelected ? styles.tabIconActiveStyle : styles.tabIconNotActiveStyle} >Food</Text></TabHeading>}>
                        <Content>
                            <List>
                                <List
                                    dataArray={this.state.food}
                                    renderRow={orderItem =>
                                        <FoodListItem item={orderItem} handler = {this.totalHandler}/>}/>
                            </List>
                        </Content>
                    </Tab>
                    <Tab heading={ <TabHeading style={styles.tabStyle}><Icon style={this.state.drinkSelected ? styles.tabIconActiveStyle : styles.tabIconNotActiveStyle} name="water" size={25} /><Text style={this.state.drinkSelected ? styles.tabIconActiveStyle : styles.tabIconNotActiveStyle}>Drink</Text></TabHeading>}>
                        <Content>
                            <List
                                dataArray={this.state.drink}
                                renderRow={orderItem =>
                                    <FoodListItem item={orderItem} handler = {this.totalHandler}/>}/>
                        </Content>
                    </Tab>
                    <Tab heading={ <TabHeading style={styles.tabStyle}><Icon style={this.state.popcornSelected ? styles.tabIconActiveStyle : styles.tabIconNotActiveStyle} name="popcorn" size={25}/><Text style={this.state.popcornSelected ? styles.tabIconActiveStyle : styles.tabIconNotActiveStyle}>Popcorn</Text></TabHeading>}>
                        <Content>
                            <List
                                dataArray={this.state.popcorn}
                                renderRow={orderItem =>
                                    <FoodListItem item={orderItem} handler = {this.totalHandler}/>}/>
                        </Content>
                    </Tab>

                </Tabs>
                <Footer style={styles.headerFooterStyle}>
                    <Left>
                        <Text style={styles.totalTextStyle}>Total: ${this.state.totalAmount}</Text>
                    </Left>
                    <Right>
                        <Button transparent
                        onPress={() =>
                        {
                            if (this.state.totalAmount > 0)
                            {
                                navigate("ShoppingCart", {order: this.state.order, totalAmount: this.state.totalAmount})
                            }
                        }
                        }>
                            <Icon name="cart-outline" size={25} style={{color: this.state.shoppingCartColor, marginRight: 20}}/>
                        </Button>
                    </Right>
                </Footer>
            </Container>
        );
    }
}