import React, { Component } from 'react';
import styles from "./styles";
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    H3,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
    ListItem,
    Item,
    Input
} from "native-base";
import FoodScreen from "./FoodScreen";
export default class DrinkCollapsedItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
        }
    }

    render() {
        return (
            <ListItem>
                <Left>
                    <Text>{this.state.item.name}</Text>
                </Left>
                <Body>
                </Body>
                <Right>
                    <Item regular>
                        <Input
                            keyboardType="numeric"
                            maxLength={2}
                            placeholder={this.props.item.amount.toString()}
                            onChangeText={(value) =>
                            {
                                if (value === "")
                                {
                                    value = 0;
                                }
                                let newItem = {name: this.state.item.name, price: this.state.item.price, amount: value};
                                this.setState({item: newItem});
                                newItem = {name: this.props.size + " " + this.state.item.name, price: this.state.item.price, amount: value};
                                this.props.handler(newItem);
                            }}/>
                    </Item>
                </Right>
            </ListItem>
        );
    }
}