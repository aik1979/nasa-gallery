import React, { Component } from "react";
import {
	Container,
	Input,
	Header,
	List,
	Card,
	Button,
	Segment,
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
			totalHits,
			loading,
			onDetails,

			onNextPage,
			onNextBuffer,
			nextPageExists,
			nextBufferExists, // buffer == batch
		} = this.props;

		return (
			<Container className="app__container">
				<Header className="app__title" as="h1" textAlign="center">
					NASA IMAGES GALLERY APP
					<Header.Subheader>
						<List items={this.props.stack} horizontal />
					</Header.Subheader>
				</Header>

				{/* can I pass properties with the same name */}
				<Segment.Group>
					<Segment>
						<Input
							placeholder="Search..."
							loading={loading}
							onKeyPress={this.handleKeypress}
							icon="search"
							fluid
						/>

						{~totalHits ? (
							<Header as="h4">got {totalHits} hits</Header>
						) : (
							""
						)}
					</Segment>

					{items.length ? (
						<>
							<Segment>
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
							</Segment>

							<Segment>
								<Button
									disabled={!nextPageExists}
									onClick={onNextPage}
								>
									next page
								</Button>
								<Button
									disabled={
										!(!nextPageExists && nextBufferExists)
									}
									onClick={onNextBuffer}
								>
									next buffer
								</Button>
							</Segment>
						</>
					) : (
						""
					)}
				</Segment.Group>
			</Container>
		);
	}
}

export default Gallery;
