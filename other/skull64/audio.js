function play() {
  var audioArray = [
	['resources/supremacy.mp3', (4*60+10)*1000],
	['resources/LN2.mp3', (4*60+40)*1000],
	['resources/wilderness.mp3', (4*60+40)*1000],
    ['../commando64/resources/commando.mp3', (8*60+40)*1000],
    ['resources/natoAC.mp3', (3*60+15)*1000],
    ['resources/LN1wasteland.mp3', (4*60+0)*1000],
    ['../ik64/resources/ik.mp3', (10*60+50)*1000],
    ['resources/BB.mp3', (1*60+20)*1000],
    ['resources/mikie.mp3', (1*60+20)*1000]
  ]; //over 40 min of music

  var currentAudio = 0;
  var audio = new Audio(audioArray[currentAudio]);

  function playAudio() {
    currentAudio = (currentAudio + 1) % audioArray.length;
    audio.src = audioArray[currentAudio][0];
    audio.play();
	const now = Date.now();
	const formattedTimestamp = new Date(now).toISOString();
	console.log(`${formattedTimestamp} Music started - ${audioArray[currentAudio][0]} duration: ${audioArray[currentAudio][1]}`);
  }

  playAudio();
  setInterval(playAudio, audioArray[currentAudio][1]);  
}


function hide(){
	var button = document.getElementById('start-tune');
	button.hidden = true;
	console.log('Button hidden.');
}
