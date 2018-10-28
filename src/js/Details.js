import React, { Component } from "react";
import { Modal, Image, Header, Placeholder } from "semantic-ui-react";
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

		return (
			<Modal open={open} onClose={this.handleClose} centered={false}>
				{/* <Modal.Header>{data.title}</Modal.Header> */}
				<Modal.Content image>
					<Placeholder
						className="image details__image"
						style={(!loading && hidden) || {}}
					>
						<Placeholder.Image />
					</Placeholder>
					<Image
						wrapped
						className="details__image"
						src={images[3]}
						style={(loading && hidden) || {}}
						onLoad={this.handleLoad}
					/>

					<Modal.Description className="details__description">
						<Header>{data.title}</Header>
						<p>{data.center}</p>
						<p>{data.date_created}</p>
						<p>{data.description}</p>
					</Modal.Description>
				</Modal.Content>
			</Modal>
		);
	}
}

export default Details;
