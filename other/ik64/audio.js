function play() {
  var audio = new Audio('resources/ik.mp3');
  audio.play();
  setInterval(function() {
    audio.play();
  }, 10037);
  console.log('Music started.');
}

function hide(){
	var button = document.getElementById('start-tune');
	button.hidden = true;
	console.log('Button hidden.');
}
