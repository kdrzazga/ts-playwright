function play() {
  var audioArray = [
    ['resources/LN1wastelands.mp3', (2 * 60 + 0) * 1000, 'LAST NINJA 1 - WASTELANDS'],//2	
    ['resources/wilderness.mp3', (4 * 60 + 40) * 1000, 'WILDERNESS'],//4
    ['resources/BB.mp3', (1 * 60) * 1000, 'BUBBLE BOBBLE'],
    ['../commando64/resources/commando.mp3', (4 * 60 + 40) * 1000, 'COMMANDO (piano version)'],  //4
    ['resources/fst.mp3', (1 * 42) * 1000, 'FST'],
    ['resources/supremacy.mp3', (4 * 60) * 1000, 'SUPREMACY'],//4
    ['resources/LN2.mp3', (4 * 60 + 40) * 1000, 'LAST NINJA 2'],//4
    ['resources/natoAC.mp3', (3 * 60 + 15) * 1000, 'NATO ASSAULT COURSE'],//3
    ['../ik64/resources/ik.mp3', (10 * 60 + 50) * 1000, 'INTERNATIONAL KARATE'],//10
    ['resources/mikie.mp3', (1 * 45) * 1000, 'MIKIE']
  ];

  var currentAudio = 0;
  var audio = new Audio(audioArray[currentAudio][0]);

  function playAudio() {
    audio.src = audioArray[currentAudio][0];
    var tuneTitle = document.getElementById('bottom-border');
    tuneTitle.innerText = 'Playing track: ' + audioArray[currentAudio][2];
    setTimeout(() => {
      tuneTitle.innerText = '';
    }, 6500);

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

function hide() {
  var button = document.getElementById('start-tune');
  button.hidden = true;
  console.log('Button hidden.');
}

function startPlayback(){
  const alreadyPlaying = sessionStorage.getItem('already-playing');
  if (alreadyPlaying !== 'true'){
	  sessionStorage.setItem('already-playing', 'true');	
	  play();
  }
}
