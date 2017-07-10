import React, {Component} from 'react';
import { Random } from 'meteor/random';

export default class LinkPage extends Component {

	constructor() {
		super();
		this.state = {
			link: null
		};
	}

	componentWillMount() {
		Meteor.call("links.getLink", {"name": this.props.name}, (error, result) => {
			if (error) {
			} else {
				console.log(result);
				this.setState({link: result});
				window.location.replace(this.state.link.url);
			}
		})
	}

	render() {
		return (
			<div>
				<form>
					{this.props.name}
				</form>
			</div>
		)
	}
}