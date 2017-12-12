import React, {Component} from "react";

class Checkout extends Component {

	constructor(props) {
		super(props);
		this.state = {
			class: "",
			showElement: "false",
			detailed_error: "",
			status: "",
			card_number: "",
			card_exp_month: "",
			card_exp_year: "",
			amount: "",
			latestCharge: "None"
		};
		this.createCharge = this
			.createCharge
			.bind(this);
	}

	createCharge() {
		// create a token use the token to create a charge

		this.setState({
			status: "Please wait...",
			latestCharge: "Creating token...."
		}, () => {
			this
				.props
				.postPublic("tokens", {
					"card[number]": this.state.card_number,
					"card[exp_month]": this.state.card_exp_month,
					"card[exp_year]": this.state.card_exp_year
				})
				.then((token) => {
					this.setState({latestCharge: "Creating charge...."});
					return this
						.props
						.postSecret("charges", {
							"amount": this.state.amount,
							"currency": "usd",
							"description": "testing reactjs higher order component",
							"source": token.id
						});
				})
				.then((charge) => {
					console.log(charge);
					if (charge.error) {
						this.setState({status: charge.error.type, detailed_error: charge.error.message, class: "error", latestCharge: "Sorry, the charge can't be created!", showElement: "true"});
					} else {
						this.setState({status: "Succesfully created charge!!!", latestCharge: charge.id, class: "", showElement: "false", detailed_error: "No Error"});
					}
				});
		});
	}

	render() {
		return (
			<div>
				<h1>Welcome to Stripe Service</h1>
				<div className="field">
					<label htmlFor="" className='label'>Amount</label>
					<input
						className='input'
						type='number'
						min='20'
						placeholder=''
						onChange={(event) => {
							this.setState({amount: event.target.value});
						}}/>
				</div>
				<div className="field">
					<label htmlFor="" className='label'>Card Number</label>
					<input
						className='input'
						type='text'
						placeholder='4242424242424242'
						onChange={(event) => {
							this.setState({card_number: event.target.value});
						}}/>
				</div>
				<div className="field">
					<label htmlFor="" className='label'>Expiration Month</label>
					<input
						className='input'
						type='text'
						placeholder='02'
						onChange={(event) => {
							this.setState({card_exp_month: event.target.value});
						}}/>
				</div>
				<div className="field">
					<label htmlFor="" className='label'>Expiration Year</label>
					<input
						className='input'
						type='text'
						placeholder='2018'
						onChange={(event) => {
							this.setState({card_exp_year: event.target.value});
						}}/>
				</div>
				<div className="field">
					<button className='button is-primary is-medium' onClick={this.createCharge}>Pay</button>
				</div>
				<p className={this.state.class}>Charge status: {this.state.status}</p>
				<p className={this.state.class}></p>
				<p className={this.state.class + " " + this.state.showElement}>Detailed Error: {this.state.detailed_error}</p>
				<p>Latest Charge: {this.state.latestCharge}</p>
			</div>
		);
	}
}

export default Checkout;