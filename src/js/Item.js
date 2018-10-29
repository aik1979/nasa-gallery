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
		let { loading } = this.state;
		let { item, onClick } = this.props;

		return (
			<Card onClick={onClick} item={item}>
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
					src={item.thumb}
					style={(loading && hidden) || {}}
					onLoad={this.handleLoad}
				/>

				<Card.Content>
					<Card.Description>{item.data.title}</Card.Description>
				</Card.Content>
			</Card>
		);
	}
}

export default Item;
