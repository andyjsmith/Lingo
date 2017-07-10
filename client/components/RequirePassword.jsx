import React, {Component} from 'react';

export default class RequirePassword extends Component {

	submitPassword(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		Meteor.call("link.verifyPassword", {
			name: this.props.name,
			password: $("#password").val()
		}, (error, result) => {
			if (result) {
				window.location.replace(result.url);
			}
		})

	}

	render() {
		return <div>
			<h3>This link requires a password.</h3>
			<form autoComplete="off" onSubmit={this.submitPassword.bind(this)}>
				<div className="input-field large-input">
					<input id="password" type="text" autoComplete="off"/>
					<label htmlFor="password">Password</label>
				</div>
				<div className="input-field">
					<button type="submit" className="btn" onClick={this.submitPassword.bind(this)}>Continue</button>
				</div>
			</form>
		</div>;
	}
}