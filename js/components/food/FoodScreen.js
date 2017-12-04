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
import {ActivityIndicator, View} from "react-native";
import FoodListItem from "./FoodListItem";
export default class FoodScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            food: [],
            drink:[],
            popcorn:[],
            candy:[],
            order: [],
            totalAmount: 0,
            totalAmountWithDiscount: 0,
            shoppingCartColor: 'white',
            foodSelected: true,
            drinkSelected: false,
            popcornSelected: false,
            candySelected: false,
            combos: [
                {
                    name: "1 Large Popcorn and 2 Large Drinks",
                    items: [
                        {name: "Large Popcorn", price: 5.00, amount: 1},
                        {name: "Large Drink", price: 4.00, amount: 2},
                    ],
                    totalItems: 3,
                    itemCount: 3,
                    discount: -1
                }
            ],
            isLoading: true
        };
        this.getFoodItems();
        this.totalHandler = this.addTotal.bind(this);
    }

    emptyCartColor = 'white';
    fullCartColor = '#4BFF32';

    async getFoodItems(){
        let response = await fetch('https://birdsong.mybluemix.net/get_concessions');
        let data = await response.json();
        let food = data.filter(function (item) {
            return item.type === "food"
        });
        let drink = data.filter(function (item) {
            return item.type === "drink"
        });
        let popcorn = data.filter(function (item) {
            return item.type === "popcorn"
        });
        let candy = data.filter(function (item) {
            return item.type === "candy"
        });
        let combo = data.filter(function (item) {
            return item.type === "combo"
        });
        this.setState({food: food, drink: drink, popcorn: popcorn, candy: candy, combos: combo});
        this.addPreviousOrder();
    }
    addPreviousOrder() {
        if (this.props.navigation !== undefined) {
            if (this.props.navigation.state.params !== undefined) {
                if (this.props.navigation.state.params.order !== undefined) {
                    this.state.totalAmount = this.props.navigation.state.params.totalAmount;
                    this.state.totalAmountWithDiscount = this.props.navigation.state.params.totalAmountWithDiscount;
                    this.state.order = this.props.navigation.state.params.order;
                    let color = this.emptyCartColor;

                    if (this.state.totalAmount > 0) {
                        color = this.fullCartColor;
                    }
                    this.state.shoppingCartColor = color;
                    this.state.order = this.props.navigation.state.params.order.filter(function (item) {
                        return item.itemTotal > 0;
                    });
                    this.updateItems(this.state.food);
                    this.updateItems(this.state.drink);
                    this.updateItems(this.state.popcorn);
                }
            }
        }
        this.setState({isLoading: false});
    }

    updateItems(items) {
        for (item of this.state.order) {
            for (foodItem in items) {
                if (item.name === items[foodItem].name || (item.name.split(" ")[0] === items[foodItem].name.split(" ")[0] && items[foodItem].name.split(" ")[1] === "Drink") && this.checkIfDrink(item)) {
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
            this.setState({foodSelected: true, drinkSelected: false, popcornSelected: false, candySelected: false})
        } else if (tab.i === 1) {
            this.setState({foodSelected: false, drinkSelected: true, popcornSelected: false, candySelected: false})
        } else if (tab.i === 2){
            this.setState({foodSelected: false, drinkSelected: false, popcornSelected: true, candySelected: false})
        } else {
            this.setState({foodSelected: false, drinkSelected: false, popcornSelected: false, candySelected: true})
        }
    }

    checkIfDrink(item) {
        return item.name.split(" ").indexOf("Popcorn") === -1 && item.name.split(" ").indexOf("Nachos") === -1 && item.name.split(" ").indexOf("Candy") === -1

    }
    calculateCombos() {
        let combos = this.state.combos;
        let items = this.state.order;
        this.state.totalAmountWithDiscount = this.state.totalAmount;
        for (combo of combos) {
            for (comboItem of combo.items) {
                for (item of items) {
                    if (item.name === comboItem.name) {
                        combo.totalItems -= item.amount;
                    }else if (comboItem.name.split(" ").indexOf("Drink") !== -1 && this.checkIfDrink(item)) {
                        if (item.name.split(" ")[0] === comboItem.name.split(" ")[0]) {
                            combo.totalItems -= item.amount;
                        }
                    }
                }
            }
            if (combo.totalItems <= 0) {
                let discount = {
                    name: combo.name,
                    price: combo.discount,
                    amount: 1,
                    itemTotal: combo.discount,
                    condiments: []
                };
                while(combo.totalItems <= 0) {
                    this.state.order.push(discount);
                    this.state.totalAmountWithDiscount += combo.discount;
                    combo.totalItems += combo.itemCount;
                }
            }
        }
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            )
        }
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
                    <Right/>
                </Header>
                <Tabs
                    tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                    onChangeTab={this.onChangeTab.bind(this)}>
                    <Tab heading={ <TabHeading style={styles.tabStyle}><Icon style={this.state.foodSelected ? styles.tabIconActiveStyle : styles.tabIconNotActiveStyle} name="food" size={20} /><Text style={this.state.foodSelected ? styles.tabIconActiveStyle : styles.tabIconNotActiveStyle} >Food</Text></TabHeading>}>
                        <Content>
                            <List>
                                <List
                                    dataArray={this.state.food}
                                    renderRow={orderItem =>
                                        <FoodListItem item={orderItem} handler = {this.totalHandler}/>}/>
                            </List>
                        </Content>
                    </Tab>
                    <Tab heading={ <TabHeading style={styles.tabStyle}><Icon style={this.state.drinkSelected ? styles.tabIconActiveStyle : styles.tabIconNotActiveStyle} name="water" size={20} /><Text style={this.state.drinkSelected ? styles.tabIconActiveStyle : styles.tabIconNotActiveStyle}>Drink</Text></TabHeading>}>
                        <Content>
                            <List
                                dataArray={this.state.drink}
                                renderRow={orderItem =>
                                    <FoodListItem item={orderItem} handler = {this.totalHandler}/>}/>
                        </Content>
                    </Tab>
                    <Tab heading={ <TabHeading style={styles.tabStyle}><Icon style={this.state.popcornSelected ? styles.tabIconActiveStyle : styles.tabIconNotActiveStyle} name="popcorn" size={20}/><Text style={this.state.popcornSelected ? styles.tabIconActiveStyle : styles.tabIconNotActiveStyle}>Popcorn</Text></TabHeading>}>
                        <Content>
                            <List
                                dataArray={this.state.popcorn}
                                renderRow={orderItem =>
                                    <FoodListItem item={orderItem} handler = {this.totalHandler}/>}/>
                        </Content>
                    </Tab>
                    <Tab heading={ <TabHeading style={styles.tabStyle}><Icon style={this.state.candySelected ? styles.tabIconActiveStyle : styles.tabIconNotActiveStyle} name="candycane" size={20}/><Text style={this.state.candySelected ? styles.tabIconActiveStyle : styles.tabIconNotActiveStyle}>Candy</Text></TabHeading>}>
                        <Content>
                            <List
                                dataArray={this.state.candy}
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
                                this.calculateCombos();
                                navigate("ShoppingCart", {order: this.state.order, totalAmount: this.state.totalAmount, totalAmountWithDiscount: this.state.totalAmountWithDiscount})
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