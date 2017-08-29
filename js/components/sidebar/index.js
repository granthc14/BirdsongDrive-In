import React, { Component } from "react";
import { Image } from "react-native";

import {
	Content,
	Text,
	List,
	ListItem,
	Icon,
	Container,
	Left,
	Right,
	Badge,
	Button,
	View,
	StyleProvider,
	getTheme,
	variables,
} from "native-base";

import styles from "./style";

const datas = [
	{
		name: "Now Playing",
		route: "NowPlaying",
		icon: "phone-portrait",
		bg: "#C5F442",
	},
	{
		name: "Food",
		route: "Food",
        icon: "phone-portrait",
		bg: "#C5F442",
	},
	{
		name: "Info",
		route: "Info",
		icon: "phone-portrait",
		bg: "#477EEA",
	},
	{
		name: "Map",
		route: "Map",
		icon: "phone-portrait",
		bg: "#DA4437",
	},
];

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shadowOffsetWidth: 1,
			shadowRadius: 4,
		};
	}

	render() {
		return (
			<Container>
				<Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
					<Text></Text>
					<List
						dataArray={datas}
						renderRow={data =>
							<ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
								<Left>
									<Icon active name={data.icon} style={{ color: "#777", fontSize: 26, width: 30 }} />
									<Text style={styles.text}>
										{data.name}
									</Text>
								</Left>
							</ListItem>}
					/>
				</Content>
			</Container>
		);
	}
}

export default SideBar;
