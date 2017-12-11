import React, {Component} from "react";

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
		// const request = (route, key, method, postData) => {
		// 	const dataStr = (method === "GET")
		// 		? null
		// 		: _
		// 			.toPairs(postData)
		// 			.map((a) => {
		// 				return `${a[0]}=${a[1]}`;
		// 			})
		// 			.join("&");

		// 	return fetch(`https://api.stripe.com/v1/${route}`, {
		// 		method: "POST",
		// 		headers: {
		// 			"Accept": "application/json",
		// 			"Authorization": `Bearer ${key}`,
		// 			"Content-Type": "application/x-www-form-urlencoded"
		// 		},
		// 		body: dataStr
		// 	}).then((data) => data.json());
		// };

		this.setState({
			latestCharge: "Creating token...."
		}, () => {
			this
				.props
				.postPublic("tokens", {
					"card[number]": "4242424242424242",
					"card[exp_month]": "02",
					"card[exp_year]": "2018"
				})
				.then((token) => {
					this.setState({latestCharge: "Creating charge...."});
					return this
						.props
						.postSecret("charges", {
							"amount": 2000,
							"currency": "usd",
							"description": "testing reactjs higher order component",
							"source": token.id
						});
				})
				.then((charge) => {
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