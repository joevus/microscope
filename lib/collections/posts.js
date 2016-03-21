Posts = new Mongo.Collection('posts');
//not using var keyword so the scope of the object makes it available to the whole app.
Posts.allow({
  insert: function(userId, doc) {
  	// only allow posting if you are logged in
  	return !! userId;
  }
});