import React from "react";
import _ from "lodash";

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

export function withStripe(WrappedComponent, publicKey, secretKey) {
	return class extends React.Component {
		postPublic(route, postData) {
			return request(route, publicKey, "POST", postData);
		}
		postSecret(route, postData) {
			return request(route, secretKey, "POST", postData);
		}

		render() {
			return <WrappedComponent
				postPublic={this.postPublic}
				postSecret={this.postSecret}
				{...this.props}/>;
		}
	};
}