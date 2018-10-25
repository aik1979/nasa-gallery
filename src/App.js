import React, { Component } from "react";
import "./App.scss";
import {
	Container,
	Button,
	Input,
	Header,
	Divider,
	Icon,
	List,
	CardGroup,
} from "semantic-ui-react";

const stack = ["react", "semantic-ui-react"];
const cards = [
	{
		avatar: "/images/avatar/large/helen.jpg",
		date: "Joined in 2013",
		header: "Helen",
		description: "Primary Contact",
	},
	{
		avatar: "/images/avatar/large/matthew.png",
		date: "Joined in 2013",
		header: "Matthew",
		description: "Primary Contact",
	},
	{
		avatar: "/images/avatar/large/molly.png",
		date: "Joined in 2013",
		header: "Molly",
		description: "Primary Contact",
	},
];
class App extends Component {
	constructor() {
		super();
		this.state = { loading: false };
	}
	// return (store && JSON.parse(store)) || [];
	render() {
		return (
			<Container className="app__container">
				<Header className="app__title" as="h1" textAlign="center">
					NASA IMAGES GALLERY APP
					<Header.Subheader>
						<List items={stack} horizontal />
					</Header.Subheader>
				</Header>

				<Divider />

				{/* can I pass properties with the same name */}
				<Input
					className="app__search"
					placeholder="Search..."
					loading={this.state.loading}
				/>

				<Divider />

				<CardGroup items={cards} itemsPerRow={3} />
			</Container>
		);
	}
}

export default App;
