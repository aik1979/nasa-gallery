import React, { Component } from "react";
import {
	Header,
	List,
	Card,
	Button,
	Segment,
	Checkbox,
} from "semantic-ui-react";
import Search from "./Search";
import Item from "./Item";

import "../css/Gallery.scss";

const STACK = ["react", "semantic-ui-react"];

class Gallery extends Component {
	constructor(props) {
		super(props);

		this.state = { infScroll: false };

		this.sentinel = React.createRef();
	}

	componentDidMount() {
		let io = new IntersectionObserver(
			({ 0: entry }) => {
				if (
					entry.intersectionRatio !== 1 ||
					!this.props.items.length ||
					!this.state.infScroll
				)
					return;

				this.handleNextPageLoad();
			},
			{ threshold: 1.0 }
		);
		io.observe(this.sentinel.current);
	}

	toggleInfScroll = _ => {
		this.setState(prev => ({ infScroll: !prev.infScroll }));
	};

	handleNextPageLoad = _ => {
		let append = this.state.infScroll;
		this.props.onNextPage(append);
	};

	handleNextBuffer = _ => {
		this.props.onNextBuffer();
		window.scroll({ top: 0, left: 0, behavior: "smooth" });
	};

	render() {
		let {
			items,
			totalHits,
			loading,

			onQuery,

			itemsPerPage,
			onItemsPerPageChange,

			onDetails,

			// onNextPage,
			// onNextBuffer,
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
						<List items={STACK} horizontal />
					</Header.Subheader>
				</Header>

				<Segment.Group>
					<Segment>
						<Search
							loading={loading}
							onQuery={onQuery}
							itemsPerPage={itemsPerPage}
							onItemsPerPageChange={onItemsPerPageChange}
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

					{!!items.length && (
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
									onClick={this.handleNextBuffer}
								>
									next buffer
								</Button>
							</Segment>
						</>
					)}
				</Segment.Group>
				<div
					className="sentinel"
					ref={this.sentinel}
					hidden={!(infScroll && nextPageExists)}
				/>
			</div>
		);
	}
}

export default Gallery;
