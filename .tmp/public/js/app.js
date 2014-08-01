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


(function (io) {

  // as soon as this file is loaded, connect automatically, 
  var socket = io.connect();
  if (typeof console !== 'undefined') {
    log('Connecting to Sails.js...');
  }

  socket.on('connect', function socketConnected() {

    // Listen for Comet messages from Sails
    socket.on('message', function messageReceived(message) {

      ///////////////////////////////////////////////////////////
      // Replace the following with your own custom logic
      // to run when a new message arrives from the Sails.js
      // server.
      ///////////////////////////////////////////////////////////
      log('New comet message received :: ', message);
      //////////////////////////////////////////////////////

    });


    ///////////////////////////////////////////////////////////
    // Here's where you'll want to add any custom logic for
    // when the browser establishes its socket connection to 
    // the Sails.js server.
    ///////////////////////////////////////////////////////////
    log(
        'Socket is now connected and globally accessible as `socket`.\n' + 
        'e.g. to send a GET request to Sails, try \n' + 
        '`socket.get("/", function (response) ' +
        '{ console.log(response); })`'
    );
    ///////////////////////////////////////////////////////////


  });


  // Expose connected `socket` instance globally so that it's easy
  // to experiment with from the browser console while prototyping.
  window.socket = socket;


  // Simple log function to keep the example simple
  function log () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }
  

})(

  // In case you're wrapping socket.io to prevent pollution of the global namespace,
  // you can replace `window.io` with your own `io` here:
  window.io

);
