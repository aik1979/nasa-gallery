import React, { Component } from "react";
import { Image, Card, Loader } from "semantic-ui-react";

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
				<div className="card_image">
					<Loader active={loading} />
					<Image
						className="actual"
						src={item.thumb}
						style={(loading && hidden) || {}}
						onLoad={this.handleLoad}
					/>
				</div>

				<Card.Content>
					<Card.Description>{item.data.title}</Card.Description>
				</Card.Content>
			</Card>
		);
	}
}

export default Item;
