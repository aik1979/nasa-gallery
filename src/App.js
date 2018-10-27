import React, { Component } from "react";
import View from "./View";
import Details from "./Details";

const stack = ["react", "semantic-ui-react"];
// const cards = [
// 	{
// 		image: "/images/avatar/large/helen.jpg",
// 		meta: "Joined in 2013",
// 		header: "Helen",
// 		description: "Primary Contact",
// 	},
// 	{
// 		image: "/images/avatar/large/matthew.png",
// 		meta: "Joined in 2013",
// 		header: "Matthew",
// 		description: "Primary Contact",
// 	},
// 	{
// 		image: "/images/avatar/large/molly.png",
// 		meta: "Joined in 2013",
// 		header: "Molly",
// 		description: "Primary Contact",
// 	},
// ];

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			totalHits: -1,
			loading: false,

			current: null,
		};
	}

	// pick more proper name
	query = async str => {
		this.setState({ loading: true });

		const url =
			"https://images-api.nasa.gov/search?q=apollo%2011&media_type=image";
		let response = await fetch(url);
		let { collection } = await response.json();

		let {
			items,
			metadata: { total_hits: totalHits },
		} = collection;

		items = items.map(item => {
			let {
				data: { 0: data },
				href: collection,
				links: {
					0: { href: thumb },
				},
			} = item;

			return {
				data,
				collection,
				thumb,
			};
		});

		this.setState({
			items,
			totalHits,
			loading: false,
		});
	};

	details = async (_, { data, collection }) => {
		let links = await (await fetch(collection)).json();
		let images = links.filter(link => link.endsWith("jpg"));

		this.setState({
			current: {
				data,
				images,
			},
		});
	};

	closeDetails = _ => {
		this.setState({ current: null });
	};

	render() {
		let { current, ...rest } = this.state;
		return (
			<>
				<View
					{...rest}
					onQuery={this.query}
					onDetails={this.details}
					stack={stack}
				/>
				<Details current={current} onClose={this.closeDetails} />
			</>
		);
	}
}

export default App;
