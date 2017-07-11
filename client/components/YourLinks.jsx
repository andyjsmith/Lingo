import React from 'react';
import TrackerReact from "meteor/ultimatejs:tracker-react";

export default class YourLinks extends TrackerReact(React.Component) {
	componentDidMount() {
		Meteor.subscribe("links.userLinks");
	}

	render() {
		let links = Links.find({});
		if (!links) return <div></div>;
		return <div>
			<h3>Your Links</h3>
			<table className="striped">
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
						return <tr key={link._id}>
							<td>{link.name}</td>
							<td>{link.url}</td>
							<td>{link.require_login ? "Yes" : "No"}</td>
							<td>{link.require_password ? "Yes" : "No"}</td>
							<td>{link.expires ? expires.expires : "No"}</td>
							<td><button className="btn"><i className="fa fa-trash-o" aria-hidden="true" /></button></td>
						</tr>
					})}
				</tbody>
			</table>
		</div>;
	}
}