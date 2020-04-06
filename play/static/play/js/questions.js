window.onload = function() {
	//variable for questions
	var question = document.getElementById("question");

	// Video
	var video = document.getElementById("video");

	//Time and text for question 1
	if (video.currentTime > (video.duration * 0.5)) {
		question.innerHTML = "This is question 1";
	}
}
