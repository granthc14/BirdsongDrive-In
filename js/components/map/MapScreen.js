import React, { Component } from 'react';
import styles from "./styles";
import {View, Linking} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {
    ActionSheet,
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
    Body
} from "native-base";

let ACTIONS = ["Use my location", "Cancel"];
let CANCEL_INDEX = 1;
import MapView from 'react-native-maps';
let url = 'https://www.google.com/maps/dir/?api=1&destination=Birdsong+Drive-In&travelmode=car';

export default class MapScreen extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            markers: [
                {
                    title: "Birdsong Drive-In",
                    description: "Birdsong Drive-In",
                    pinColor:"#ff0000",
                    coordinate:{
                        latitude:35.9813048,
                        longitude:-88.0802684
                    },
                    identifier:1
                }
            ]
        }

    }

    openGoogleMaps() {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    render() {

        return (
            <Container>
                <Header
                    style={styles.headerFooterStyle}>
                    <Left style={styles.menuTextStyle}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu" style={{color: 'white'}} size={25}/>
                        </Button>
                        <Title style={styles.tabHeaderTextStyle}>Map</Title>
                    </Left>
                    <Body>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: ACTIONS,
                                        cancelButtonIndex: CANCEL_INDEX,
                                        title: "Directions"
                                    },
                                    buttonIndex => {
                                        this.setState({ clicked: ACTIONS[buttonIndex] });
                                        if (buttonIndex !== CANCEL_INDEX) {
                                            this.openGoogleMaps()
                                        }
                                    }
                                    )
                                }>
                            <Icon name="google-maps" style={{color: 'white'}} size={25}/>
                        </Button>
                    </Right>
                </Header>
                <Container>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 35.9813048,
                            longitude: -88.0802684,
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.001,}}>
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