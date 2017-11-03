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
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
    List,
    ListItem,
    Item,
    Input,
    Card,
    CardItem,
    CheckBox
} from "native-base";
import {View,Modal, ListView} from 'react-native';
import FoodScreen from "./FoodScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
export default class FoodListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            infoVisible: false,
            amountText: this.props.item.amount,
            condimentsVisible: false,
            removeVisible: false,
            lettuceChecked: false,
            tomatoChecked: false,
            onionChecked: false,
            picklesChecked: false,
            itemsWithCondiments: []
        }
    }

    deleteRow(removedItem) {
        let newItems = this.state.itemsWithCondiments;
        for (let i = 0; i < newItems.length; i++ ) {
            newItems[i].amount = 1;
            if (this.itemIsEqual(removedItem, newItems[i])) {
                newItems.splice(i, 1);
                break;
            }
        }
        this.setState({itemsWithCondiments: newItems, amountText: this.state.amountText - 1});
        this.setState({removeVisible: false});
        if (this.state.itemsWithCondiments.length === 0) {
            this.props.handler([{name: this.state.item.name, amount: 0}]);
        } else {
            this.props.handler(this.state.itemsWithCondiments);
        }
    }

    itemIsEqual(item1, item2) {

        function compareCondiments(item1, item2) {
            for (let i = 0; i < item1.condiments.length; i++) {
                if (item1.condiments[i] !== item2.condiments[i]) {
                    return false;
                }
            }
            return true;
        }

        if (item1.name !== item2.name) {
            return false;
        } else if (item1.condiments.length !== item2.condiments.length){
            return false;
        } else return compareCondiments(item1, item2);
    }

    render() {
        if (this.props.item.hasCondiments) {
            return (
                <ListItem onLongPress={() => this.setState({infoVisible: true})}>
                    <Left style={{flex: 2}}>
                        <Text>{this.state.item.name}</Text>
                    </Left>
                    <Body style={{flex: 1}}>
                    <Text>${this.state.item.price}</Text>
                    <View>
                        <Modal animationType="fade"
                               visible={this.state.infoVisible}
                               transparent={true}>
                            <View style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                backgroundColor: '#00000080',
                                opacity: 50
                            }}>
                                <Card style={{width: 300, height: 300, flex: 0}}>
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
                    <View>
                        <Modal animationType="fade"
                               visible={this.state.removeVisible}
                               transparent={true}>
                            <View style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                backgroundColor: '#00000080',
                                opacity: 50
                            }}>
                                <Card style={{width: 300, height: 300, flex: 0}}>
                                    <CardItem header>
                                        <Left>
                                            <Text>Select the item you wish to remove</Text>
                                        </Left>
                                    </CardItem>
                                    <Container>
                                        <Content>
                                            <List
                                                dataArray={this.state.itemsWithCondiments}
                                                renderRow={(orderItem, secId, rowId, rowMap) =>
                                                    <ListItem>
                                                        <Left>
                                                            <Text>{orderItem.name}</Text>
                                                        </Left>
                                                        <Body>
                                                        <Text> {orderItem.condiments.join(" ")}</Text>
                                                        </Body>
                                                        <Right>
                                                            <Button transparent onPress={() => this.deleteRow(orderItem)}>
                                                                <Icon name="close-circle" size={25}/>
                                                            </Button>
                                                        </Right>
                                                    </ListItem>}
                                            />
                                        </Content>
                                    </Container>
                                    <CardItem footer>
                                        <Button transparent onPress={() => this.setState({removeVisible: false})}>
                                            <Text>Close</Text>
                                        </Button>
                                    </CardItem>
                                </Card>
                            </View>
                        </Modal>
                    </View>
                    <View>
                        <Modal animationType="fade"
                               visible={this.state.condimentsVisible}
                               transparent={true}>
                            <View style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                backgroundColor: '#00000080',
                                opacity: 50
                            }}>
                                <Card style={{width: 300, height: 300, flex: 0}}>
                                    <CardItem>
                                        <Text>Select Condiments:</Text>
                                    </CardItem>
                                    <CardItem header>
                                        <Content>
                                            <ListItem>
                                                <CheckBox checked={this.state.lettuceChecked} onPress={() => this.toggleLettuce(this.state.lettuceChecked)}/>
                                                <Body>
                                                    <Text> Lettuce</Text>
                                                </Body>
                                            </ListItem>
                                            <ListItem>
                                                <CheckBox checked={this.state.tomatoChecked} onPress={() => this.toggleTomato(this.state.tomatoChecked)}/>
                                                <Body>
                                                    <Text> Tomato</Text>
                                                </Body>
                                            </ListItem>
                                            <ListItem>
                                                <CheckBox checked={this.state.onionChecked} onPress={() => this.toggleOnion(this.state.onionChecked)}/>
                                                <Body>
                                                    <Text> Onion</Text>
                                                </Body>
                                            </ListItem>
                                            <ListItem>
                                                <CheckBox checked={this.state.picklesChecked} onPress={() => this.togglePickles(this.state.picklesChecked)}/>
                                                <Body>
                                                    <Text> Pickles</Text>
                                                </Body>
                                            </ListItem>
                                        </Content>
                                    </CardItem>
                                    <CardItem footer>
                                        <Button transparent onPress={() => {
                                            this.setState({condimentsVisible: false});
                                            let condiments = [];
                                            if (this.state.lettuceChecked) {
                                                condiments.push("Lettuce");
                                            }
                                            if (this.state.tomatoChecked) {
                                                condiments.push("Tomato");
                                            }
                                            if (this.state.onionChecked) {
                                                condiments.push("Onion");
                                            }
                                            if (this.state.picklesChecked) {
                                                condiments.push("Pickles");
                                            }
                                            let newItemsWithCondiments = this.state.itemsWithCondiments;
                                            let newItem = {name: this.state.item.name, price: this.state.item.price, amount: 1, condiments: condiments};
                                            newItemsWithCondiments.push(newItem);
                                            this.setState({itemsWithCondiments: newItemsWithCondiments, amountText:this.state.amountText + 1});
                                            this.uncheckAll();
                                            this.props.handler(this.state.itemsWithCondiments);
                                        }}>
                                            <Text>Add Item</Text>
                                        </Button>
                                    </CardItem>
                                    <CardItem footer>
                                        <Button transparent onPress={() => this.setState({condimentsVisible: false})}>
                                            <Text>Close</Text>
                                        </Button>
                                    </CardItem>
                                </Card>
                            </View>
                        </Modal>
                    </View>
                    </Body>
                    <Right style={{flex: 2, alignContent: 'center'}}>
                        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Button transparent
                                    onPress={() => {
                                        this.setState({removeVisible: true})
                                    }}>
                                <Icon name="minus-circle" size={25}/>
                            </Button>
                            <Text style={{fontSize: 28, paddingLeft: 10}}>{this.state.amountText}</Text>
                            <Button transparent style={{paddingLeft: 10}}
                                    onPress={() => {
                                        this.setState({condimentsVisible: true})
                                    }}>
                                <Icon name="plus-circle" size={25}/>
                            </Button>
                        </View>
                    </Right>
                </ListItem>
            );
        } else {
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
                                    let newItem = {name: this.state.item.name, price: this.state.item.price, amount: value, condiments:[]};
                                    this.setState({item: newItem});
                                    this.props.handler([newItem]);
                                }}/>
                        </Item>
                    </Right>
                </ListItem>
            );
        }
    }

    toggleLettuce(lettuceChecked) {
        this.setState({lettuceChecked: !lettuceChecked});
    }
    toggleTomato(tomatoChecked) {
        this.setState({tomatoChecked: !tomatoChecked});
    }
    toggleOnion(onionChecked) {
        this.setState({onionChecked: !onionChecked});
    }
    togglePickles(picklesChecked) {
        this.setState({picklesChecked: !picklesChecked});
    }

    uncheckAll() {
        this.setState({lettuceChecked: false, tomatoChecked: false, onionChecked: false, picklesChecked: false});
    }
}