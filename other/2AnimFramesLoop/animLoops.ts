const a1Max = 4;
var anim1counter = a1Max;
const a2Max = 5;
var anim2counter = a2Max;
const ia2Max = 200;
var internalAnim2counter = ia2Max;
var animationFrameID = null;
var internalAnimFrameID = null;

var x = 0;

async function anim1() {
  try {
    while (anim1counter > 0) {
	  const pic = document.getElementById("pic");
	  pic.setAttribute("src", "resources/bgnd.png");
      anim1counter--;
      await new Promise(resolve => setTimeout(resolve, 1300)); // simulate delay
    }
	anim1counter = a1Max;
    await anim2();
  } catch (error) {
    console.error(error);
  }
}

async function anim2() {
  try {
    while (anim2counter > 0) {	
	  const pic = document.getElementById("pic");
	  pic.setAttribute("src", "resources/plane.png");
      await internalAnim2();
      anim2counter--;
      await new Promise(resolve => setTimeout(resolve, 1300));
    }
	anim2counter = a2Max;
    await anim1();
  } catch (error) {
    console.error(error);
  }
}

async function internalAnim2() {
  const pic = document.getElementById("pic");
  var animHandle = null;
  try {
    while (internalAnim2counter > 0) {
      internalAnim2counter--;
	  x++;
	  pic.style.left = new String(x) + 'px';
	  animHandle = requestAnimationFrame(() => internalAnim2());
      await new Promise(resolve => setTimeout(resolve, 10));
	  
    }
	
	cancelAnimationFrame(animHandle);
	x = 0;
	pic.style.left = "0px";
    internalAnim2counter = ia2Max;
  } catch (error) {
    console.error(error);
  }
}

anim1();
