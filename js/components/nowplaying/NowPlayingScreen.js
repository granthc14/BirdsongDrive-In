import React, { Component } from 'react';
import styles from "./styles";
import {ActivityIndicator, Image, View} from "react-native";
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
    Segment,
    Card,
    CardItem
} from "native-base";

const img1 = require('../../images/nut_job.jpg');
const img2 = require('../../images/dunkirk.jpg');
const img3 = require('../../images/baby_driver.jpg');
const img4 = require('../../images/dark_tower.jpg');
export default class NowPlayingScreen extends Component {

    constructor(props) {
        super(props);
        this.movies = {
            screenOne: {
                movieOne: {name: "Nut Job", rating: "PG", time: "7:00 PM", image: img1},
                movieTwo: {name: "Dunkirk", rating: "R", time: "9:00 PM", image: img2}
            },
            screenTwo: {
                movieOne: {name: "Baby Driver", rating: "R", time: "7:00 PM", image: img3},
                movieTwo: {name: "Dark Tower", rating: "PG-13", time: "9:00 PM", image: img4}
            }

        };

        this.state = {
            isLoading: true,
            screen: 1,
            screenOneMovie: this.movies.screenOne.movieOne,
            screenTwoMovie: this.movies.screenTwo.movieOne
        };
        this.movieText = '';
        this.getMovies()
    }

   async getMovies() {
       let response = await fetch('https://birdsong.mybluemix.net/get_food');
       this.movieText = await response.json();
       this.setState({isLoading: false})
    }



    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu" style={{color: 'white'}} size={25}/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Now Playing</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={()=> this.props.navigation.navigate("Settings")}>
                            <Icon name="settings" style={{color: 'white'}} size={25}/>
                        </Button>
                    </Right>
                </Header>
                <Segment>
                    <Button
                        first
                        active={this.state.screen === 1}
                        onPress={
                            () => this.setState({screen:1, screenOneMovie: this.movies.screenOne.movieOne, screenTwoMovie:this.movies.screenTwo.movieOne})
                        }><Text>Screen 1</Text></Button>
                    <Button last
                            active={this.state.screen === 2}
                            onPress={() => this.setState({screen:2, screenOneMovie: this.movies.screenOne.movieTwo, screenTwoMovie:this.movies.screenTwo.movieTwo})}
                        ><Text>Screen 2</Text></Button>
                </Segment>

                <Content padder>
                    <Card>
                        <CardItem>
                            <Left>
                                <Body>
                                <Text>{this.state.screenOneMovie.name}</Text>
                                <Text note>{this.state.screenOneMovie.rating} {this.state.screenOneMovie.time}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image style={{
                                resizeMode: "contain",
                                width: 200,
                                height: 200,
                                flex: 1
                            }} source={this.state.screenOneMovie.image}/>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem>
                            <Left>
                                <Body>
                                <Text>{this.state.screenTwoMovie.name}</Text>
                                <Text note>{this.state.screenTwoMovie.rating} {this.state.screenTwoMovie.time}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image style={{
                                resizeMode: "contain",
                                width: 200,
                                height: 200,
                                flex: 1
                            }} source={this.state.screenTwoMovie.image}/>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}