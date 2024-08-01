function play() {
  var audioArray = [
    ['../commando64/resources/commando.mp3', (4*60+40)*1000],
    ['resources/BB.mp3', (1*45)*1000],
	['resources/fst.mp3', (1*42)*1000],	
	['resources/supremacy.mp3', (4*60)*1000],
	['resources/LN2.mp3', (4*60+40)*1000],
	['resources/wilderness.mp3', (4*60+40)*1000],
    ['resources/natoAC.mp3', (3*60+15)*1000],
    ['resources/LN1wastelands.mp3', (2*60+0)*1000],
    ['../ik64/resources/ik.mp3', (10*60+50)*1000],
    ['resources/mikie.mp3', (1*45)*1000]
  ]; //almost 40 min of music

  var currentAudio = 0;
  var audio = new Audio(audioArray[currentAudio]);

  function playAudio() {
    audio.src = audioArray[currentAudio][0];
    audio.play();
	const now = Date.now();
	const formattedTimestamp = new Date(now).toISOString();
	console.log(`${formattedTimestamp} Music started - ${audioArray[currentAudio][0]} duration: ${audioArray[currentAudio][1]}`);
	
	setTimeout(() => {
      currentAudio = (currentAudio + 1) % audioArray.length;
      playAudio();
    }, audioArray[currentAudio][1]);
  }

  playAudio();
}


function hide(){
	var button = document.getElementById('start-tune');
	button.hidden = true;
	console.log('Button hidden.');
}
