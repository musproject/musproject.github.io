$(".rating").raty({
	width: false,
});

var fbLogin = function() {
	FB.login(function(){}, {scope: 'publish_actions'});
}

$(".fb-login").click(fbLogin);

var checkLogin = function() {
	FB.getLoginStatus(function(status){
		if(status == "connected") {
			$(".fb-login").hide();
			$(".fb-info").show();
			FB.api("/me/picture", function(res){
				$(".fb-info .picture").attr("src", res.data.url);
			});
			FB.api("/me", function(res){
				$(".fb-info .name").text(res.first_name);
			});
		}
	});
}

checkLogin();