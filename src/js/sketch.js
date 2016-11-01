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

var bipSound;

function preload()
{
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
	
	for (var i = 0; i < 6; i++) {
	
	AIArray[i] = new createType(
            "goodMovie", IMAGES_ROOT + "movies/evil-ai/"+ i +".jpg");
            
    }

    /* TODO explain the meaning of the below */

    myColorValues = [
		60, //pink
		0,	//red
		10,	//blue
		20,	//green
		0,	//yellow
		0,	//black
	]
}

function setup() {
	createCanvas(0, 0);
	typeArray = [
	girlyArray,
	horrorArray,
	natureArray,
	childishArray,
	actionArray,
	AIArray,
	];
}

function draw() {
	//background(255, 255, 255);
	//image(displayArray[currentMovie].img, 20, 20, girlyArray[2].img.width/4, girlyArray[2].img.height/4);
	//text(displayArray[currentMovie].title, width/2, 20);
	if (resetSlider) {
	displayMovieSliders();
	}
}

function displayMovieSliders()
{
    checkValues(myColorValues);
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
            responsiveVoice.speak("Sorry this is not a good choice");
            badMovieCount++;
            console.log('badMovieCount: '+badMovieCount);
        }
        else
        {
            console.log('GOOD CHOICE!');
            responsiveVoice.speak("Good Choice");
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

    for (var i = 0; i < amountsArray.length-1; i++)
    {
        var swappedIndex = getSwappedIndex(30);

        for (var j = 0; j < amountsArray[i]; j++)
        {
            var pickedMovie = swappedIndex[j];
            console.log(pickedMovie);
            displayArray.push(typeArray[i][pickedMovie]);
		}
	}
	// and for It's own A.I movies
	
	var shortSwappedIndex = getSwappedIndex(6);
	
	for (var i = 0; i < amountsArray[5]; i++) 
	{
		var pickedMovie = shortSwappedIndex[i];
		displayArray.push(typeArray[5][pickedMovie]);
	}
	
	//mixing all of the picked movies together
	
	var lastSwap = getSwappedIndex(30);
	for (var j = 0; j < displayArray.length; j++)
	{
	var tempValue = displayArray[j];
	displayArray[j] = displayArray[lastSwap[j]];
	displayArray[lastSwap[j]] = tempValue;
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

function checkValues(myValueArray) {

// 	var pinkValue = myValueArray[0];
// 	var redValue = myValueArray[1];
// 	var blueValue = myValueArray[2];
// 	var greenValue = myValueArray[3];
// 	var yellowValue = myValueArray[4];
// 	var blackValue = myValueArray[5];

	var pinkValue = int(random(70));
	var redValue = int(random(70));
	var blueValue = int(random(70));
	var greenValue = int(random(70));
	var yellowValue = int(random(70));
	var blackValue = int(random(70));


	var totalValues = pinkValue + redValue + blueValue + greenValue + yellowValue + blackValue + 1;

	amountsArray[0] = int(pinkValue/totalValues*30);
	amountsArray[1] = int(redValue/totalValues*30);
	amountsArray[2] = (int(blueValue/totalValues*30)+int(greenValue/totalValues*30));
	amountsArray[3] = int(yellowValue/totalValues*30);
	amountsArray[4] = int(blackValue/totalValues*30);
	var newTotal = int(pinkValue/totalValues*30)+int(redValue/totalValues*30)+(int(blueValue/totalValues*30)+int(greenValue/totalValues*30))+int(yellowValue/totalValues*30)+int(blackValue/totalValues*30);
	amountsArray[5] = 30 - newTotal;
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
