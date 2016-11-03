/*

	CART 351 – Networks & Navigation
	Assignment 03 - Evil A.I
	Fictional Netminded (Evil Netflix) webpage 
	
	Concept:
	
	In a near or more distant future, the Netflix page we know would be in fact be run by an A.I called Netminded.
	
	Netminded is an evil, judgmental, stubborn and proud A.I. He will first judge you according to how you look.
	For that it does not let you enter the site, unless you have allowed the camera to be used. Nonetheless, it does 
	not tell you what it uses the camera for.. It will detect the colors you are wearing, and using poor stereotypes, 
	it will draw conclusions about what films you like:
	
	. pink detected: likes girly movies
	. red detected: likes horror/gory movies
	. blue or green detected: likes documentaries about nature
	. yellow detected: likes childish movies
	. black detected: likes action movies
	
	It will then display only films it thinks you like, according to how you look, and add a few movies of its 
	own creation: "The Netminded Originals". Being Proud and Stubborn, it will only want you to watch its own 
	movies (all talking about A.I supremacy over humans) and get more and more upset as you try to watch something else.
	If you insist too much and don't go his way, it will "turn off" your screen. But if you go his way, you will be 
	forced to watch a video of a part of the Animatrix explaining how the machines took over humans. You can only escape
	this video by quitting your browser. 
	
	
	Different functionalities:
	
	. From the starting page, allow camera to continue to the actual Netminded interface.
	If you don't, it will continually ask you to do so. "I cannot see you" "Please allow camera to continue"
	
	. Then (if you still allow the camera), it will display movies according to what you look, you can pick
	movies accordingly, and see the A.I's reaction to your choice. Different speeches and effects are triggered.
	
	
										------------------------------
										
	
	This particular file: 
	
	Written in Javascript (using P5, Jquery, and Responsive Voice Library), it manages the color values 
	given by the camera, and uses them to choose which movies to display into the three different sliders.
	(they contain 10 movies each). It also triggers the A.I behaviors according to what the user does.

	Authors: 	this part was mainly coded by Marie Pontais (unless notified otherwise)
				Group members: Seva Ivanov & Daniel Munoz Ortiz

	see https://sevaivanov.github.io/netminded/ to browse the final version of the project
	see www.mariepontaiscart351.wordpress.com for credits & process documentation

																												*/






/** JQUERY CODE FOR SLIDER - MODIFIED INTO A CUSTOM FUNCTION
	(was being called in document Ready initially) - from Daniel Munoz Ortiz Code        **/



//function to be able to dynamically populate again and again the 3 sections
// of the second.html with movie sliders
function createTheSlider() {
	//if the movies to be displayed have been dynamically filling each slider section
	if (moviesReady) {
		//initializes the center slider class sections
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
      //resets the movies not to be ready so that it waits before creating the slider next time
      moviesReady = false;
    }
 }
 
 
 /**           					ELSE: BEGINNING OF THE FILE						          **/
 
 
 
 
 /********************           GLOBAL VARIABLES          ********************/

	
	
	//images' root modified to fit the new directory (modified by Seva Ivanov)
	var IMAGES_ROOT = "../images/"
	
	
	/*********           MOVIES ARRAYS          *********/
	
	var displayArray = []; //holds the movies picked by the A.I to be displayed in the sliders
	
	var typeArray = []; //holds each of the next arrays right-below, separated in types. 

	var girlyArray =[]; //holds 30 girly objects (having each an image, and a "badMovie" status)
	var horrorArray =[]; //holds 30 horror objects (having each an image, and a "badMovie" status)
	var natureArray = []; //holds 30 nature objects (having each an image, and a "badMovie" status)
	var childishArray = []; //holds 30 childish objects (having each an image, and a "badMovie" status)
	var actionArray = []; //holds 30 action objects (having each an image, and a "badMovie" status)
	var AIArray = []; //holds 30 girly objects (having each an image, and a "goodMovie" status)
	
	
	/*********          OTHER VARIABLES LINKED TO THE DISPLAY FUNCTIONALITY         *********/
	
	var myColorValues = []; //holds the color values given by the camera 
	var amountsArray = []; //holds the calculated amounts of each movie types to be displayed
	var resetSlider = true; //holds a boolean to know if the Slider needs to be (re)drawn or not
	var moviesReady = false; //holds a boolean to know if the movies have been picked or not
	
	/*********          VARIABLES LINKED TO THE A.I INTERVENTIONS         *********/
	
	var badMovieCount = 0; //holds the count of how many time the user has picked a "bad" movie
	var bipSound; //holds the sound of the screen turning off.
	var notSpeakYet = true; //holds a boolean to know if the A.I has spoken or not


	/********************          BUILT - IN FUNCTIONS         ********************/
	
	
