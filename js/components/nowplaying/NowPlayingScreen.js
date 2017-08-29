import React, { Component } from 'react';
import styles from "./styles";
import { Image, View } from "react-native";
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
          screenOne: { movieOne: {name: "Nut Job", rating: "PG", image: img1},
                        movieTwo: {name: "Dunkirk", rating:"R", image: img2}},
            screenTwo: {movieOne: {name: "Baby Driver", rating: "R", image: img3},
                        movieTwo: {name: "Dark Tower", rating:"PG-13", image: img4}}
        };

        this.state = {
            screen: 1,
            screenOneMovie: this.movies.screenOne.movieOne,
            screenTwoMovie: this.movies.screenTwo.movieOne
        };

    }



    render() {

        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Now Playing</Title>
                    </Body>
                    <Right />
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
                            onPress={() => this.setState({screen:2, screenOneMovie: this.movies.screenOne.movieTwo, screenTwoMovie:this.movies.screenTwo.movieTwo})}><Text>Screen 2</Text></Button>
                </Segment>

                <Content padder>
                    <Card>
                        <CardItem>
                            <Left>
                                <Body>
                                <Text>{this.state.screenOneMovie.name}</Text>
                                <Text note>{this.state.screenOneMovie.rating}</Text>
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
                                <Text note>{this.state.screenTwoMovie.rating}</Text>
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