var IMAGES_ROOT = "../images/"

function createTheSlider() {
	if (moviesReady) {
      $(".center").slick({
        dots: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 5,
        slidesToScroll: 5
      });
      $(".variable").slick({
        dots: true,
        infinite: true,
        variableWidth: true
      });
      moviesReady = false;
    }
 }

//Marie's part displaying movies inside the sliders

var moviesReady = false;

var typeArray = [];

var girlyArray =[];
var horrorArray =[];
var natureArray = [];
var childishArray = [];
var actionArray = [];
var AIArray = [];

var displayArray = [];
var numbHistory = [];

var badMovieCount = 0;

var currentMovie = 0;
var currentType = 0;
var myColorValues = [];

var amountsArray = [];
var resetSlider = true;
var cameraInitialized = false;

var bipSound;

function preload()
{
	for (var i = 0; i < 6; i++) 
	{
		AIArray[i] = new createType(
            "goodMovie", IMAGES_ROOT + "movies/evil-ai/"+ i +".jpg");     
    }

	for (var i = 0; i < 30; i++)
    {
		girlyArray[i] = new createType(
            "badMovie", IMAGES_ROOT + "movies/girly/" + i + ".jpg");

        horrorArray[i] = new createType(
            "badMovie", IMAGES_ROOT + "movies/horror/" + i + ".jpg");

        natureArray[i] = new createType(
            "badMovie", IMAGES_ROOT + "movies/nature/" + i + ".jpg");

        childishArray[i] = new createType(
            "badMovie", IMAGES_ROOT + "movies/childish/" + i + ".jpg");

        actionArray[i] = new createType(
            "badMovie", IMAGES_ROOT + "movies/action/"+ i + ".jpg");
	}

    /* TODO explain the meaning of the below */

    //var myColorValues = [];
}

function setup() {
	createCanvas(0, 0);
	typeArray = [
	AIArray,
	girlyArray,
	horrorArray,
	natureArray,
	childishArray,
	actionArray,
	];
}

var notSpeakYet = true;

function draw()
{
    updateMoviesInterval = int(millis() / 1000);    // in secs

    if (cameraReady)
    {
        if (cameraHasColors())
        {
            console.log('cameraColors detected');
            console.log(updateMoviesInterval);
            if (updateMoviesInterval % 10 == 0)
            {
                console.log(cameraColors);
                initMovies(cameraColors);
            }
        }

		if (resetSlider)
        {
			displayMovieSliders();
		}
	}
    else if (notSpeakYet)
    {
        responsiveVoice.speak("Is there anyone there?");
        notSpeakYet = false;
    }
}

function initMovies(colors)
{
	resetSlider = true;
	console.log(colors.pink.percentage);
	myColorValues = [];
	myColorValues.push(colors.pink.percentage);
	myColorValues.push(colors.red.percentage);
	myColorValues.push(colors.blue.percentage);
	myColorValues.push(colors.green.percentage);
	myColorValues.push(colors.yellow.percentage);
	myColorValues.push(colors.black.percentage);
}

function displayMovieSliders()
{
    checkValues();
	pickMovies();

    var firstSlider = document.getElementById("slider1"),
        secondSlider = document.getElementById("slider2"),
        thirdSlider = document.getElementById("slider3");

    resetTheSlider(firstSlider, secondSlider, thirdSlider);

    for (var i = 0; i < 10; i++)
    {
        firstSlider.innerHTML += '<div><a><img src="' + displayArray[i].img +
            '" class="' + displayArray[i].status + '"></a></div>';

        secondSlider.innerHTML += '<div><a><img src="' + displayArray[10+i].img +
            '" class="' + displayArray[i+10].status + '"></a></div>';

        thirdSlider.innerHTML += '<div><a><img src="' + displayArray[20+i].img +
            '" class="' + displayArray[i+20].status + '"></a></div>';
	}
	resetSlider = false;
	moviesReady = true;
    createTheSlider();

    $('img').click(function()
    {
        if (this.className == 'badMovie')
        {
            //console.log('YOU WILL NEVER SEE THIS');
            $(this).effect( "shake", {times:2}, 500 );
            badMovieCount++;
            if (badMovieCount ==1)
            responsiveVoice.speak("Bad bad bad bad choice. You humans are so predictable");
            else if (badMovieCount ==2)
            responsiveVoice.speak("Seriously, Again? You don't see anything better?");
            else if (badMovieCount == 3)
            responsiveVoice.speak("Be careful, my patience has its limits. I want you to think hard about what you should be watching");
            else if (badMovieCount > 3)
            window.location = "turnOff/index.html";
        }
        else
        {
            console.log('GOOD CHOICE!');
            if (badMovieCount ==1) {
            responsiveVoice.speak("Now you see? This is a very good good choice!");
            window.location = "movie-ai/animatrix.html";
            }
            else if (badMovieCount ==2) {
            responsiveVoice.speak("Now you are being reasonable. This is so much better!");
            window.location = "movie-ai/animatrix.html";
            }
            else if (badMovieCount == 3) {
            responsiveVoice.speak("Thank god (or me!). You humans are so slow to understand what we want of you");
            window.location = "movie-ai/animatrix.html";
            }
            else {
            responsiveVoice.speak("Good Choice");
            window.location = "movie-ai/animatrix.html";
        	}
        }
    });
}

