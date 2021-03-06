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

	componentDidMount() {
		// Remove disallowed characters from the short-url input
		let firstAlphanumericWarning = true; // don't show the warning message more than once
		$('#short-url').on('input', function() {
			let c = this.selectionStart,
				r = /[^a-z0-9]/gi,
				v = $(this).val();
			if(r.test(v)) {
				$(this).val(v.replace(r, ''));
				c--;
				if (firstAlphanumericWarning) {
					Materialize.toast("Ony alphanumeric characters are allowed (A-Z, a-z, 0-9)", 6000);
					firstAlphanumericWarning = false;
				}
			}
			this.setSelectionRange(c, c);
		});
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

	createLink(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		let name = $("#short-url").val() === "" ? this.state.randomUrl : $("#short-url").val();

		Meteor.call("links.addLink", {
			name: name,
			url: $("#url").val(),
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
						console.log(error);
						Materialize.toast('Something went wrong!', 4000);
				}
			} else {
				FlowRouter.go("/success/" + name);
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
						<input id="short-url" type="text" placeholder={this.state.randomUrl} autoComplete="off" pattern="^[A-Za-z0-9]*$" />
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