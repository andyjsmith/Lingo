import React, {Component} from 'react';

export default class Login extends Component {
	logIn(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		Meteor.loginWithPassword($("#username").val(), $("#password").val(), (error) => {
			if (!error) {
				if (this.props.reloadAfterLogin === "yes") {
					FlowRouter.reload();
				} else {
					FlowRouter.go("/");
				}
			}
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.logIn.bind(this)}>
					<div className="input-field">
						<input id="username" type="text" className="validate" autoCapitalize="none" />
						<label htmlFor="username">Username</label>
					</div>
					<div className="input-field">
						<input id="password" type="password" className="validate" />
						<label htmlFor="password">Password</label>
					</div>
					<div className="input-field">
						<input id="submit" type="submit" className="btn validate" value="Log In" onClick={this.logIn.bind(this)} />
					</div>
				</form>
			</div>
		)
	}
}