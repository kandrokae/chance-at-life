// Video
var video = document.getElementById("video");

// Buttons
var playButton = document.getElementById("play-pause");
var muteButton = document.getElementById("mute");
var tempMuteButton = document.getElementById("tempmute");
var fullScreenButton = document.getElementById("full-screen");

var videoControls = document.getElementById("video-controls")

// Sliders
var seekBar = document.getElementById("seek-bar");
var volumeBar = document.getElementById("volume-bar");


// Event listener for the play/pause button
playButton.addEventListener("click", function() {
	if (video.paused == true) { 
		video.play();
		playButton.innerHTML = "Pause";
	} else {
		video.pause();
		playButton.innerHTML = "Play";
	}
});

// Event listener for the mute button
muteButton.addEventListener("click", function() {
	if (video.muted == false) {
		// Mute the video
		video.muted = true;
		Array.prototype.slice.call(document.querySelectorAll('audio')).forEach(function(audio) {
			audio.muted = true;
		});

		// Update the button text
		muteButton.innerHTML = "Unmute";
	} else {
		// Unmute the video
		video.muted = false;
		Array.prototype.slice.call(document.querySelectorAll('audio')).forEach(function(audio) {
			audio.muted = false;
		});

		// Update the button text
		muteButton.innerHTML = "Mute";
	}
});

// Event listener for the full-screen button
fullScreenButton.addEventListener("click", function() {
	if (video.requestFullscreen) {
		video.requestFullscreen();
	} else if (video.mozRequestFullScreen) {
		video.mozRequestFullScreen(); // Firefox
	} else if (video.webkitRequestFullscreen) {
		video.webkitRequestFullscreen(); // Chrome and Safari
	};
});

tempMuteButton.addEventListener("click", function() {
	if (video.muted == false) {
		// Mute the video
		video.muted = true;
		Array.prototype.slice.call(document.querySelectorAll('audio')).forEach(function(audio) {
			audio.muted = true;
		});
		tempMuteButton.style.visibility = "visible";

	} else {
		// Unmute the video
		video.muted = false;
		Array.prototype.slice.call(document.querySelectorAll('audio')).forEach(function(audio) {
			audio.muted = false;
		});
		tempMuteButton.style.visibility = "hidden";
	}
});

// Event listener for the seek bar
seekBar.addEventListener("change", function() {
	// Calculate the new time
	var time = video.duration * (seekBar.value / 100);

	// Update the video time
	video.currentTime = time;

			// Calculate the slider value
	var value = (100 / video.duration) * video.currentTime;

	// Update the slider value
	seekBar.value = value;
});

// Pause the video when the seek handle is being dragged
seekBar.addEventListener("mousedown", function() {
	video.pause();
});

// Play the video when the seek handle is dropped
seekBar.addEventListener("mouseup", function() {
	video.play();
});

// Event listener for the volume bar
volumeBar.addEventListener("change", function() {
	// Update the video volume
	video.volume = volumeBar.value;
	Array.prototype.slice.call(document.querySelectorAll('audio')).forEach(function(audio) {
		audio.volume = volumeBar.value;
	});
});