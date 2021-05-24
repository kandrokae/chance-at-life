//variable for questions
var questionText = document.getElementById("questions");
var prompt = document.getElementById("prompt");
video.textTracks[0].mode = "hidden";

var startButton = document.getElementById("start");
var timerContainer = document.getElementById("timerContainer");
var timerBar = document.getElementById("timerBar");
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
progressBar.style.width = "100%";
var progressText = document.getElementById("progressText");
var selectmp3 = document.getElementById("selectmp3");
var skipintro = document.getElementById("skipintro");

var winTime = 507.5;
var loseTime = 478.2;

//Prompt updates
function updatePrompt(question_data) {
	questionText.innerHTML = question_data.question_text;
	choice1.innerHTML = question_data.choice1_text;
	choice2.innerHTML = question_data.choice2_text;
	price1.innerHTML = "$" + question_data.price1;
	price2.innerHTML = "$" + question_data.price2;
}
	
//Animation questions
function unhide(element, start, end) {
  	if (start === undefined && end === undefined) {
  		element.style.visibility = "visible";
		element.style.opacity = 1;
  	} else if (end === undefined) {
  		if (video.currentTime >= start) {
  			element.style.visibility = "visible";
			element.style.opacity = 1;
  		} 
  	} else {
  		if (video.currentTime >= start && video.currentTime <= end) {
			unhide(element);
		} else {
			hide(element);
		}
  	}
}

function hide(element) {
  	element.style.opacity = 0;
  	element.style.visibility = "hidden";
}

function fadeIn(element, start, end) {
	if (start === undefined && end === undefined) {
		element.style.opacity = 1;
	} else if (end === undefined) {
		if (video.currentTime >= start) {
			fadeIn(element);
		}
	} else {
		if (video.currentTime >= start && video.currentTime <= end) {
			fadeIn(element);
		} else {
			fadeOut(element);
		}
	}
}

function fadeOut(element) { element.style.opacity = 0; }

//Logo Ducks when prompts show
function hideOnSmScreens(element, duck_when) {
	var mq = window.matchMedia( "(max-aspect-ratio: 774/792)" );
	if (mq.matches && duck_when)  {
    	fadeOut(element);
	} else {
		fadeIn(element);
	}
}

function moveCaption(caption, new_position, new_line) {
	if (caption !== undefined) {
		caption.position = new_position;
		caption.line = new_line;
		video.textTracks[0].mode = "showing";
	} else {
		video.textTracks[0].mode = "hidden";
	}
}

function captionline() {
	var add = 0;

	if (window.innerWidth >= 775) {
		if (prompt.style.visibility == "visible") {
			var add = -4;
		}
		return -3 + add;
	} else {
		if (prompt.style.visibility == "visible") {
			var add = -3;
		}
		return -4 + add;
	}
}

function timeBarAnimation(width, start, end) {
	if (end !== undefined) {
		var timer = end - start - 1;
	} else {
		var timer = start;
	}
	
	timerBar.style.transition = "all " + parseInt(timer) + "s ease-out";
	timerBar.style.width = String(width) + "%";
}

//Timing functions
function skipToOnClick(element, time) {
	element.addEventListener("click", function() {
		video.currentTime = time;
	});
}

//Progressbar update function
var skipTos = [];

function updateProgressBar(price, skip_to) {
	var oldPrice = parseInt(progressText.innerHTML.substring(1));
	var oldpercent = parseInt(progressBar.style.width.slice(0, -1));

	if ((skipTos.includes(parseFloat(skip_to))) || (skipTos.includes(parseInt(price))) && (skip_to === undefined)) {} else {
		selectmp3.play()
		
		var currentPrice = oldPrice - parseInt(price);

		video.pause();

		if (currentPrice > 0) {
			progressText.innerHTML = "$" + currentPrice;
			progressBar.style.width = oldpercent - (price*100/55) + "%";
			if (skip_to !== undefined) {
				video.currentTime = skip_to;
				skipTos.push(parseFloat(skip_to));
			} else {
				skipTos.push(parseInt(price));
			}
							
		} else {
			progressBar.style.width = '0%';
			progressText.innerHTML = "";
			gameLost();
		};

		video.play();
	}
	console.log("mwaha");
	
	if (oldpercent <= 30) {
		progressBar.style["background-color"] = "#f54d28";
	} else if (oldpercent <= 50 && oldpercent >= 30.5) {
		progressBar.style["background-color"] = "#ffa84e";
	} else {
		progressBar.style["background-color"] = "#3399CC";
	};
}

//Function for time in between and Time at
function videoTimeBetween(start, end) {
	if (end !== undefined) {
		return (video.currentTime >= start && video.currentTime <= end);
	} else {
		return (video.currentTime >= start && video.currentTime <= start +0.3);
	}
}

//Game Outcomes
function gameWon() {
	video.pause();
	video.currentTime = winTime;
	document.body.style.backgroundColor = "#3399CC";
	video.play();
}

function gameLost() {
	myProgress.style["background-color"] = "#f54d28";
	document.body.style.backgroundColor = "#f54d28";
	video.currentTime = loseTime;	
}
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
			
			//Button to Skip the Game Introduction
			unhide(skipintro, 5, 58);
			skipToOnClick(skipintro, 87);

			// Taxes handling at 06:15
			if (videoTimeBetween(374)) { updateProgressBar(5) }

			//Start button and progress show up when they should
			unhide(startButton, 26.7, 37.4);
			fadeIn(progressContainer, 42.5);

			//Showing the flag
			unhide(flag, 43);

			if (videoTimeBetween(loseTime - 0.7, loseTime - 0.3)) { winGame() };

			if (video.currentTime >= video.duration - 1) {
				window.location.href = 'http://chance-at-life.com/';
			};

			if (video.currentTime >= winTime - 0.5) {
				window.location.href = 'http://chance-at-life.com/';
			};

			//Caption Management
			var caption = video.textTracks[0].activeCues[0];
			moveCaption(caption, 50, captionline());

			hideOnSmScreens(document.getElementById("logo"), prompt.style.visibility == "visible");

			for (i=0; i < questionData.length; i++) {

				if (videoTimeBetween(questionData[i].timestamp +2, questionData[i].choice1_timestamp -0.2)) {

					unhide(prompt);
					unhide(timerContainer);
					timeBarAnimation(100, questionData[i].timestamp, questionData[i].choice1_timestamp);

					updatePrompt(questionData[i])

					var choice1time = questionData[i].choice1_timestamp;
					var choice2time = questionData[i].choice2_timestamp;
					var choice1price = questionData[i].price1;
					var choice2price = questionData[i].price2;

					//Event listener for the button1 button
					button1.addEventListener("click", function(){
						updateProgressBar(choice1price, choice1time);	
					});

					//Event listener for the button2 button
					button2.addEventListener("click", function(){
						updateProgressBar(choice2price, choice2time);
					});

					if (videoTimeBetween(questionData[i].choice1_timestamp -0.5)) {
						updateProgressBar(choice1price, choice1time);
					};

					
				} else if (videoTimeBetween(questionData[i].choice1_timestamp, questionData[i].skip_to)) {
					hide(prompt);
					hide(timerContainer);
					timeBarAnimation(0, 0.1);

					if (videoTimeBetween(questionData[i].choice2_timestamp - 0.5)) {
						video.currentTime = questionData[i].skip_to;
					};
				};
			};
		});
	},
	error: function(error_data) { 
		console.log("Error retrieving the data for the Game Questions");
	},
});

startButton.addEventListener("click", function() {
	video.currentTime = 37.6;
	video.play();
	startButton.style.visibility = "hidden";

});