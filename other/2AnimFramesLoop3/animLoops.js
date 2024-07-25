var a1Max = 4;
var anim1counter = a1Max;
var a2Max = 5;
var anim2counter = a2Max;
var ia2Max = 7;
var internalAnim2counter = ia2Max;
var animationFrameID = null;
var internalAnimFrameID = null;
var finished = false;
var internalFinished = false;
function anim1(callback) {
    function step() {
        if (!finished) {
            setTimeout(function () {
                console.log("a1 execution " + anim1counter);
                var div = document.getElementsByTagName('img')[0];
                div.setAttribute("src", "resources/bgnd.png");
                anim1counter--;
                finished = anim1counter <= 0;
                window.requestAnimationFrame(step);
            }, 1100);
        }
        else {
            if (callback)
                callback();
        }
    }
    window.requestAnimationFrame(step);
}
function anim2(callback) {
    function step() {
        if (!finished) {
            setTimeout(function () {
                console.log("a2 execution " + anim2counter);
                var div = document.getElementsByTagName('img')[0];
                div.setAttribute("src", "resources/plane.png");
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
            if (callback)
                callback();
        }
    }
    window.requestAnimationFrame(step);
}
function internalAnim2(callback) {
    function step() {
        if (!internalFinished) {
            setTimeout(function () {
                console.log("ia2 execution " + internalAnim2counter);
                var div = document.getElementsByTagName('img')[0];
                div.setAttribute("src", "resources/plane2.png");
                div.style.left = new String(5 * ia2Max - 5 * internalAnim2counter) + 'px';
                console.log(div.style.left);
                internalAnim2counter--;
                internalFinished = internalAnim2counter <= 0;
                window.requestAnimationFrame(step);
            }, 200); // add a delay of 0.5 seconds
        }
        else {
            if (callback)
                callback();
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