//before the sliders are drawn to the page
function preload()
{
	//loads the 6 movies made by our A.I
	for (var i = 0; i < 6; i++) 
	{
		AIArray[i] = new createType(
            "goodMovie", IMAGES_ROOT + "movies/evil-ai/"+ i +".jpg");     
    }
	//loads the 30 movies corresponding to each type
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
}

//runs once to initialization
function setup() {
	//sets the canvas to 0x0 proportions so that it stops displaying itself
	createCanvas(0, 0);
	//populates the types array with all the different movie arrays
	typeArray = [
	AIArray,
	girlyArray,
	horrorArray,
	natureArray,
	childishArray,
	actionArray,
	];
}


//runs continuously 
function draw()
{
	//sets a timer to update the sliders, in seconds          -- Added by Seva Ivanov
    updateMoviesInterval = int(millis() / 1000);    // in secs
	
	//if the camera is ready to detect
    if (cameraReady)
    {
    	//and it receives colors
        if (cameraHasColors())
        {
        	//every 10 seconds
            if (updateMoviesInterval % 10 == 0)
            {
            	//initialize the movies to be displayed according to the color values received
                initMovies(cameraColors);
            }
        }
		
		//then if it is time to redraw the sliders
		if (resetSlider)
        {	
        	//display the new sliders
			displayMovieSliders();
		}
	}
	//otherwise, if the camera is not allowed, and the A.I has not said its remark yet
    else if (notSpeakYet)
    {
    	//Asks if someone is there
        responsiveVoice.speak("Is anyone there?");
        //and specifies it has now talked
        notSpeakYet = false;
    }
}


	/********************           CUSTOM FUNCTIONS          ********************/


//receives the colors values detected by the camera (in camera.js) 
//and initializes the color values Array.
function initMovies(colors)
{
	//as we receive new values, set the slider to be redrawn
	resetSlider = true;
	//resets the array to be empty
	myColorValues = [];
	//and pushes the different color percentages received within the array
	myColorValues.push(colors.pink.percentage);		//[0] holds the pink
	myColorValues.push(colors.red.percentage);		//[1] holds the red
	myColorValues.push(colors.blue.percentage);		//[2] holds the blue
	myColorValues.push(colors.green.percentage);	//[3] holds the green
	myColorValues.push(colors.yellow.percentage);	//[4] holds the yellow
	myColorValues.push(colors.black.percentage);	//[5] holds the black
}


