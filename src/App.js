import React, {Component} from "react";
import "./App.css";
import {Container, Box} from "bloomer";
import _ from "lodash";

import {TabList, Tab} from "./Tabs";

class App extends Component {

	render() {
		return (
			<TabList>
				<Tab name='a'>
					<div>
						<h2>Hello A</h2>
					</div>
				</Tab>
				<Tab name='b'>
					<div>
						<h2>Hello B</h2>
					</div>
				</Tab>
				<Tab name='c'>
					<div>
						<h2>Hello C</h2>
					</div>
				</Tab>
			</TabList>
		);
	}
}

export default App;
