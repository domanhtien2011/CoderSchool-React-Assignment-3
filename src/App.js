import React, {Component} from "react";
import "./App.css";
import Checkout from "./Checkout";
import {withStripe} from "./StripeApj";

import {TabList, Tab} from "./Tabs";

class App extends Component {

	render() {
		const WrappedCheckout = withStripe(Checkout, "pk_test_cACAcrZM0rSSxJdoPyEqYu2e", "sk_test_AttO0bEjMwXOEqt6E5Ffm5eC");
		return (
			<TabList>
				<Tab name='Checkout' default>
					<div>
						<WrappedCheckout/>
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
