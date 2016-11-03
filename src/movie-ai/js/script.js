/*

Code based on:

CART 351
Beach Party

Author: Pippin Barr

A "simple" application of jQuery UI's .draggable() and .resizable() to create
a beach party on a totally Tubular beach. Basic concept is simple, but adds
some UI niceties and ties a few ideas together (sound, Tubular backround video
drag and (conditional) resize).


Reused into:

CART 351 – Networks & Navigation
	Assignment 03 - Evil A.I
	Fictional Netminded (Evil Netflix) webpage 
	
	Here jquery to make the user watch Animatrix full screen with no capacity to stop

	Authors: 	this part was mainly coded by Marie Pontais (unless notified otherwise)
				Group members: Seva Ivanov & Daniel Munoz Ortiz

	see https://sevaivanov.github.io/netminded/ to browse the final version of the project
	see www.mariepontaiscart351.wordpress.com for credits & process documentation 

*/

$(document).ready(function() {

  // Set up the music
  // First we get a reference to the audio element with the music in it
  var element = document.getElementById('sound');
  // Then we pause it (so we can check if it's paused later)
  element.pause();

  // We use Tubular to play our beach movie. Nothing fancy.
  $('#wrapper').tubular({
    videoId: 'L0K6Cb1ZoG4'
  });
  
  handleMusic();
});


// Called when the user stops resizing an element...
function handleMusic () {
  // Get the element on the page that is the audio tag
  var element = document.getElementById('sound');
  // If it's currently paused, we should start it
  if (element.paused) {
    // We want it to be half volume
    element.volume = 0.4;
    // Now we play it.
    element.play();
  }
}
