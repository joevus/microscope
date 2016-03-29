Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { 
		return [Meteor.subscribe('posts'), Meteor.subscribe('notifications')];
	}
});

Router.route('/', {name: 'postsList'});

Router.route('/posts/:_id', {
	name: 'postPage',
	waitOn: function() {
		return Meteor.subscribe('comments', this.params._id);
	},
	data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id/edit', {
	name: 'postEdit',
	data: function() { return Posts.findOne(this.params._id); }
})

Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function() {
	if(! Meteor.user()) {
		if(Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
		this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

// Route for when someone enters a url that is valid but there is no
// data for it: posts/xyz  (when there is no xyz _id). Keep at end.
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});