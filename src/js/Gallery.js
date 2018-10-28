import React, { Component } from "react";
import {
	Container,
	Input,
	Header,
	Divider,
	List,
	Card,
	Image,
	Placeholder,
} from "semantic-ui-react";
import Item from "./Item";
import "../css/Gallery.scss";

class Gallery extends Component {
	handleKeypress = event => {
		if (event.key !== "Enter") return;

		let query = event.target.value.trim();
		this.props.onQuery(query);
	};

	render() {
		let { items, loading } = this.props;

		return (
			<Container className="app__container">
				<Header className="app__title" as="h1" textAlign="center">
					NASA IMAGES GALLERY APP
					<Header.Subheader>
						<List items={this.props.stack} horizontal />
					</Header.Subheader>
				</Header>

				<Divider />

				{/* can I pass properties with the same name */}
				<Input
					className="app__search"
					placeholder="Search..."
					loading={loading}
					onKeyPress={this.handleKeypress}
					icon="search"
				/>

				<Divider />

				<Card.Group itemsPerRow={4}>
					{items.map(item => {
						return <Item item={item} onClick={this.props.onDetails} />;
					})}
				</Card.Group>
			</Container>
		);
	}
}

export default Gallery;
