import React from 'react';
import TrackerReact from "meteor/ultimatejs:tracker-react";

export default class Header extends TrackerReact(React.Component) {
	componentDidMount() {
		$('.menu-btn').dropdown({
			inDuration: 300,
			outDuration: 225,
			constrain_width: true,
			hover: false,
			gutter: 0,
			belowOrigin: false
		});
	}

	logOut() {
		Meteor.logout(() => {
			FlowRouter.go("/login");
		});
	}

	render() {
		let adminMenu = Roles.getRolesForUser(Meteor.userId()).indexOf("admin") !== -1 ?
			<div>
				<li className="divider" />
				<li><a href="/users">Users</a></li>
				<li><a href="/all">All Links</a></li>
			</div> : "";

		let menu = Meteor.userId() ? <div>
			<button className="menu-btn btn" data-activates="menu-dropdown"><i className="fa fa-bars" aria-hidden="true" /></button>
			<ul id="menu-dropdown" className="dropdown-content">
				<li><a href="/">Create Link</a></li>
				<li><a href="/links">Your Links</a></li>
				<li><a href="#" onClick={this.logOut.bind(this)}>Log Out</a></li>
				{adminMenu}
			</ul>
		</div> : "";

		return (
			<div className="header">
				<div className="nav-left">
					<div style={{fontFamily: "overpassbold", fontSize: "70px", letterSpacing: "-3px"}}>
						<a href="/">
							<span style={{color: "rgb(65,187,65)"}}>lin</span>
							<span style={{color: "rgb(60,154,60)"}}>go</span>
						</a>
					</div>
					<div style={{fontFamily: "overpassregular", fontSize: "14px", marginTop: "-15px", color: "#446947"}}>
							Internal URL Shortener
					</div>
				</div>
				<div className="nav-right">
					{menu}
				</div>
			</div>
		)
	}
}