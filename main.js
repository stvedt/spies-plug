function callback(obj) {

	var title = obj.media.title;
	var author = obj.media.author;
	var nowPlaying = title + " by  " + author;
    var playedBy = "Played by " + obj.dj.username;

	var notification = new Notification( nowPlaying, { icon: 'http://stephentvedt.com/fun/icon-128.png', body: playedBy });

    notification.onshow = function () {
      setTimeout( function() { notification.close(); }, 6000);
    }

    notification.onclick = function(x) {
        window.focus();
    };

}

function notifyMe(){

  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check if the user is okay to get some notification
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    console.log('notifications are enabled');
  }

  // Otherwise, we need to ask the user for permission
  // Note, Chrome does not implement the permission static property
  // So we have to check for NOT 'denied' instead of 'default'
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {

      // Whatever the user answers, we make sure we store the information
      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }

      // If the user is okay, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Notifications Enabled");
      }
    });
  }


  // At last, if the user already denied any notification, and you 
  // want to be respectful there is no need to bother him any more.
}

$(window).on('load', function(){
  var $button = $('body').one('click', function(){
    notifyMe();
  });
});

//Wait for API to be defined

function init() {
    //Write your code here
    API.on(API.DJ_ADVANCE, callback);
}
function cinit() {
    if (typeof window.API == "object") {
        clearInterval(loadClock);
        init();
        return 1;
    } else {
        return 0;
    }
}
var loadClock = setInterval(cinit, 500);