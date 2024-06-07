function play() {
  var audio = new Audio('resources/commando.mp3');
  audio.play();
  setInterval(function() {
    audio.play();
  }, 8130);
  console.log('Music started.');
}

function hide(){
	var button = document.getElementById('start-tune');
	button.hidden = true;
	console.log('Button hidden.');
}
