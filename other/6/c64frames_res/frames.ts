let counter = 3;
const counterMax = 3;

function moveBruceLee(){
	const bruce = document.getElementById('bruce');
	bruce.style.left = (parseInt(bruce.style.left) - 40) + 'px';
	console.log("Bruce Lee position = ", bruce.style.left);
}

function conditionalReset(){
	const bruce = document.getElementById('bruce');
	if (parseInt(bruce.style.left) < -10000){
		bruce.style.left = '2677px';
	}
}

function timeLoop() {
	var lastRenderTime = 0;
	console.log("time loop");
	const currentTime = performance.now();
	const timeSinceLastRender = currentTime - lastRenderTime;
	
	if (timeSinceLastRender >= 15) {
		
		if (counter < 0){
			moveBruceLee();
			conditionalReset();
			counter = counterMax;
			lastRenderTime = currentTime;
		}
		else {
			counter--;
		}
	}
	
    requestAnimationFrame(() => this.timeLoop());	
  }
  
timeLoop();
