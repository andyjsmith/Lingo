import { Meteor } from 'meteor/meteor';

Meteor.publish("links.userLinks", function() {
	if (!this.userId) {
		throw new Meteor.Error("not-authorized");
	}

	return Links.find({"owner": this.userId});
});

Meteor.publish("links.allLinks", function() {
	if (!this.userId || !Roles.userIsInRole(this.userId, "admin")) {
		throw new Meteor.Error("not-authorized");
	}

	return Links.find({});
});