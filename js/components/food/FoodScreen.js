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
import FoodListItem from "./FoodListItem";
import DrinkItem from "./DrinkItem";
export default class FoodScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            food: {
                hamburger: {name: "Hamburger", price: 3.50, amount: 0, condiments: [], hasCondiments: true},
                cheeseburger: {name: "Cheeseburger", price: 4.00, amount: 0, condiments: [], hasCondiments: true},
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
                small: {name: "Small Drink", price: 2.00, amount: 0},
                medium: {name: "Medium Drink", price: 3.00, amount: 0},
                large: {name: "Large Drink", price: 4.00, amount: 0},
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
            shoppingCartColor: 'black'
        }
        this.totalHandler = this.addTotal.bind(this);
    }

    addTotal(items) {
        let i;
        let newOrder = this.state.order;
        for (item of items) {
            for (i = 0; i < newOrder.length; i++) {
                if (newOrder[i].name === item.name) {
                    newOrder.splice(i, 1);
                }
            }
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
        let color = 'black';
        if (total > 0) {
            color =  '#32cd32';
        }
        this.setState({order: newOrder, totalAmount: total, shoppingCartColor: color});
    }


    render() {

        const {navigate} = this.props.navigation;
        return (
            <Container style={styles.container}>
                <Header
                    hasTabs>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu" style={{color: 'white'}} size={25}/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Food</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={()=> this.props.navigation.navigate("Settings")}>
                            <Icon name="settings" style={{color: 'white'}} size={25}/>
                        </Button>
                    </Right>
                </Header>
                <Tabs>
                    <Tab heading={ <TabHeading><Icon name="food" size={25}/><Text>Food</Text></TabHeading>}>
                        <Content>
                            <List>
                                <FoodListItem item={this.state.food.hamburger} handler = {this.totalHandler}/>
                                <FoodListItem item={this.state.food.cheeseburger} handler = {this.totalHandler}/>
                                <FoodListItem item={this.state.food.hotdog} handler = {this.totalHandler}/>
                                <FoodListItem item={this.state.food.chilicheesedog} handler = {this.totalHandler}/>
                                <FoodListItem item={this.state.food.smallnachos} handler = {this.totalHandler}/>
                                <FoodListItem item={this.state.food.largenachos} handler = {this.totalHandler}/>
                                <FoodListItem item={this.state.food.chilicheesenachos} handler = {this.totalHandler}/>
                                <FoodListItem item={this.state.food.pickle} handler = {this.totalHandler}/>
                                <FoodListItem item={this.state.food.superpretzel} handler = {this.totalHandler}/>
                                <FoodListItem item={this.state.food.superpretzelwithcheese} handler = {this.totalHandler}/>
                                <FoodListItem item={this.state.food.cottoncandy} handler = {this.totalHandler}/>
                                <FoodListItem item={this.state.food.smallcandy} handler = {this.totalHandler}/>
                                <FoodListItem item={this.state.food.largecandy} handler = {this.totalHandler}/>
                                <FoodListItem item={this.state.food.dots} handler = {this.totalHandler}/>
                            </List>
                        </Content>
                    </Tab>
                    <Tab heading={ <TabHeading><Icon name="water" size={25} /><Text>Drink</Text></TabHeading>}>
                        <Content>
                            <List>
                                <DrinkItem item={this.state.drink.small} handler = {this.totalHandler} size = "Small"/>
                                <DrinkItem item={this.state.drink.medium} handler = {this.totalHandler} size = "Medium"/>
                                <DrinkItem item={this.state.drink.large} handler = {this.totalHandler} size = "Large"/>
                                <FoodListItem item={this.state.drink.dasani} handler = {this.totalHandler}/>
                                <FoodListItem item={this.state.drink.yoohoo} handler = {this.totalHandler}/>
                                <FoodListItem item={this.state.drink.monster} handler = {this.totalHandler}/>
                            </List>
                        </Content>
                    </Tab>
                    <Tab heading={ <TabHeading><Icon name="popcorn" size={25}/><Text>Popcorn</Text></TabHeading>}>
                        <Content>
                            <List>
                                <FoodListItem item={this.state.popcorn.small} handler = {this.totalHandler}/>
                                <FoodListItem item={this.state.popcorn.medium} handler = {this.totalHandler}/>
                                <FoodListItem item={this.state.popcorn.large} handler = {this.totalHandler}/>
                                <FoodListItem item={this.state.popcorn.jumbo} handler = {this.totalHandler}/>
                                <FoodListItem item={this.state.popcorn.combo} handler = {this.totalHandler}/>
                            </List>
                        </Content>
                    </Tab>

                </Tabs>
                <Footer>
                    <Left>
                        <Text style={{marginLeft: 10, fontSize: 25}}>Total: ${this.state.totalAmount}</Text>
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