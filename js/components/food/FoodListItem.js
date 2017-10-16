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
    Input,
    Card,
    CardItem
} from "native-base";
import {View,Modal} from 'react-native';
import FoodScreen from "./FoodScreen";
export default class FoodListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            infoVisible: false
        }
    }

    render() {
        return (
            <ListItem onLongPress={() => this.setState({infoVisible: true})}>
                <Left>
                    <Text>{this.state.item.name}</Text>
                </Left>
                <Body>
                    <Text>${this.state.item.price}</Text>

                    <View>
                        <Modal animationType="fade"
                               visible={this.state.infoVisible}
                                transparent={true}>
                            <View style={{flexDirection:'column', justifyContent: 'center', alignItems:'center', flex:1, backgroundColor: '#00000080', opacity: 50}}>
                                <Card style={{width:300, height:300, flex: 0}}>
                                    <CardItem header>
                                        <Left>
                                            <Text>{this.state.item.name}</Text>
                                            <Text note> Calorie and other nutritional information will go here</Text>
                                        </Left>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <Text> An Image Will go here showing the food</Text>
                                            <Text>A description of the item will also go here</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem footer>
                                        <Button transparent onPress={() => this.setState({infoVisible: false})}>
                                            <Text>Close</Text>
                                        </Button>
                                    </CardItem>
                                </Card>
                            </View>
                        </Modal>
                    </View>

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
                            this.props.handler(newItem);
                        }}/>
                    </Item>
                </Right>
            </ListItem>
        );
    }
}