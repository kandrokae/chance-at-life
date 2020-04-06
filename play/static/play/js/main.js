var video = document.getElementById("video");
var startButton = document.getElementById("start")
var questionText = document.getElementById("questions");

video.addEventListener("timeupdate", function() {

	//Setting up JSON data and Ajax
	var url = 'http://127.0.0.1:8000/';


	//Start button shows up when it has to
	if (video.currentTime >= 5 && video.currentTime <= 10) {
		startButton.style.visibility = "visible";
	} else {
		startButton.style.visibility = "hidden";

	}

	//Question shows up at some point
	if (video.currentTime >= 20 && video.currentTime <= 30) {
		questionText.style.visibility = "visible";
		questionText.innerHTML = "It works!"
	} else {
		questionText.style.visibility = "hidden";

	}

});