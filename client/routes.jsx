import React from "react";
import {mount} from "react-mounter";
import {MainLayout} from "./layouts/MainLayout";
import Login from "./components/Login";
import Home from "./components/Home";
import LinkPage from "./components/LinkPage";
import RequireLogIn from "./components/RequireLogIn";
import RequirePassword from "./components/RequirePassword";
import Success from "./components/Success";
import YourLinks from "./components/YourLinks";

Links = new Mongo.Collection("links");

FlowRouter.route('/', {
	action() {
		if (Accounts.userId()) {
			mount(MainLayout, {
				content: (<Home />)
			});
		} else {
			FlowRouter.go("/login");
		}
	}
});

FlowRouter.route('/login', {
	action() {
		mount(MainLayout, {
			content: (<Login />)
		});
	}
});

FlowRouter.route("/links", {
	action() {
		mount(MainLayout, {
			content: <YourLinks />
		});
	}
});

FlowRouter.route('/:name', {
	action(params) {
		Meteor.call("links.getLink", {"name": params.name}, (error, result) => {
			if (error || !result) FlowRouter.go("/");
			if (result.require_login && !Meteor.userId()) {
				mount(MainLayout, {
					content: <RequireLogIn />
				});
			} else if (result.require_password) {
				mount(MainLayout, {
					content: <RequirePassword name={params.name}/>
				});
			} else if (result.require_login && Meteor.userId()) {
				Meteor.call("link.verifyLogin", {"name": params.name}, (error, result) => {
					window.location.replace(result.url);
				});
			} else if (result.url) {
				window.location.replace(result.url);
			} else {
				FlowRouter.go("/");
			}
		});
	}
});

FlowRouter.route('/success/:name', {
	action(params) {
		mount(MainLayout, {
			content: <Success name={params.name} />
		});
	}
});