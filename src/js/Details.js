import React, { Component } from "react";
import { Modal, Image, Header } from "semantic-ui-react";
import "../css/Details.scss";

function Details({ current, onClose }) {
	let open = current !== null;

	let data = (current && current.data) || {};
	let images = (current && current.images) || [];

	return (
		<Modal open={open} onClose={onClose} centered={false}>
			{/* <Modal.Header>{data.title}</Modal.Header> */}
			<Modal.Content image>
				<Image src={images[3]} wrapped className="details__image" />
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

export default Details;
