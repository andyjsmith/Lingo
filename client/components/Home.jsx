import React, {Component} from 'react';
import { Random } from 'meteor/random';

export default class Home extends Component {
	constructor() {
		super();

		this.state = {
			passwordChecked: false,
			expiresChecked: false,
			randomUrl: this.randomId()
		};

		this.updatePasswordField = this.updatePasswordField.bind(this);
		this.updateExpiresField = this.updateExpiresField.bind(this);
	}

	updatePasswordField() {
		this.setState({
			passwordChecked: !this.state.passwordChecked
		})
	}

	updateExpiresField() {
		this.setState({
			expiresChecked: !this.state.expiresChecked
		});
	}

	randomId() {
		let text = "";
		let possible = "abcdefghijklmnopqrstuvwxyz0123456789";

		for (let i = 0; i < 6; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}

	clearInputFields() {
		$("#short-url").val("");
		$("#url").val("");
		$("#require-login").prop('checked', false);
		$("#require-password").prop('checked', false);
		$("#password").val("");
		$("#expires").prop('checked', false);
		$("#expires-date").val("");
		this.state.randomUrl = this.randomId();
		this.setState(this.state);
	}

	createLink(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		let name = $("#short-url").val() === "" ? this.state.randomUrl : $("#short-url").val();
		let _this = this;

		Meteor.call("links.addLink", {
			name: name,
			url: $("#url").val(),
			owner: Meteor.user().username,
			require_login: $("#require-login").is(':checked'),
			require_password: $("#require-password").is(':checked'),
			password: $("#password").val(),
			expires: $("#expires").is(':checked'),
			expires_after: Date.now() + ($("#expires-date").val() * 1000 * 60 * 60 * 24)
		}, function(error) {
			if (error) {
				switch (error.error) {
					case "name-used":
						Materialize.toast('That short name is already used', 4000);
						break;
					case "malformed-input":
						Materialize.toast('Something is wrong with your input. Make sure you filled out all the fields.', 4000);
						break;
					default:
						Materialize.toast('Something went wrong!', 4000);
				}
			} else {
				Materialize.toast("Success", 4000);
				FlowRouter.go("/success/" + name);
				_this.clearInputFields();
			}
		});
	}

	render() {
		const passwordField = this.state.passwordChecked ?
			<div className="input-field inline">
				<input id="password" type="text" autoComplete="off" />
				<label htmlFor="password">Password</label>
			</div>
			: null;

		const expiresField = this.state.expiresChecked ?
			<div className="input-field inline">
				<input id="expires-date" type="number" min="1" />
				<label htmlFor="expires-date">Days</label>
			</div>
			: null;

		return (
			<div>
				<form onSubmit={this.createLink.bind(this)}>
					<div className="input-field large-input">
						<input id="url" type="url" className="validate" autoComplete="off" />
						<label htmlFor="url">URL</label>
					</div>
					<span className="go-prefix">go/</span>
					<div className="input-field inline large-input short-url">
						<input id="short-url" type="text" placeholder={this.state.randomUrl} autoComplete="off" />
					</div>
					<div>
						<input type="checkbox" className="filled-in" id="require-login" />
						<label htmlFor="require-login">Require the user to be logged in</label>
					</div>
					<div>
						<input type="checkbox" className="filled-in" id="require-password" onChange={this.updatePasswordField} />
						<label htmlFor="require-password">Password protect</label>
					</div>
					{passwordField}
					<div>
						<input type="checkbox" className="filled-in" id="expires" onChange={this.updateExpiresField} />
						<label htmlFor="expires">Set expiration</label>
					</div>
					{expiresField}
					<div className="input-field">
						<button className="btn" onClick={this.createLink.bind(this)}>Shorten</button>
					</div>
				</form>
			</div>
		)
	}
}