import React, { Component } from "react";
import { Input, Select } from "semantic-ui-react";

const OPTIONS = Array.from({ length: 3 }, (_, i) => {
	i += 1;
	i *= 12;
	return {
		key: i,
		text: i,
		value: i,
	};
});

class Search extends Component {
	handleKeypress = event => {
		if (event.key !== "Enter") return;

		let query = event.target.value.trim();
		this.props.onQuery({ str: query });
	};

	render() {
		let {
			loading,
			itemsPerPage,
			onItemsPerPageChange,
		} = this.props;

		return (
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
		);
	}
}

export default Search;
