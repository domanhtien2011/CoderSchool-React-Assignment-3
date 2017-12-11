import React, {Component} from "react";
import _ from "lodash";

class Checkout extends Component {

	constructor(props) {
		super(props);
		this.state = {
			latestCharge: "None"
		};
		this.createCharge = this
			.createCharge
			.bind(this);
	}

	createCharge() {
		// create a token use the token to create a charge
		const key = "pk_test_cACAcrZM0rSSxJdoPyEqYu2e";
		const secretKey = "sk_test_AttO0bEjMwXOEqt6E5Ffm5eC";
		const request = (route, key, method, postData) => {
			const dataStr = (method === "GET")
				? null
				: _
					.toPairs(postData)
					.map((a) => {
						return `${a[0]}=${a[1]}`;
					})
					.join("&");

			return fetch(`https://api.stripe.com/v1/${route}`, {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Authorization": `Bearer ${key}`,
					"Content-Type": "application/x-www-form-urlencoded"
				},
				body: dataStr
			}).then((data) => data.json());
		};

		this.setState({
			latestCharge: "Creating token...."
		}, () => {
			request("tokens", key, "POST", {
				"card[number]": "4242424242424242",
				"card[exp_month]": "02",
				"card[exp_year]": "2018"
			}).then((token) => {
				this.setState({latestCharge: "Creating charge...."});
				return request("charges", secretKey, "POST", {
					"amount": 2000,
					"currency": "usd",
					"description": "testing reactjs higher order component",
					"source": token.id
				});
			}).then((charge) => {
				this.setState({latestCharge: charge.id});
			});
		});
	}

	render() {
		return (
			<div>
				<h1>Checkout</h1>
				<button className='button is-primary is-small' onClick={this.createCharge}>Charge</button>
				<p>Latest Charge: {this.state.latestCharge}</p>
			</div>
		);
	}
}

export default Checkout;