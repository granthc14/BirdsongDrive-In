import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {
	Content,
	Text,
	List,
	ListItem,
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
		icon: "movie",
		bg: "#C5F442",
	},
	{
		name: "Food",
		route: "Food",
        icon: "food-apple",
		bg: "#C5F442",
	},
	{
		name: "Map",
		route: "Map",
		icon: "map-marker",
		bg: "#DA4437",
	},
];

const combos = [
    {
        name: "1 Large Popcorn and 2 Large Drinks",
        items: [
            {name: "Large Popcorn", price: 5.00, amount: 0},
            {name: "Large Drink", price: 4.00, amount: 0},
            {name: "Large Drink", price: 4.00, amount: 0}
        ],
        itemTotal: 13,
        discount: 1,
        total: 12
    }
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
                                    <Icon name={data.icon} size={25}/>
									<Text style={styles.text}>
										{data.name}
									</Text>
								</Left>
							</ListItem>}
					/>
				</Content>
                <Content>
				    <Text style={{marginLeft: 20}}>Combos:</Text>
                    <List
                        dataArray={combos}
                        renderRow={data =>
                            <ListItem>
                                <Left>
                                    <Text>{data.name}</Text>
                                </Left>
                                <Right>
                                    <Text>{data.total}</Text>
                                </Right>
                            </ListItem>
                        }
                        />
                </Content>
			</Container>
		);
	}
}

export default SideBar;
