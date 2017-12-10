import React, {Component} from "react";

export class Tab extends Component {
	render() {
		return (
			<div></div>
		);
	}
}

export class TabList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selected: "a"
		};
		this.select = this
			.select
			.bind(this);
	}

	select(item) {
		this.setState({selected: item});
	}

	render() {
		const tabs = React
			.Children
			.map(this.props.children, (child) => {
				console.log(child);
				return (
					<h1>Test</h1>
				);
			});
		const body = null;
		return (
			<div className='holder'>
				<div className="tabs">{tabs}</div>
				<div className="body">{body}</div>
			</div>
		);
	}
}