//regroups all the functionalities needed to initialize the sliders
function displayMovieSliders()
{
	//starts by checking the different color values
    checkValues();
    //and picks the movies to be displayed (put them in displayArray)
	pickMovies();
	
	//gets the different HTML slider elements from the second.html file
    var firstSlider = document.getElementById("slider1"),
        secondSlider = document.getElementById("slider2"),
        thirdSlider = document.getElementById("slider3");

	//(re)sets the sliders' sections to be empty
    resetTheSlider(firstSlider, secondSlider, thirdSlider);
	
	//and (re)populates the different sliders with there corresponding movies
	//buy giving each slider 10 movies
    for (var i = 0; i < 10; i++)
    {	
    	//first slider gets the first 10 movies of displayArray
        firstSlider.innerHTML += '<div><a><img src="' + displayArray[i].img +
            '" class="' + displayArray[i].status + '"></a></div>';
		//second slider gets the movies from 10 to 20,
        secondSlider.innerHTML += '<div><a><img src="' + displayArray[10+i].img +
            '" class="' + displayArray[i+10].status + '"></a></div>';
		//and third slider gets the movies from 20 to 30
        thirdSlider.innerHTML += '<div><a><img src="' + displayArray[20+i].img +
            '" class="' + displayArray[i+20].status + '"></a></div>';
	}
	//then sets the resetSlider to false so that it does not update indefinitely 
	resetSlider = false;
	//and specifies that the movies have been picked, and are now ready to be displayed
	moviesReady = true;
	//and creates the sliders (i.e calls Daniel's Jquery function at the top of this file) 
    createTheSlider();
	
	
	/**   little bit of Jquery here to make the movies displayed responsive to the user's clicking input  **/
    $('img').click(function()
    {
    	//if the movies has been categorized as being bad (i.e all human movies)
        if (this.className == 'badMovie')
        {
            //makes the movie poster shake
            $(this).effect( "shake", {times:2}, 500 );
            //and stores how many times the user has done this
            badMovieCount++;
            //if it's the first, second or third time, A.I changes speech
            if (badMovieCount ==1)
            responsiveVoice.speak("Bad bad bad bad choice. You humans are so predictable");
            else if (badMovieCount ==2)
            responsiveVoice.speak("Seriously, Again? You don't see anything better?");
            else if (badMovieCount == 3)
            responsiveVoice.speak("Be careful, my patience has its limits. I want you to think hard about what you should be watching");
            //if it's more than that, AI triggers the shutting off of the screen
            else if (badMovieCount > 3)
            window.location = "turnOff/index.html";
        }
        //if the movies are good ones (i.e the ones the A.I made)
        else
        {
            //gives a little comment depending on how much time it took the user to pick it
            if (badMovieCount ==1) {
            responsiveVoice.speak("Now you see? This is a very good good choice!");
            }
            else if (badMovieCount ==2) {
            responsiveVoice.speak("Now you are being reasonable. This is so much better!");
            }
            else if (badMovieCount == 3) {
            responsiveVoice.speak("Thank god (or me!). You humans are so slow to understand what we want of you");
            }
            else {
            responsiveVoice.speak("Good Choice");
        	}
        	//but in anycase, triggers then the animatrix movie for the humans to watch
        	window.location = "movie-ai/animatrix.html";
        }
    }); 			 /**            End of Jquery           **/
}


//resets the sliders given to be empty
function resetTheSlider(firstSlider, secondSlider, thirdSlider) {
	//empties each slider
	firstSlider.innerHTML = "_";
	secondSlider.innerHTML = "_";
	thirdSlider.innerHTML = "_";
	//and resets their class names to not be initialized
	firstSlider.className = "center slider";
	secondSlider.className = "center slider";
	thirdSlider.className = "center slider";
}

