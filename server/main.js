import { Meteor } from 'meteor/meteor';

Links = new Mongo.Collection("links");

Meteor.startup(() => {
  // code to run on server at startup
});

/* Current Meteor allows the user to update their own profile. This prevents
 this from happening, allowing use of secure items in the profile like setting
 admin, etc. Meteor may implement this in the future but this is required now. */
Meteor.users.deny({
	update: function() {
		return true;
	}
});

Accounts.config({
	forbidClientAccountCreation: true
});