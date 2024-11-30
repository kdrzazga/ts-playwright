class Petscii{
    static TRIANGLE_LEFT = 0;
}

function play() {
  var audio = new Audio('carols.mp3');
  audio.play();
  setInterval(function() {
    audio.play();
  }, 50037);
  console.log('Music started.');
}

function hide(){
	var button = document.getElementById('start-tune');
	button.hidden = true;
	console.log('Button hidden.');
}

function startPlayback(){
  const alreadyPlaying = sessionStorage.getItem('carols-playing');
  if (alreadyPlaying !== 'true'){
	  sessionStorage.setItem('carols-playing', 'true');
	  play();
  }
}




function smoothScroll() {
    y += step * direction;
    
    if (y >= document.body.scrollHeight - window.innerHeight || y <= 0) {
        direction *= -1;
    }
    
    window.scrollTo(0, y);
    requestAnimationFrame(smoothScroll);
}

document.addEventListener('DOMContentLoaded', function() {
    let spans = document.querySelectorAll('span[name="slash"]');
    spans.forEach((span, index) => {
        span.innerText = String.fromCharCode(0x25e2);
    });

    const step = window.innerHeight / 300;
    let y = 0;
    let direction = 1;

    console.log("Merry Christmas !");
    //smoothScroll();

});

