import React, { Component } from "react";
import { Modal, Image, Header, Placeholder, Card } from "semantic-ui-react";

const hidden = {
	display: "none",
};
class Item extends Component {
	constructor(props) {
		super(props);
		this.state = { loading: true };
	}

	handleLoad = _ => {
		this.setState({ loading: false });
	};

	render() {
		let { data, collection, thumb } = this.props.item;
		let { loading } = this.state;

		return (
			<Card onClick={this.props.handleDetails}>
				<Card.Content>
					<Placeholder
						className=""
						style={{
							height: "220px",
							...((!loading && hidden) || {}),
						}}
					>
						<Placeholder.Image />
					</Placeholder>
					<Image
						wrapped
						className="app__gallery__image"
						src={thumb}
						style={(loading && hidden) || {}}
						onLoad={this.handleLoad}
					/>
					<Card.Description>{data.title}</Card.Description>
				</Card.Content>
			</Card>
		);
	}
}

export default Item;
