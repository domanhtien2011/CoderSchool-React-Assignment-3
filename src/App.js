import React, {Component} from "react";
import "./App.css";

const _ = require("lodash");
class App extends Component {
	render() {
		const things = {
			a: (
				<div>
					<h2>HelloA</h2>
				</div>
			),
			b: (
				<div>
					<h2>HelloB</h2>
				</div>
			),
			c: (
				<div>
					<h2>HelloC</h2>
				</div>
			)
		};

		const currentSelected = "a";

		const tabs = _
			.keys(things)
			.map((tab) => {
				const className = (tab === currentSelected)
					? "selected"
					: "unselected";
				return <h1 className={className}>{tab}</h1>;
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

export default App;
