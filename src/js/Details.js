import React, { Component } from "react";
import { Modal, Image, Header, Segment } from "semantic-ui-react";
import "../css/Details.scss";

const hidden = {
	display: "none",
};
class Details extends Component {
	constructor(props) {
		super(props);
		this.state = { loading: true };
	}

	handleLoad = _ => {
		this.setState({ loading: false });
	};

	handleClose = _ => {
		this.setState({ loading: true });
		this.props.onClose();
	};

	render() {
		let { current } = this.props;
		let { loading } = this.state;
		let open = current !== null;

		let data = (current && current.data) || {};
		let images = (current && current.images) || [];

		let preview = images[images.length - 1];
		let orig = images[0];

		return (
			<Modal open={open} onClose={this.handleClose} centered={false}>
				<Segment.Group className="details" horizontal>
					<Segment loading={loading}>
						<Image
							bordered
							src={preview}
							style={(loading && hidden) || {}}
							onLoad={this.handleLoad}
						/>
					</Segment>

					<Segment>
						<Header>{data.title}</Header>
						<p>{data.center}</p>
						<p>{data.date_created}</p>
						<p>{data.description}</p>
					</Segment>
				</Segment.Group>
			</Modal>
		);
	}
}

export default Details;
