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
            earlyMovie: {},
            laterMovie: {}
        };
    }

   async getMovies() {
       let response = await fetch('https://birdsong.mybluemix.net/get_movies');
       this.movies = await response.json();
       this.movies.screenOne.movieOne.imgPath = this.replaceHttp(this.movies.screenOne.movieOne.imgPath);
       this.movies.screenOne.movieTwo.imgPath = this.replaceHttp(this.movies.screenOne.movieTwo.imgPath);
       this.movies.screenTwo.movieOne.imgPath = this.replaceHttp(this.movies.screenTwo.movieOne.imgPath);
       this.movies.screenTwo.movieTwo.imgPath = this.replaceHttp(this.movies.screenTwo.movieTwo.imgPath);
       this.setState({isLoading: false, earlyMovie: this.movies.screenOne.movieOne, laterMovie: this.movies.screenOne.movieTwo})
    }


    replaceHttp(value: string) {
        return value.replace("http", "https");
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
                    <Right/>
                </Header>
                <Segment style={styles.segmentStyle}>
                    <Button
                        first
                        active={this.state.screen === 1}
                        onPress={
                            () => this.setState({screen:1, earlyMovie: this.movies.screenOne.movieOne, laterMovie:this.movies.screenOne.movieTwo})
                        }><Text>Screen 1</Text></Button>
                    <Button last
                            active={this.state.screen === 2}
                            onPress={() => this.setState({screen:2, earlyMovie: this.movies.screenTwo.movieOne, laterMovie:this.movies.screenTwo.movieTwo})}
                        ><Text>Screen 2</Text></Button>
                </Segment>

                <Content padder>
                    <Card>
                        <CardItem>
                            <Left>
                                <Body>
                                <Text>{this.state.earlyMovie.name}</Text>
                                <Text note>{this.state.earlyMovie.rating} {this.state.earlyMovie.startTime}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image style={{
                                resizeMode: "contain",
                                width: 200,
                                height: 200,
                                flex: 1
                            }} source={{uri: this.state.earlyMovie.imgPath}}/>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem>
                            <Left>
                                <Body>
                                <Text>{this.state.laterMovie.name}</Text>
                                <Text note>{this.state.laterMovie.rating} {this.state.laterMovie.startTime}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image style={{
                                resizeMode: "contain",
                                width: 200,
                                height: 200,
                                flex: 1
                            }} source={{uri: this.state.laterMovie.imgPath}}/>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}