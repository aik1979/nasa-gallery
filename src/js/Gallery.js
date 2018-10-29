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
	Button,
} from "semantic-ui-react";
import Item from "./Item";
import "../css/Gallery.scss";

class Gallery extends Component {
	handleKeypress = event => {
		if (event.key !== "Enter") return;

		let query = event.target.value.trim();
		this.props.onQuery({ str: query });
	};

	render() {
		let {
			items,
			loading,
			onDetails,
			onNextPage,
			onNextBuffer,
			bufferFilled,
			bufferNextExists,
		} = this.props;

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
						return (
							<Item
								key={item.thumb}
								item={item}
								onClick={onDetails}
							/>
						);
					})}
				</Card.Group>

				<Divider />

				<Button disabled={!bufferFilled} onClick={onNextPage}>
					next page
				</Button>
				<Button
					disabled={!(!bufferFilled && bufferNextExists)}
					onClick={onNextBuffer}
				>
					next buffer
				</Button>
			</Container>
		);
	}
}

export default Gallery;
