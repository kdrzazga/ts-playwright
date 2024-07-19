var audio = new Audio('../commando64/resources/commando.mp3');

function play() {
  var audioArray = [
    '../commando64/resources/commando.mp3',
    '../ik64/resources/ik.mp3',
  ];

  var currentAudio = 0;
  var audio = new Audio(audioArray[currentAudio]);

  function playAudio() {
    audio.play();
    currentAudio = (currentAudio + 1) % audioArray.length;
    audio.src = audioArray[currentAudio];
    audio.play();
  }

  playAudio();
  setInterval(playAudio, (10*60+40)*1000);
  console.log('Music started.');
}


function hide(){
	var button = document.getElementById('start-tune');
	button.hidden = true;
	console.log('Button hidden.');
}
