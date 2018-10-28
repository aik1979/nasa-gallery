import React, { Component } from "react";
import "./App.scss";
import {
	Container,
	Input,
	Header,
	Divider,
	List,
	CardGroup,
	Image,
} from "semantic-ui-react";

class View extends Component {
	handleKeypress = event => {
		if (event.key !== "Enter") return;

		let query = event.target.value.trim();
		this.props.onQuery(query);
	};

	render() {
		let { items, loading } = this.props;
		items = items.map(({ data, collection, thumb }) => {
			return {
				key: thumb,
				image: <Image src={thumb} className="app__gallery__image" />,
				description: data.title,
				onClick: this.props.onDetails,
				data,
				collection,
			};
		});

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

				<CardGroup items={items} itemsPerRow={4} className="test" />
			</Container>
		);
	}
}

export default View;
