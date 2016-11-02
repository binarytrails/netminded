/*



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