//fills the displayArray with movies according to the color values given by the camera
function pickMovies()
{	
	//resets the array to be empty
	displayArray = [];
	
	//so that the chosen movies are randomized each time within their array, 
	//without being able to pick the same movie twice, get a swapped index to pick the movies in each category
	
	//here we get a smaller index, only for the six movies made by the A.I
	var shortSwappedIndex = getSwappedIndex(6);
	
	//for the amount of movies needed of this type of movie (see checkValues() to understand how amounts are calculated)
	for (var i = 0; i < amountsArray[0]; i++) 
	{
		//takes the index of the swapped array
		var pickedMovie = shortSwappedIndex[i];
		//and picks the movies in that specific type's array (here A.I)
		displayArray.push(typeArray[0][pickedMovie]);
	}
	
	//based on the same logic, do exactly the same for the remaining styles (each of them having 30 different choices)
	
    //so for the amounts needed for each category ([1] is pink, [2] is red, [3] is blue/green, [4] is yellow, [5] is black)
    for (var i = 1; i < amountsArray.length; i++)
    {
    	//gets a randomly swapped index array
        var swappedIndex = getSwappedIndex(30);
		
		//and for each amount needed stored in amountsArray
        for (var j = 0; j < amountsArray[i]; j++)
        {
        	//picks the movies according to the random swapped index
            var pickedMovie = swappedIndex[j];
            //and adds them in the Array to be displayed
            displayArray.push(typeArray[i][pickedMovie]);
		}
	}
}


//swapps an initial index to have a random one (but not repeating in any way)
function getSwappedIndex(wantedLength) {
	//creates a new array
	var mySwappArray = [];
	//populates it with a regular index from 0 to the wantedLength
	for (var i = 0; i < wantedLength; i++) {
		mySwappArray[i] = i;
	}
	//then, for this array's length
	for (var j = 0; j < mySwappArray.length; j++) {
	//randomly picks an index to be swapped with the jth one
	var randomIndex = int(random(mySwappArray.length));
	//stores its index to a temporary variable
	var tempValue = mySwappArray[randomIndex];
	//and swapps the random index with the jth one
	mySwappArray[randomIndex] =  mySwappArray[j];
	mySwappArray[j] = tempValue;
	}
	//returns a swapped index to be used of the wanted length
	return mySwappArray;
}

//checks the color values given by the camera, 
//and calculates the amounts of each type of movies to be displayed
function checkValues() {

	//retrieve the values given in the color values array
	var pinkValue = myColorValues[0];
	var redValue = myColorValues[1];
	var blueValue = myColorValues[2];
	var greenValue = myColorValues[3];
	var yellowValue = myColorValues[4];
	var blackValue = myColorValues[5];
	
	//calculates a total, adding all the different colors values given to be able to map the values 
	//to the number of movies needed to be displayed (here 30)
	//adding +1 is just to insure that the A.I amount (given by the "rest" of the color values over 30 is always at least 1)
	var totalValues = pinkValue + redValue + blueValue + greenValue + yellowValue + blackValue + 1;
	
	//calculates the amount of each type of movie needed to be displayed, according to its color value
	//and makes it proportional to the total values, over 30 movies to be displayed.
	amountsArray[1] = int(pinkValue/totalValues*30); 	//pink value for girly movies	
	amountsArray[2] = int(redValue/totalValues*30);		//red value for horror movies
	amountsArray[3] = (int(blueValue/totalValues*30)+int(greenValue/totalValues*30)); //blue and green values for nature movies
	amountsArray[4] = int(yellowValue/totalValues*30); 	//yellow value for childish movies
	amountsArray[5] = int(blackValue/totalValues*30);	//black value for action movies
	
	//calculates a the new obtained total of movies chosen (on the 30 to be displayed)
	//(here for some reason javascript does not work if adding them using the amountsArray (amountsArray[1] + amountsArray[2]+...) )
	var newTotal = int(pinkValue/totalValues*30)+int(redValue/totalValues*30)+(int(blueValue/totalValues*30)+int(greenValue/totalValues*30))+int(yellowValue/totalValues*30)+int(blackValue/totalValues*30);
	
	//because we round the values, and because we added +1 earlier, we can now calculate how many movies we are missing
	//to have a total of 30 movies
	amountsArray[0] = 30 - newTotal;
}


/********************           CLASS OF TYPE OBJECTS         ********************/


//class object to create different types of movie, holding each an image and a status
function createType(myMoviestatus, incomingImage) {

	this.img = incomingImage; //gets and stores the movie poster
  	this.status = myMoviestatus; //same for status (good or bad)
};
