const fps = 1;
var x = 260;
let lastRenderTime = 0;
var speed = 15;

function moveKarateka(){
	
	var karateka = document.getElementById('karateka');
	karateka.style.left = `${x}px`;
    x+=speed;
	console.log('' + karateka.style.left);
}

function ikpostToFront(){
	var ikpost = document.getElementById('ik-cover');
	ikpost.style.zIndex = '3';
}

console.log('hello');


function animate(currentTime) {
    const timeSinceLastRender = currentTime - lastRenderTime;

    if (timeSinceLastRender > 100 / fps) {
		moveKarateka();
		ikpostToFront();
		lastRenderTime = currentTime;
    }
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
