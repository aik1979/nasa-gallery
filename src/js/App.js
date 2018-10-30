import React, { Component } from "react";
import Gallery from "./Gallery";
import Details from "./Details";

const stack = ["react", "semantic-ui-react"];

class App extends Component {
	constructor(props) {
		super(props);

		this.buffer = {};

		this.state = {
			items: [],
			totalHits: -1,
			loading: false,

			nextPageExists: false,
			nextBufferExists: false,

			current: null,
		};
	}

	// pick more proper name
	query = async ({ url, str }) => {
		this.setState({ loading: true });

		if (!url) {
			url = encodeURI(
				`https://images-api.nasa.gov/search?q=${str}&media_type=image`
			);
		}
		let response = await fetch(url);
		let { collection } = await response.json();

		let {
			items,
			links,
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

		let prev = links && links.find(({ rel }) => rel === "prev");
		let next = links && links.find(({ rel }) => rel === "next");
		prev = prev && prev.href;
		next = next && next.href;

		this.buffer = {
			items,
			prev,
			next,
		};

		this.setState({
			totalHits,
			loading: false,
			nextBufferExists: !!next,
		});

		this.getPage();
	};

	getPage = _ => {
		let b = this.buffer;
		let items;

		items = b.items.slice(0, 10);
		b.items = b.items.slice(10);

		this.setState({ items, nextPageExists: !!b.items.length });
	};

	getNextBuffer = _ => {
		this.query({ url: this.buffer.next });
	};

	openDetails = async (_, { item: { data, collection } }) => {
		this.setState({
			current: {
				data,
			},
		});

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
				<Gallery
					{...rest}
					onQuery={this.query}
					onDetails={this.openDetails}
					onNextPage={this.getPage}
					onNextBuffer={this.getNextBuffer}
					stack={stack}
				/>
				<Details current={current} onClose={this.closeDetails} />
			</>
		);
	}
}

export default App;
