import React, { Component } from "react";
import "./App.scss";
import { Modal } from "semantic-ui-react";

function Details({ current }) {
	let open = current !== null;
	return (
		<Modal open={open}>
			<Modal.Header>123</Modal.Header>
			<Modal.Content>0000</Modal.Content>
		</Modal>
	);
}

export default Details;
