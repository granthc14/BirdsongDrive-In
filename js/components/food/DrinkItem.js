import React, { Component } from 'react';
import View from 'react-native';
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
    ListItem,
    List,
    Item,
    Input
} from "native-base";
import Collapsible from 'react-native-collapsible';
import DrinkCollapsedItem from "./DrinkCollapsedItem";
export default class DrinkItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            collapsed: true,
            drinkTypes: {
                coke: {name: 'Coca-Cola', price: this.props.item.price, amount:0},
                dietCoke: {name: 'Diet Coke', price: this.props.item.price, amount:0},
                drPepper: {name: 'Dr. Pepper', price: this.props.item.price, amount:0},
                dietDrPepper: {name: 'Diet Dr. Pepper', price: this.props.item.price, amount:0},
                sprite: {name: 'Sprite', price: this.props.item.price, amount:0},
                melloYello: {name: 'MelloYello', price: this.props.item.price, amount:0},
                lemonade: {name: 'Lemonade', price: this.props.item.price, amount:0},
            },
            size: this.props.size,
            iconExpand: 'arrow-down-drop-circle',
            iconCollapse: 'arrow-up-drop-circle',
            listIcon: 'arrow-down-drop-circle'
        }
    }

    render() {
        return (
            <List>
                <ListItem>
                    <Left>
                        <Text>{this.state.item.name}</Text>
                    </Left>
                    <Body>
                         <Text>${this.state.item.price}</Text>
                    </Body>
                    <Right>
                        <Button transparent
                            onPress={() => this.setState({collapsed: !this.state.collapsed, listIcon: this.state.collapsed ? this.state.iconCollapse: this.state.iconExpand})}>
                            <Icon name={this.state.listIcon} size = {25}/>
                        </Button>
                    </Right>
                </ListItem>
                    <Collapsible collapsed={this.state.collapsed}>
                        <DrinkCollapsedItem item={this.state.drinkTypes.coke} handler = {this.props.handler} size = {this.state.size}/>
                        <DrinkCollapsedItem item={this.state.drinkTypes.dietCoke} handler = {this.props.handler} size = {this.state.size}/>
                        <DrinkCollapsedItem item={this.state.drinkTypes.drPepper} handler = {this.props.handler} size = {this.state.size}/>
                        <DrinkCollapsedItem item={this.state.drinkTypes.dietDrPepper} handler = {this.props.handler} size = {this.state.size}/>
                        <DrinkCollapsedItem item={this.state.drinkTypes.sprite} handler = {this.props.handler} size = {this.state.size}/>
                        <DrinkCollapsedItem item={this.state.drinkTypes.melloYello} handler = {this.props.handler} size = {this.state.size}/>
                        <DrinkCollapsedItem item={this.state.drinkTypes.lemonade} handler = {this.props.handler} size = {this.state.size}/>
                    </Collapsible>
            </List>
        );
    }
}