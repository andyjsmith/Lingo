import React, {Component} from 'react';
import { Random } from 'meteor/random';

export default class Success extends Component {
	render() {
		return (
			<div>
				<h3>Your link has been created!</h3>
				<h4><a href={`http://go/${this.props.name}`}>go/{this.props.name}</a></h4>
			</div>
		);

	}
}