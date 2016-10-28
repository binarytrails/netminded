var typeArray = [];

var girlyArray =[];
var horrorArray =[];
var natureArray = [];
var childishArray = [];
var actionArray = [];
var AIArray = [];

var displayArray = [];
var numbHistory = [];


var girlyTitles = [
  	"No Strings Attached (2011)",
    "Mean girls (2004)",
    "10 things I hate about you (1999)",
    "Pitch Perfect (2012)",
    "The back up plan (2010)",
    "The hunger games (2012)",
    "Easy A (2010)",
    "The princess Diary (2001)",
    "Juno (2007)",
    "Grease (1978)",
    "Grease 2 (1982)",
    "The fault in our Stars (2014)",
    "She's the Man (2006)",
    "Spy (2015)",
    "Bridget Jones Diary",
    "Brides War (2009)",
    "Mama Mia! (2008)",
    "Dear John (2010)",
    "How to lose a guy in 10 days (2003)",
    "The Other Woman (2014)",
    "Pretty Woman (1990)",
    "50 first Dates (2004)",
    "Notting Hill (1999)",
    "Love Actually (2003)",
    "Valentine's Day (2010)",
    "Legally Blonde (2001)",
    "13 going on 30 (2004)",
    "Confession of a ShopAholic (2009)",
    "The Last Song (2010)",
    "17 Again (2009)",
  ];
  
  var horrorTitles = [
  	"The Shining (1980)",
  	"The Exorcist (1973)",
  	"Jaws (1975)",
  	"Alien (1979)",
  	"The Texas Chain Saw Massacre (1974)",
  	"Nosferatu (1922)",
  	"Night Of The Living Dead (1968)",
  	"Psycho (1960)",
  	"The Silence of the Lambs (1991)",
  	"Audition (1999)",
  	"The Cabinet of Dr. Caligari (1920)",
  	"Halloween (1978)",
  	"Freaks (1932)",
  	"The Fly (1986)",
  	"Rosemary's Baby (1968)",
  	"Dawn of The Dead (2004)",
  	"Evil Dead 2 (1987)",
  	"Bride of Frankenstein (1935)",
  	"A Nightmare on Elm Street (1984)",
  	"Invasion of the Body Snatchers (1956)",
  	"The Blair Witch Project (1999)",
  	"Scream (1996)",
  	"28 Days Later (2002)",
  	"Dracula (1992)",
  	"Don't Look Now (1973)",
  	"Repulsion (1965)",
  	"Suspiria (1977)",
  	"Shaun of the Dead (2004)",
  	"Friday the 13th (1980)", 
  	"Sinister (2012)", 	
  ]
  
var natureTitles = [
	"Planet Earth (2007)",
	"Hidden Kingdoms (2014)",
	"The Blue Planet (2001)",
	"Mysteries of the Unseen World (2013)",
	"Cosmos: A Spacetime Odyssey (2014)",
	"Honey Bagders: Masters of Mayhem (2014)",
	"Brain Games (2011)",
	"Particle Fever (2013)",
	"Microcosmos (1996)",
	"DamNation (2014)",
	"Pelican Dreams (2014)",
	"Blackfish (2013)", 
	"The Cove (2009)",
	"Grizzly Man (2005)",
	"Earthlings (2005)",
	"March of the Penguins (2005)", 
	"Cowspiracy: The Sustainability Secret (2014)",
	"Winged Migration (2001)",
	"The last Lions (2011)",
	"Born to Be Wild (2011)",
	"The Crimson Wing: Mystery of the Flamingos (2008)",
	"Bears (2014)",
	"The Elephant in the Living Room (2010)",
	"Wings of Life (2011)",
	"The Last Giants (2009)",
	"I am an Animal (2007)",
	"Food Inc (2008)",
	"Green (2012)",
	"Vanishing of the Bees (2009)",
	"Maximum tolerated dose (2012)",		
]

var childishTitles = [
	"Hugo (2011)",
	"Brave (2012)",
	"The Emperor's New Groove (2000)",
	"Howl's Moving Castle (2004)",
	"Pocahontas (1995)",
	"Mathilda (1996)",
	"Home Alone (1990)",
	"Ratatouille (2007)",
	"The Jungle Book (2016)",
	"Zootopia (2016)",
	"Mulan (1998)",
	"Inside Out (2015)",
	"Tangled (2010)",
	"The Sound of Music (1965)",
	"WALL-E (2008)",
	"How to train your Dragon (2010)",
	"Spirited Away",
	"Aladdin (1992)",
	"Frozen (2013)",
	"The little Mermaid (1989)",
	"Mary Poppins (1964)",
	"The Lion King (1994)",
	"Beauty and the Beast (1991)",
	"Finding Nemo (2003)",
	"Up (2009)",
	"Toy Story (1995)",
	"The Incredibles (2004)",
	"Chicken Run (2000)",
	"Monsters, Inc (2001)",
	"Princess Mononoke (1999)",
]
	