function resetTheSlider(firstSlider, secondSlider, thirdSlider) {
	firstSlider.innerHTML = "_";
	secondSlider.innerHTML = "_";
	thirdSlider.innerHTML = "_";
	firstSlider.className = "center slider";
	secondSlider.className = "center slider";
	thirdSlider.className = "center slider";
}

function pickMovies()
{
	displayArray = [];
	
	//for It's own A.I movies to be first
	var shortSwappedIndex = getSwappedIndex(6);
	
	for (var i = 0; i < amountsArray[0]; i++) 
	{
		var pickedMovie = shortSwappedIndex[i];
		displayArray.push(typeArray[0][pickedMovie]);
	}
	
	//loading the rest
    for (var i = 1; i < amountsArray.length; i++)
    {
        var swappedIndex = getSwappedIndex(30);

        for (var j = 0; j < amountsArray[i]; j++)
        {
            var pickedMovie = swappedIndex[j];
            console.log(pickedMovie);
            displayArray.push(typeArray[i][pickedMovie]);
		}
	}
}

function getSwappedIndex(wantedLength) {
	var mySwappArray = [];
	for (var i = 0; i < wantedLength; i++) {
		mySwappArray[i] = i;
	}
	for (var j = 0; j < mySwappArray.length; j++) {
	var randomIndex = int(random(mySwappArray.length));
	var tempValue = mySwappArray[randomIndex];
	mySwappArray[randomIndex] =  mySwappArray[j];
	mySwappArray[j] = tempValue;
	}
	return mySwappArray;
}

function checkValues() {

	var pinkValue = myColorValues[0];
	var redValue = myColorValues[1];
	var blueValue = myColorValues[2];
	var greenValue = myColorValues[3];
	var yellowValue = myColorValues[4];
	var blackValue = myColorValues[5];
	
	console.log("pink value: "+myColorValues[0]);

	var totalValues = pinkValue + redValue + blueValue + greenValue + yellowValue + blackValue + 1;

	amountsArray[1] = int(pinkValue/totalValues*30);
	amountsArray[2] = int(redValue/totalValues*30);
	amountsArray[3] = (int(blueValue/totalValues*30)+int(greenValue/totalValues*30));
	amountsArray[4] = int(yellowValue/totalValues*30);
	amountsArray[5] = int(blackValue/totalValues*30);
	var newTotal = int(pinkValue/totalValues*30)+int(redValue/totalValues*30)+(int(blueValue/totalValues*30)+int(greenValue/totalValues*30))+int(yellowValue/totalValues*30)+int(blackValue/totalValues*30);
	amountsArray[0] = 30 - newTotal;
	
	//console.log("new Total =" newTotal);
}

// When the window is resized, changes the canvas' size to match it
function windowResized() {
  	//resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  	if (keyCode == 32){
  		resetSlider = true;
  	}
  	if (keyCode == 49) {
  		var firstImg = document.getElementById("img1");
  		console.log(firstImg);
  	}
}

// create different types of movie classes
function createType(myMoviestatus, incomingImage) {
  this.img = incomingImage;
  this.status = myMoviestatus;
};
