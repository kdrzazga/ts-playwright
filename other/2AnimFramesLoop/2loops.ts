const a1Max = 4;
var anim1counter = a1Max;
const a2Max = 5;
var anim2counter = a2Max;
const ia2Max = 2;
var internalAnim2counter = ia2Max;
var animationFrameID = null;
var internalAnimFrameID = null;

async function anim1() {
  try {
    while (anim1counter > 0) {
      console.log("anim1 " + anim1counter);
      anim1counter--;
      await new Promise(resolve => setTimeout(resolve, 300)); // simulate delay
    }
    console.log("anim1 finished");
	anim1counter = a1Max;
    await anim2();
  } catch (error) {
    console.error(error);
  }
}

async function anim2() {
  try {
    while (anim2counter > 0) {
      console.log("anim2 " + anim2counter);
      await internalAnim2();
      anim2counter--;
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    console.log("anim2 finished");
	anim2counter = a2Max;
    await anim1();
  } catch (error) {
    console.error(error);
  }
}

async function internalAnim2() {
  try {
    while (internalAnim2counter > 0) {
      console.log("anim2 - internal anim " + internalAnim2counter);
      internalAnim2counter--;
      await new Promise(resolve => setTimeout(resolve, 300));
    }
	console.log("internal anim finished");
    internalAnim2counter = ia2Max;
  } catch (error) {
    console.error(error);
  }
}

anim1();
