  var mySquareHeight;
  var mySquareWidth;
  
  var turnOffSound;
  var notPlayed = true;
  
function preload() {
  turnOffSound = loadSound("sound/offSound.mov");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);
  mySquareHeight = windowHeight;
  mySquareWidth = windowWidth;
}

function draw() {
  if (notPlayed) {
  turnOffSound.play();
  notPlayed = false;
  }
  background(0,  0, 0);
  //fill(255, 255, 255);
  rectMode(CENTER);
  rect(width/2, height/2, mySquareWidth, mySquareHeight);
  time = millis();
  console.log(int(time%5))
  if (int(time%1) == 0) {
    mySquareHeight -= mySquareHeight/3;
     mySquareWidth -= mySquareWidth/3;
  } 
}


function keyPressed() {
  if (keyCode = 32) {
    window.location = "../first.html"
  }
}