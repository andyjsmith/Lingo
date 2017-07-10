import React, {Component} from 'react';

export default class Header extends Component {
	logOut() {
		Meteor.logout(() => {
			FlowRouter.go("/login");
		});
	}

	render() {
		let logOutBtn = Meteor.userId() ? <button className="btn logout-btn" onClick={this.logOut.bind(this)}>Log Out</button> : "";

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
					{logOutBtn}
				</div>
			</div>
		)
	}
}