const a1Max = 4;
var anim1counter = a1Max;
const a2Max = 5;
var anim2counter = a2Max;
const ia2Max = 2;
var internalAnim2counter = ia2Max;
var animationFrameID = null;
var internalAnimFrameID = null;

function anim1() {
    console.log("anim1");
    if (anim1counter > 0) {
            animationFrameID = requestAnimationFrame(() => {
                anim1();
                
            });
        anim1counter--;
    } else {
		cancelAnimationFrame(animationFrameID);
		anim1counter = a1Max;
        anim2();
    }
}

function anim2() {
    console.log("anim2");
    internalAnim2();
    if (anim2counter > 0) {
            animationFrameID = requestAnimationFrame(() => {
                anim2();                
            });
        
        anim2counter--;
    } else {
		anim2counter = a2Max;
		cancelAnimationFrame(animationFrameID);
		
        anim1();
    }
}

function internalAnim2() {
    console.log("anim2 - internal anim");
    if (internalAnim2counter > 0) {
            internalAnimFrameID = requestAnimationFrame(() => {
                internalAnim2();
            });
        internalAnim2counter--;
    } else {
        internalAnim2counter = ia2Max;
        cancelAnimationFrame(internalAnimFrameID);
    }
}

anim1();
