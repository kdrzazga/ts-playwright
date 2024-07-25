const a1Max = 4;
var anim1counter = a1Max;
const a2Max = 5;
var anim2counter = a2Max;
const ia2Max = 2;
var internalAnim2counter = ia2Max;
var animationFrameID = null;
var internalAnimFrameID = null;

var finished = false;
var internalFinished = false;

function anim1(callback) {
    function step() {
        if (!finished) {
            setTimeout(() => {
                console.log("a1 execution " + anim1counter);
                anim1counter--;
                finished = anim1counter <= 0;
                window.requestAnimationFrame(step);
            }, 1100);
        }
        else {
            if (callback) callback();
        }
    }
    window.requestAnimationFrame(step);
}

function anim2(callback) {
    function step() {
        if (!finished) {
            setTimeout(() => {
                console.log("a2 execution " + anim2counter);
                anim2counter--;
                finished = anim2counter <= 0;
                internalAnim2counter = ia2Max;
                internalAnim2(function () {
                    console.log("internalAnim2 done.");
                });
                internalFinished = false;
                window.requestAnimationFrame(step);
            }, 2000); // add a delay of 2 seconds
        }
        else {
            if (callback) callback();
        }
    }
    window.requestAnimationFrame(step);
}

function internalAnim2(callback) {
    function step() {
        if (!internalFinished) {
            setTimeout(() => {
                console.log("ia2 execution " + internalAnim2counter);
                internalAnim2counter--;
                internalFinished = internalAnim2counter <= 0;
                window.requestAnimationFrame(step);
            }, 200); // add a delay of 0.5 seconds
        }
        else {
            if (callback) callback();
        }
    }
    window.requestAnimationFrame(step);
}

anim1(function () {
    console.log("Done. Now it's time for anim2");
    finished = false;
    anim2(function () {
        console.log("anim2 done.");
    });
});