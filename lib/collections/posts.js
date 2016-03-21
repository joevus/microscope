Posts = new Mongo.Collection('posts');
//not using var keyword so the scope of the object makes it available to the whole app.

Meteor.methods({
	postInsert: function(postAttributes) {
		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String
		});

		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		var postId = Posts.insert(post);

		return {
			_id: postId
		};
	}
});