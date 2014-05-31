$(".rating").raty({
	width: false,
	starOff: 'note-off.png',
  starOn: 'note-on.png',
  path: "/images/",
  number: 7
});

var fbLogin = function() {
	FB.login(function(){}, {scope: 'publish_actions'});
}

$(".fb-login").click(fbLogin);

var checkLogin = function() {
	FB.getLoginStatus(function(status){
		console.log(status);
		if(status.status == "connected") {
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

FB.init({
  appId      : '764986430198349',
  cookie     : true,  // enable cookies to allow the server to access 
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.0' // use version 2.0
});

checkLogin();