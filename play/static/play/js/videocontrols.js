window.onload = function() {
	// Video
	var video = document.getElementById("video");
	video.textTracks[0].mode = "showing";

	// Buttons
	var playButton = document.getElementById("play-pause");
	var muteButton = document.getElementById("mute");
	var tempMuteButton = document.getElementById("tempmute");
	var fullScreenButton = document.getElementById("full-screen");
	var choice1 = document.getElementById("choice1");
	var choice2 = document.getElementById("choice2");
	var button1 = document.getElementById("choiceleft");
	var button2 = document.getElementById("choiceright");
	var price1 = document.getElementById("price1");
	var price2 = document.getElementById("price2");
	var flag = document.getElementById("flag");
	var progressContainer = document.getElementById("progressContainer");
	var myProgress = document.getElementById("myProgress");
	var progressBar = document.getElementById("myBar");
	var progressText = document.getElementById("progressText");

	var startButton = document.getElementById("start");

	var timerContainer = document.getElementById("timerContainer");
	var timerBar = document.getElementById("timerBar");

	// Sliders
	var seekBar = document.getElementById("seek-bar");
	var volumeBar = document.getElementById("volume-bar");

	//variable for questions
	var questionText = document.getElementById("questions");
	var prompt = document.getElementById("prompt");

	var winTime = 507.5;
	var loseTime = 478.2;
	// Event listener for the play/pause button
	playButton.addEventListener("click", function() {
		if (video.paused == true) {
			// Play the video
			video.play();

			// Update the button text to 'Pause'
			playButton.innerHTML = "Pause";
		} else {
			// Pause the video
			video.pause();

			// Update the button text to 'Play'
			playButton.innerHTML = "Play";
		}
	});


	// Event listener for the mute button
	muteButton.addEventListener("click", function() {
		if (video.muted == false) {
			// Mute the video
			video.muted = true;

			// Update the button text
			muteButton.innerHTML = "Unmute";
		} else {
			// Unmute the video
			video.muted = false;

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
			tempMuteButton.style.visibility = "visible";

			// Update the button text
		} else {
			// Unmute the video
			video.muted = false;
			tempMuteButton.style.visibility = "hidden";

			// Update the button text
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

	
	//Setting up JSON data and Ajax
	var questionurl = 'https://chance-at-life.herokuapp.com/api/question/';

	var questionData = null;

	$.ajax({
		method: 'GET',
		url: questionurl,
		dataType: 'json',
		success: function(data) {
			questionData = data;
			// Update the seek bar as the video plays
			video.addEventListener("timeupdate", function(data) {
				// Calculate the slider value
				var value = (100 / video.duration) * video.currentTime;

				// Taxes handling at 06:15
				if (video.currentTime >= 374 && video.currentTime <= 374.3) {
					var oldpercent = progressBar.style.width.slice(0, -1);
					var oldPrice = progressText.innerHTML.substring(1);
					progressBar.style.width = parseInt(oldpercent) - (500/55) + "%";
					var currentPrice = parseInt(oldPrice) - 5;
					progressText.innerHTML = "$" + currentPrice;
				};

				//Start button shows up when it has to
				if (video.currentTime >= 26.7 && video.currentTime <= 37.4) {
					startButton.style.visibility = "visible";
				} else {
					startButton.style.visibility = "hidden";
				};

				if (video.currentTime >= 42.5) {
					progressContainer.style.opacity = "1";
				} else {
					progressContainer.style.opacity = "0";
				};
				
				var oldpercent = progressBar.style.width.slice(0, -1);
				if (parseInt(oldpercent) <= 30) {
					progressBar.style["background-color"] = "#f54d28";
				} else if (parseInt(oldpercent) <= 50 && parseInt(oldpercent) >= 30.5) {
					progressBar.style["background-color"] = "#ffa84e";
				} else {
					progressBar.style["background-color"] = "#3399CC";
				};
				

				if (video.currentTime >= 43) {
					flag.style.visibility = "visible";
				} else {
					flag.style.visibility = "hidden";
				};

				var oldPrice = progressText.innerHTML.substring(1);

				if (oldPrice <= 0) {
					if (video.currentTime <= loseTime - 0.2) {
						video.pause();
						progressText.innerHTML = "";
						progressBar.style.width = "0%";
						video.currentTime = loseTime;
						document.body.style.backgroundColor = "#f54d28";
						video.play();
					};

				} else if (oldPrice > 0) {
					if (video.currentTime > loseTime - 0.7 && video.currentTime < loseTime - 0.3) {
						video.pause();
						video.currentTime = winTime;
						document.body.style.backgroundColor = "#3399CC";
						video.play();
					};
				};

				if (video.currentTime >= video.duration - 1) {
					window.location.href = 'http://chance-at-life.com/';
				};

				if (video.currentTime >= winTime - 0.5) {
					window.location.href = 'http://chance-at-life.com/';
				};


				for (i=0; i < questionData.length; i++) {

					if (video.currentTime >= questionData[i].timestamp + 2 && video.currentTime <= questionData[i].choice1_timestamp - 0.2) {
						var mq = window.matchMedia( "(max-aspect-ratio: 774/792)" );
						var logo = document.getElementById("logo");
						if (mq.matches) {
						    logo.style.opacity = "0";
						};

						prompt.style.visibility = "visible";
						prompt.style.opacity = "1";
						timerContainer.style.visibility = "visible";
						timerContainer.style.opacity = "1";
						var timer = questionData[i].choice1_timestamp - questionData[i].timestamp - 2;
						timerBar.style.transition = "all " + timer + "s ease-in-out";
						timerBar.style.width = "100%";
						questionText.innerHTML = questionData[i].question_text;
						choice1.innerHTML = questionData[i].choice1_text;
						choice2.innerHTML = questionData[i].choice2_text;
						price1.innerHTML = "$" + questionData[i].price1;
						price2.innerHTML = "$" + questionData[i].price2;

						var choice1time = questionData[i].choice1_timestamp;
						var choice2time = questionData[i].choice2_timestamp;
						var choice1price = questionData[i].price1;
						var choice2price = questionData[i].price2;
						var oldpercent = progressBar.style.width.slice(0, -1);
						var oldPrice = progressText.innerHTML.substring(1);


						//Event listener for the button1 button
						button1.addEventListener("click", function(){
							if (oldpercent > parseInt(choice1price)*100/55) {
								var currentPrice;
								video.currentTime = choice1time;
								progressBar.style.width = parseInt(oldpercent) - (parseInt(choice1price)*100/55) + "%";
								currentPrice = parseInt(oldPrice) - parseInt(choice1price);
								progressText.innerHTML = "$" + currentPrice;
							} else {
								progressBar.style.width = '0%';
								progressText.innerHTML = "$0";
								myProgress.style["background-color"] = "#f54d28";
								video.currentTime = loseTime;

							};
						});

						//Event listener for the button2 button
						button2.addEventListener("click", function(){
							if (oldpercent > parseInt(choice2price)*100/55) {
								var currentPrice;
								video.currentTime = choice2time;
								progressBar.style.width = parseInt(oldpercent) - (parseInt(choice2price)*100/55) + "%";
								currentPrice = parseInt(oldPrice) - parseInt(choice2price);
								progressText.innerHTML = "$" + currentPrice;
							} else {
								progressBar.style.width = '0%';
								progressText.innerHTML = "$0";
								myProgress.style["background-color"] = "#f54d28";
								video.currentTime = loseTime;
								
							};
						});

						if (video.currentTime >= questionData[i].choice1_timestamp - 0.5 && video.currentTime <= questionData[i].choice1_timestamp - 0.2 ) {
							var choice1price = questionData[i].price1;
							var oldpercent = progressBar.style.width.slice(0, -1);
							var oldPrice = progressText.innerHTML.substring(1);
							progressBar.style.width = parseInt(oldpercent) - (parseInt(choice1price)*100/55) + "%";
							currentPrice = parseInt(oldPrice) - parseInt(choice1price);
							progressText.innerHTML = "$" + currentPrice;

						};

						
					} else if (video.currentTime >= questionData[i].choice1_timestamp && video.currentTime < questionData[i].skip_to) {
						prompt.style.opacity = "0";
						prompt.style.visibility = "hidden";
						timerContainer.style.opacity = "0";
						timerContainer.style.visibility = "hidden";
						timerBar.style.transition = "all " + 0.1 + "s ease-in-out";
						timerBar.style.width = "0%";

						var mq = window.matchMedia( "(max-aspect-ratio: 774/792)" );
						var logo = document.getElementById("logo");
						if (mq.matches) {
						    logo.style.opacity = "1";
						};


						if (video.currentTime >= questionData[i].choice2_timestamp - 0.5 && video.currentTime <= questionData[i].choice2_timestamp - 0.1 ) {
							video.currentTime = questionData[i].skip_to;

						};

					};
				};

				// Update the slider value
				seekBar.value = value;
			});
			//console.log(questionData);
		},
		error: function(error_data) { 
			console.log("error questionData");
		},
	});

	//console.log(questionData)

	//Set up the progress bar
	var progressBar = document.getElementById("myBar");
	progressBar.style.width = '100%';
	var oldpercent = progressBar.style.width.slice(0, -1);


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
	});

	startButton.addEventListener("click", function() {
		//Send Player to gametime
		video.currentTime = 37.6;
		video.play();
		startButton.style.visibility = "hidden";

		var timef = video.currentTime / video.duration;

	});
	
};

