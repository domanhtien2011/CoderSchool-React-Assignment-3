import React, {Component} from "react";

class Checkout extends Component {

	constructor(props) {
		super(props);
		this.state = {
			success_message: "",
			latestCharge: "None"
		};
		this.createCharge = this
			.createCharge
			.bind(this);
	}

	createCharge() {
		// create a token use the token to create a charge

		this.setState({
			success_message: "Please wait...",
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
					this.setState({success_message: "Successfully created charge!", latestCharge: charge.id});
				});
		});
	}

	render() {
		return (
			<div>
				<h1>Checkout</h1>
				<button className='button is-primary is-small' onClick={this.createCharge}>Charge</button>
				<p>Charge status: {this.state.success_message}</p>
				<p>Latest Charge: {this.state.latestCharge}</p>
			</div>
		);
	}
}

export default Checkout;