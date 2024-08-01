function play() {
  var audioArray = [
    ['../commando64/resources/commando.mp3', (4 * 60 + 40) * 1000, 'Commando'],
    ['resources/BB.mp3', (1 * 45) * 1000, 'Bubble Bobble'],
    ['resources/fst.mp3', (1 * 42) * 1000, 'FST'],
    ['resources/supremacy.mp3', (4 * 60) * 1000, 'Supremacy'],
    ['resources/LN2.mp3', (4 * 60 + 40) * 1000, 'Last Ninja 2'],
    ['resources/wilderness.mp3', (4 * 60 + 40) * 1000, 'Wilderness'],
    ['resources/natoAC.mp3', (3 * 60 + 15) * 1000, 'NATO Assault Course'],
    ['resources/LN1wastelands.mp3', (2 * 60 + 0) * 1000, 'Last Ninja 1 - Wastelands'],
    ['../ik64/resources/ik.mp3', (10 * 60 + 50) * 1000, 'International Karate'],
    ['resources/mikie.mp3', (1 * 45) * 1000, 'Mikie']
  ];

  var currentAudio = 0;
  var audio = new Audio(audioArray[currentAudio][0]);

  function playAudio() {
    audio.src = audioArray[currentAudio][0];
    var tuneTitle = document.getElementById('bottom-border');
    tuneTitle.innerText = audioArray[currentAudio][2];
    setTimeout(() => {
      tuneTitle.innerText = '';
    }, 4500);

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
