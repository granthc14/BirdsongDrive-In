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
export default class FoodScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            food: {
                hamburger: {name: "Hamburger", price: 3.50, amount: 0},
                cheeseburger: {name: "Cheeseburger", price: 4.00, amount: 0},
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
                small: {name: "Small", price: 2.00, amount: 0},
                medium: {name: "Medium", price: 3.00, amount: 0},
                large: {name: "Large", price: 4.00, amount: 0},
                dasani: {name: "Dasani Bottled Water", price: 2.00, amount: 0},
                yoohoo: {name: "Yoo-Hoo", price: 2.00, amount: 0},
                monster: {name: "Monster Energy Drink", price: 3.00, amount: 0},
            },
            popcorn:{
                small: {name: "Small", price: 3.00, amount: 0},
                medium: {name: "Medium", price: 4.00, amount: 0},
                large: {name: "Large", price: 5.00, amount: 0},
                jumbo: {name: "Jumbo Collectors Bucket", price: 7.00, amount: 0},
                combo: {name: "Combo Deal (1 Large Popcorn and 2 Large Drinks)", price: 12.00, amount: 0},
            },
            total: [],
            totalAmount: 0
        }
        this.totalHandler = this.addTotal.bind(this);
    }

    addTotal(value) {
        let i;
        let newTotal = this.state.total;
        for (i = 0; i < newTotal.length; i++)
        {
            if (newTotal[i].name === value.name)
            {
                newTotal.splice(i, 1);
            }
        }
        newTotal.push({name: value.name, amount: value.amount, itemTotal: value.amount * value.price});


        let total = 0;
        for (i = 0; i < newTotal.length; i++)
        {
            total = total + newTotal[i].itemTotal;
        }

        this.setState({total: newTotal, totalAmount: total});
    }

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
                        <List>
                            <FoodListItem item={this.state.drink.small} handler = {this.totalHandler}/>
                            <FoodListItem item={this.state.drink.medium} handler = {this.totalHandler}/>
                            <FoodListItem item={this.state.drink.large} handler = {this.totalHandler}/>
                            <FoodListItem item={this.state.drink.dasani} handler = {this.totalHandler}/>
                            <FoodListItem item={this.state.drink.yoohoo} handler = {this.totalHandler}/>
                            <FoodListItem item={this.state.drink.monster} handler = {this.totalHandler}/>
                        </List>
                    </Tab>
                    <Tab heading={ <TabHeading><Icon name="popcorn" size={25}/><Text>Popcorn</Text></TabHeading>}>
                        <List>
                            <FoodListItem item={this.state.popcorn.small} handler = {this.totalHandler}/>
                            <FoodListItem item={this.state.popcorn.medium} handler = {this.totalHandler}/>
                            <FoodListItem item={this.state.popcorn.large} handler = {this.totalHandler}/>
                            <FoodListItem item={this.state.popcorn.jumbo} handler = {this.totalHandler}/>
                            <FoodListItem item={this.state.popcorn.combo} handler = {this.totalHandler}/>
                        </List>
                    </Tab>

                </Tabs>
                <Footer>
                    <Left>
                        <Text>Total: ${this.state.totalAmount}</Text>
                    </Left>
                </Footer>
            </Container>
        );
    }
}