/*

	CART 351 – Networks & Navigation
	Assignment 03 - Evil A.I
	Fictional Netminded (Evil Netflix) webpage 
	
	Here javascript file (using p5) to mimic a turn off the screen by the A.I:
	Animates a white square on a black background

	Authors: 	this part was mainly coded by Marie Pontais (unless notified otherwise)
				Group members: Seva Ivanov & Daniel Munoz Ortiz

	see https://sevaivanov.github.io/netminded/ to browse the final version of the project
	see www.mariepontaiscart351.wordpress.com for credits & process documentation 
	
																							*/

/********************           GLOBAL VARIABLES          ********************/
	
  //holds the proportions of the white square
  var mySquareHeight;
  var mySquareWidth;
  
  //holds the bip sound to be played
  var turnOffSound;
  
  //holds a boolean to know if the sound has already been played or not
  var notPlayed = true;
  
  /********************          BUILT - IN FUNCTIONS         ********************/

//loads the sound before doin anything
function preload() {
  turnOffSound = loadSound("sound/offSound.mov");
}

//initializes the needed values
function setup() {
	//creates a canvas the size of the screen
  	createCanvas(windowWidth, windowHeight);
  	//sets background to black
  	background(0, 0, 0);
  	//sets the initial size of the square to be the window's too
  	mySquareHeight = windowHeight;
  	mySquareWidth = windowWidth;
}

//loops 
function draw() {
	//play sound if not done already
  	if (notPlayed) {
  		turnOffSound.play();
  		notPlayed = false;
  	}
  	//redraws background
  	background(0,  0, 0);
  	//sets the rect to be white
  	fill(255, 255, 255);
  	//and its coordinates to center
  	rectMode(CENTER);
  	//draws the rect
  	rect(width/2, height/2, mySquareWidth, mySquareHeight);
  	//stores the time passed
  	time = millis();
  	//and decreases the rect size according to it
  	if (int(time%1) == 0) {
    	mySquareHeight -= mySquareHeight/3;
     	mySquareWidth -= mySquareWidth/3;
  	} 
}


//if user presses the space-bar, gets redirected to the logging page
function keyPressed() {
  if (keyCode = 32) {
    window.location = "../first.html"
  }
}
