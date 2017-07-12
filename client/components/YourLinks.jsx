import React from 'react';
import TrackerReact from "meteor/ultimatejs:tracker-react";

export default class YourLinks extends TrackerReact(React.Component) {
	componentDidMount() {
		Meteor.subscribe("links.userLinks");
		$
	}

	deleteLink(name) {
		Meteor.call("links.deleteLink", {
			name: name
		});
	}

	render() {
		let links = Links.find({});
		if (!links) return <div></div>;
		return <div>
			<h3>Your Links</h3>
			<table className="striped links-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>URL</th>
						<th>Signed In</th>
						<th>Password</th>
						<th>Expires</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{links.map((link) => {
						let date = new Date(link.expires_after);
						return <tr key={link._id}>
							<td>{link.name}</td>
							<td>{link.url}</td>
							<td>{link.require_login ? "Yes" : "No"}</td>
							<td>{link.require_password ? "Yes" : "No"}</td>
							<td>{link.expires ? date.toLocaleDateString() + " " + date.toLocaleTimeString() : "No"}</td>
							<td><button className="btn" onClick={this.deleteLink.bind(this, link.name)}><i className="fa fa-trash-o" aria-hidden="true" /></button></td>
						</tr>
					})}
				</tbody>
			</table>
		</div>;
	}
}