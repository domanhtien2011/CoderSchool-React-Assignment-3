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
		alert("clicked");
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