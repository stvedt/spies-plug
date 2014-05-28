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