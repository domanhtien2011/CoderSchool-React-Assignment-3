import React, {Component} from "react";
import "./App.css";
import _ from "lodash";
import Checkout from "./Checkout";

import {TabList, Tab} from "./Tabs";

class App extends Component {

	render() {
		return (
			<TabList>
				<Tab name='Checkout' default>
					<div>
						<Checkout />
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
