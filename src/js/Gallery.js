import React, { Component } from "react";
import {
	Input,
	Header,
	List,
	Card,
	Button,
	Segment,
	Select,
	Checkbox,
} from "semantic-ui-react";
import Item from "./Item";
import "../css/Gallery.scss";

const OPTIONS = Array.from({ length: 3 }, (_, i) => {
	i += 1;
	i *= 12;
	return {
		key: i,
		text: i,
		value: i,
	};
});

class Gallery extends Component {
	constructor(props) {
		super(props);

		this.state = { infScroll: false };

		this.sentinel = React.createRef();
	}

	componentDidMount() {
		// TODO: scroll not working properly
		let io = new IntersectionObserver(
			({ 0: entry }) => {
				if (!entry.intersectionRatio || !this.props.items.length)
					return;

				console.log("[calling NextPageLoad]");
				this.handleNextPageLoad();
			},
			{ threshold: 1.0 }
		);
		io.observe(this.sentinel.current);
	}

	handleKeypress = event => {
		if (event.key !== "Enter") return;

		let query = event.target.value.trim();
		this.props.onQuery({ str: query });
	};

	toggleInfScroll = _ => {
		this.setState(prev => ({ infScroll: !prev.infScroll }));
	};

	handleNextPageLoad = _ => {
		let append = this.state.infScroll;
		this.props.onNextPage(append);
	};

	render() {
		let {
			items,
			totalHits,
			loading,
			itemsPerPage,

			onItemsPerPageChange,

			onDetails,

			// onNextPage,
			onNextBuffer,
			nextPageExists,
			nextBufferExists, // buffer == batch
		} = this.props;

		let { infScroll } = this.state;
		// console.log(infScroll);

		return (
			<div className="container">
				<Header as="h1" textAlign="center">
					NASA IMAGES GALLERY APP
					<Header.Subheader>
						<List items={this.props.stack} horizontal />
					</Header.Subheader>
				</Header>

				<Segment.Group>
					<Segment>
						<Input
							loading={loading}
							onKeyPress={this.handleKeypress}
							placeholder="Search..."
							icon="search"
							fluid
							action={
								<Select
									options={OPTIONS}
									value={itemsPerPage}
									onChange={onItemsPerPageChange}
									compact
								/>
							}
							actionPosition="left"
						/>

						{totalHits !== -1 && (
							<div className="subsearch">
								<strong>got {totalHits} hits</strong>
								<Checkbox
									label="infinite scroll"
									slider
									value={Number(infScroll)}
									onChange={this.toggleInfScroll}
								/>
							</div>
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
									onClick={this.handleNextPageLoad}
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
				<div className="sentinel" ref={this.sentinel} />
			</div>
		);
	}
}

export default Gallery;
