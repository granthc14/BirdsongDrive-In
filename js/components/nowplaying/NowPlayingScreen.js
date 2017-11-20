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
export default class NowPlayingScreen extends Component {

    constructor(props) {
        super(props);
        this.movies = {};

        this.getMovies();
        this.state = {
            isLoading: true,
            screen: 1,
            screenOneMovie: {},
            screenTwoMovie: {}
        };
    }

   async getMovies() {
       let response = await fetch('https://birdsong.mybluemix.net/get_movies');
       this.movies = await response.json();
       this.setState({isLoading: false, screenOneMovie: this.movies.screenOne.movieOne, screenTwoMovie: this.movies.screenTwo.movieOne})
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
                <Header
                    style={styles.headerFooterStyle}>
                    <Left style={styles.menuTextStyle}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu" style={{color: 'white'}} size={25}/>
                        </Button>
                        <Title style={styles.tabHeaderTextStyle}>Now Playing</Title>
                    </Left>
                    <Body>
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
                                <Text note>{this.state.screenOneMovie.rating} {this.state.screenOneMovie.startTime}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image style={{
                                resizeMode: "contain",
                                width: 200,
                                height: 200,
                                flex: 1
                            }} source={{uri: this.state.screenOneMovie.imgPath}}/>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem>
                            <Left>
                                <Body>
                                <Text>{this.state.screenTwoMovie.name}</Text>
                                <Text note>{this.state.screenTwoMovie.rating} {this.state.screenTwoMovie.startTime}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image style={{
                                resizeMode: "contain",
                                width: 200,
                                height: 200,
                                flex: 1
                            }} source={{uri: this.state.screenTwoMovie.imgPath}}/>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}