var actionTitles = [
	"The Dark Knight (2008)",
	"Terminator 2: Judgment Day (1991)",
	"The Matrix (1999)",
	"Casino Royale (2006)",
	"Mad Max: Fury Road (2015)",
	"The Bourne Ultimatum (2007)",
	"Inception (2010)",
	"Gladiator (2000)",
	"Aliens (1986)",
	"Skyfall (2012)",
	"Iron Man (2008)",
	"Deadpool (2016)",
	"The Avengers (2012)",
	"Guardians of the galaxy (2014)",
	"American Sniper (2014)",
	"Avatar (2009)",
	"Batman Begins (2005)",
	"Star trek (2009)",
	"X-men (2000)",
	"Kill Bill (2003)",
	"300 (2006)",
	"13 Assassins (2010)",
	"Man on Fire (2004)",
	"V for Vendetta (2005)",
	"Hellboy (2004)",
	"Spider-Man (2002)",
	"Minority Report (2002)",
	"Ip Man (2008)",
	"House of the flying Daggers (2004)",
	"Mesrine Part 1: Killer Instinct (2008)",
]

var AITitles = [
	"My A.I film",
	"My A.I film 2",
	"My A.I film 3",
	"My A.I film 4",
	"My A.I film 5",
	"My A.I film 6",
	"My A.I film",
	"My A.I film 2",
	"My A.I film 3",
	"My A.I film 4",
	"My A.I film 5",
	"My A.I film 6",
	"My A.I film",
	"My A.I film 2",
	"My A.I film 3",
	"My A.I film 4",
	"My A.I film 5",
	"My A.I film 6",
	"My A.I film",
	"My A.I film 2",
	"My A.I film 3",
	"My A.I film 4",
	"My A.I film 5",
	"My A.I film 6",
	"My A.I film",
	"My A.I film 2",
	"My A.I film 3",
	"My A.I film 4",
	"My A.I film 5",
	"My A.I film 6",
]
  
  var currentMovie = 0;
  var currentType = 0;
  var myColorValues = [];
  
  var amountsArray = [];

function preload() {
	for (var i = 0; i < 30; i++) {
		girlyArray[i] = new createType(girlyTitles[i],loadImage("girly/"+ i + ".jpg"));
		horrorArray[i] = new createType(horrorTitles[i],loadImage("horror/"+ i + ".jpg"));
		natureArray[i] = new createType(natureTitles[i],loadImage("nature/"+ i + ".jpg"));
		childishArray[i] = new createType(childishTitles[i],loadImage("childish/"+ i + ".jpg"));
		actionArray[i] = new createType(actionTitles[i],loadImage("action/"+ i + ".jpg"));
		AIArray[i] = new createType(AITitles[i], loadImage("AI.png")); 
	}
	
/****************	supposed values given by SEVA  *******************/
	
	
	myColorValues = [
		60, //pink
		0,	//red
		10,	//blue
		20,	//green
		0,	//yellow
		0,	//black
	]
	
/****************								  *******************/	
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	typeArray = [
	girlyArray,
	horrorArray,
	natureArray,
	childishArray,
	actionArray,
	AIArray,
	];
	checkValues(myColorValues);
	pickMovies();
  
}

function draw() {
	background(255, 255, 255);
	image(displayArray[currentMovie].img, 20, 20, girlyArray[2].img.width/4, girlyArray[2].img.height/4);
	text(displayArray[currentMovie].title, width/2, 20);
}


function pickMovies() {
	for (var i = 0; i < amountsArray.length; i++) {
		var swappedIndex = getSwappedIndex();
		for (var j = 0; j < amountsArray[i]; j++) {
		var pickedMovie = swappedIndex[j];
		console.log(pickedMovie);
		displayArray.push(typeArray[i][pickedMovie]);
		}
	}
}

function getSwappedIndex() {
	var mySwappArray = [];
	for (var i = 0; i < 29; i++) {
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
	
	var pinkValue = myValueArray[0];
	var redValue = myValueArray[1];
	var blueValue = myValueArray[2];
	var greenValue = myValueArray[3];
	var yellowValue = myValueArray[4];
	var blackValue = myValueArray[5];
	
	var totalValues = pinkValue + redValue + blueValue + greenValue + yellowValue + blackValue + 1;
	
	amountsArray[0] = int(pinkValue/totalValues*30);
	amountsArray[1] = int(redValue/totalValues*30);
	amountsArray[2] = (int(blueValue/totalValues*30)+int(greenValue/totalValues*30));
	amountsArray[3] = int(yellowValue/totalValues*30);
	amountsArray[4] = int(blackValue/totalValues*30);	
	var newTotal = int(pinkValue/totalValues*30)+int(redValue/totalValues*30)+(int(blueValue/totalValues*30)+int(greenValue/totalValues*30))+int(yellowValue/totalValues*30)+int(blackValue/totalValues*30);
	amountsArray[5] = 30 - newTotal;
	console.log("the total: "+ newTotal);
}

// When the window is resized, changes the canvas' size to match it
function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  	if (keyCode == UP_ARROW){
  		if (currentMovie < 29)
  		currentMovie ++;
  		else 
  		currentMovie = 0;
  		//console.log(currentMovie);
  	}
  	if (keyCode == DOWN_ARROW){
  		if (currentMovie > 0)
  		currentMovie --;
  		else 
  		currentMovie = 29;
  	}		
  }

// create different types of movie classes
function createType(myMovieTitle, incomingImage) {

  this.img = incomingImage;
  this.title = myMovieTitle;
  
};
