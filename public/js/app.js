$(".rating").raty({
	width: false,
	starOff: 'note-off.png',
  starOn: 'note-on.png',
  path: "/images/",
  number: 7,
  hints: [1,2,3,4,5,6,7],
  click: function(score) {
    localStorage[location.pathname] = score;
  }
});

if(localStorage[location.pathname]) {
	$(".rating").raty('score', localStorage[location.pathname]);
}

$(".rating").raty('readOnly', true);

var fbLogin = function() {
	FB.login(function(){
		checkLogin();
	}, {scope: 'publish_actions'});
}

$(".fb-login").click(fbLogin);

var checkLogin = function() {
	FB.getLoginStatus(function(status){
		console.log(status);
		if(status.status == "connected") {
			$(".fb-login").hide();
			$(".fb-info").show();
			$(".rating").raty('readOnly', false);
			FB.api("/me/picture", function(res){
				$(".fb-info .picture").attr("src", res.data.url);
			});
			FB.api("/me", function(res){
				$(".fb-info .name").text(res.first_name);
			});
		}
	});
}


var appId = '764986430198349';
if(location.host.indexOf("localhost") == 0) {
	appId = "765034950193497"
}

FB.init({
  appId      : appId,
  cookie     : true,  // enable cookies to allow the server to access 
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.0' // use version 2.0
});

checkLogin();

$(".video").each(function(){
	$(this).append(
		'<iframe src="http://www.youtube.com/embed/'
		+ $(this).attr("data-video")
		+ '?modestbranding=1&showinfo=0" frameborder="0" allowfullscreen>'
	)
});