var counter = 3;
const counterMax = 3;

let contentCounterMax = 800;
var currentCounter = contentCounterMax;

let currentUrlDisplay = 0;

function play() {
    var audio = new Audio('files/carols.mp3');
    audio.play();
    setInterval(function() {
        audio.play();
    }, 11037);
    console.log('Music started.');
}

function startPlayback() {
    const alreadyPlaying = sessionStorage.getItem('carols-playing');
    if (alreadyPlaying !== 'true') {
        sessionStorage.setItem('carols-playing', 'true');
        play();
    }
}

function moveSanta1() {
    var santa1 = document.getElementById('santa1');
    santa1.style.left = (parseInt(santa1.style.left) + 6) + 'px';
    santa1.style.top = (parseInt(santa1.style.top) + 1) + 'px';
}

function conditionalSanta1Reset() {
    var santa1 = document.getElementById('santa1');
    if (parseInt(santa1.style.left) > 3000) {
        santa1.style.left = '-300px';
        santa1.style.top = '200px';
    }
}

function flipIframeSource() {
    const iframe = document.querySelector('iframe');
    const urls = {
        'snowman': {
                    'url': 'files/snowman1.html',
                    'delay': 1000
                },
        'tree': {
            'url': 'files/choinka.html',
            'delay': 800
        },

        'presents': {
            'url': 'files/presents.html',
            'delay': 600
        },
        'santa': {
            'url': 'files/sleigh.html',
            'delay': 2600
        }
    };

    const keys = Object.keys(urls);
    const currentKey = keys[currentUrlDisplay];
    const currentUrl = urls[currentKey].url;
    currentCounter = urls[currentKey].delay;

    iframe.src = currentUrl;

    currentUrlDisplay = (currentUrlDisplay + 1) % keys.length;
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} ${currentUrl} is to be displayed for ${currentCounter} loop cycles.`)
}

function conditionalIframeChange() {
    currentCounter--;
    if (currentCounter < 0) {
        currentCounter = contentCounterMax;
        flipIframeSource();
    }
}

function timeLoop() {
    var lastRenderTime = performance.now();

    function loop() {
        var currentTime = performance.now();
        var timeSinceLastRender = currentTime - lastRenderTime;
        if (timeSinceLastRender >= 10) {
            conditionalIframeChange();
            if (counter < 0) {
                moveSanta1();
                conditionalSanta1Reset();
                counter = counterMax;
                lastRenderTime = currentTime;
            } else {
                counter--;
            }
        }
        requestAnimationFrame(loop);
    }
    loop();
}

timeLoop();
