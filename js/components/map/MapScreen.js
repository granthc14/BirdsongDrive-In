import React, { Component } from 'react';
import styles from "./styles";
import {View} from 'react-native';
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
    Body
} from "native-base";
import MapView from 'react-native-maps';

export default class MapScreen extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            markers: [
                {
                    title: "Birdsong Drive-In",
                    description: "Birdsong Drive-In",
                    pinColor:"#7d1f6f",
                    coordinate:{
                        latitude:35.9813048,
                        longitude:-88.0802684
                    },
                    identifier:1
                }
            ]
        }
    }
    render() {

        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Map</Title>
                    </Body>
                    <Right />
                </Header>
                <Container>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 35.9813048,
                            longitude: -88.0802684,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,}}>
                        {this.state.markers.map(marker => (
                            <MapView.Marker
                                key={marker.identifier}
                                coordinate={marker.coordinate}
                                pinColor={marker.pinColor}
                            />
                        ))}
                    </MapView>
                </Container>
            </Container>
        );
    }
}