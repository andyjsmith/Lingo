// Check if user is part of role(s)
function authenticate(roles) {
	if (!Roles.userIsInRole(Meteor.userId(), roles)) {
		throw new Meteor.Error('not-authorized');
	}
}

function verifyName(name){
	return name.matches("^[a-zA-Z0-9]+$");
}

Meteor.methods({
	'links.addLink'({name, url, owner, require_login, require_password, password, expires, expires_after}) {
		if (!Meteor.userId()) throw new Meteor.Error('not-authorized');
		try {
			check(name, String);
			check(url, String);
			check(owner, String);
			check(require_login, Boolean);
			check(require_password, Boolean);
			if (require_password) check(password, String);
			check(expires, Boolean);
			if (expires) check(expires_after, Number);
		} catch (e) {
			throw new Meteor.Error('malformed-input');
		}

		if (name === "" || url === "" || !verifyName(name)) {
			throw new Meteor.Error('malformed-input');
		}

		if (Links.findOne({"name": name})) {
			throw new Meteor.Error('name-used');
		}

		try {
			Links.insert({
				"name": name,
				"url": url,
				"owner": owner,
				"require_login": require_login,
				"require_password": require_password,
				"password": password,
				"expires": expires,
				"expires_after": expires_after
			});
		} catch (e) {
			throw new Meteor.Error('database-error');
		}
	},

	'links.getLink'({name}) {
		let link = Links.findOne({"name": name});
		delete link.password;
		if (link.require_login || link.require_password) {
			delete link.password;
			delete link.url;
		}
		return link;
	},

	'link.verifyPassword'({name, password}) {
		let link = Links.findOne({"name": name});
		if (link.require_login && !Meteor.userId()) throw new Meteor.Error('not-authorized');
		if (password === link.password) {
			return {url: link.url};
		} else {
			throw new Meteor.Error('invalid-password');
		}
	},

	'link.verifyLogin'({name}) {
		let link = Links.findOne({"name": name});
		if (Meteor.userId() && !link.require_password) return {url: link.url};
	},
});