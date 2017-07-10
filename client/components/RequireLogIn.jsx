import React, {Component} from 'react';
import Login from "./Login";

export default class RequireLogIn extends Component {
	render() {
		return <div>
			<h3>This link requires that you sign in.</h3>
			<Login reloadAfterLogin="yes" />
		</div>;
	}
}