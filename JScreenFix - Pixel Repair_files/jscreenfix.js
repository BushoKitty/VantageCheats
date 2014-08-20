
// Make JScreenFix frame draggable
$(function() {
   $("#canvasFrame").draggable({
      drag: function() {
	repositionComponents();
      }
    });
});

fullscreen = false;
updateTimer = 0;
startTime = new Date().getTime();


function jscreenfix() {

    var element = document.getElementById("fixScreen");
    element.style.visibility = "visible";
    element.style.opacity = 1;
    setTimeout(fixInline, 1000);

    _gaq.push(['_trackEvent', 'JScreenFix', 'Start', 'Launch JScreenFix button pressed']);
}

function back() {

    cancelFullscreen();

    var element = document.getElementById("fixScreen");
    element.style.visibility = "hidden";
    element.style.opacity = 0;
    clearInterval(updateTimer);

    var runTime = new Date().getTime() - startTime;

    _gaq.push(['_trackEvent', 'JScreenFix', 'Stop', 'Back button pressed', runTime]);
}

function setFullscreen() {

    var element = document.getElementById("fixScreen");

    if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
        fullscreen = true;
        _gaq.push(['_trackEvent', 'JScreenFix', 'Fullscreen', 'Mozilla fullscreen request']);
    }
    else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
        fullscreen = true;
        _gaq.push(['_trackEvent', 'JScreenFix', 'Fullscreen', 'Webkit fullscreen request']);
    }
}

function repositionComponents() {

    var position = $("#canvasFrame").position();
    var horizontalMid = window.innerWidth / 2;
    var verticalMid = window.innerHeight / 2;

    $("#sponsorFrame").toggleClass("moveLeft", (position.left + 256) > horizontalMid);
    $("#sponsorFrame").toggleClass("moveRight", (position.left + 256) <= horizontalMid);
    $("#sponsorFrame").toggleClass("moveTop", (position.top + 256) <= verticalMid);
    $("#sponsorFrame").toggleClass("moveBottom", (position.top + 256) > verticalMid);

    $("#backButtonWrapper").toggleClass("moveTop", (position.top + 256) > verticalMid);
    $("#backButtonWrapper").toggleClass("moveBottom", (position.top + 256) <= verticalMid);

    $("#fullscreenButtonWrapper").toggleClass("moveTop", (position.top + 256) > verticalMid);
    $("#fullscreenButtonWrapper").toggleClass("moveBottom", (position.top + 256) <= verticalMid);

    $("#sponsorFrameLeaderboardWrapper").toggleClass("moveTop", (position.top + 256) > verticalMid);
    $("#sponsorFrameLeaderboardWrapper").toggleClass("moveBottom", (position.top + 256) <= verticalMid);
}


function cancelFullscreen() {

    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }

    fullscreen = false;
}

function hideDragTip() {
    var element = document.getElementById("dragTip");
    element.style.visibility = "hidden";
}

function toggleFullscreen() {

    var element = document.getElementById("fixScreen");

    if (fullscreen) cancelFullscreen();
    else setFullscreen();

}

function fixInline() {
	repositionComponents();
	updateTimer = setInterval(drawInline, 10);
}

function drawInline() {
	draw(document.getElementById("canvas"));
}

function draw(cvs) {

	var ctx = cvs.getContext("2d");
	
	var blockSize = 64;
	var imageData = ctx.createImageData(blockSize, blockSize);
	for (var i=0; i<blockSize*blockSize; i++) {
		var p = i*4;
		imageData.data[p+0] = Math.random() >= 0.5 ? 255 : 0;
		imageData.data[p+1] = Math.random() >= 0.5 ? 255 : 0;
		imageData.data[p+2] = Math.random() >= 0.5 ? 255 : 0;
		imageData.data[p+3] = 255;
	}
	
	for (var y=0; y<cvs.height; y+=blockSize) { 
		for (var x=0; x<cvs.width; x+=blockSize) { 
			ctx.putImageData(imageData, x, y);
		}
	}
}
	  
	