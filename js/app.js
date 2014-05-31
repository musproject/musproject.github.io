$(".rating").raty({
	width: false,
});

var fbLogin = function() {
	FB.login(function(){}, {scope: 'publish_actions'});
}

$(".fb-login").click(fbLogin);