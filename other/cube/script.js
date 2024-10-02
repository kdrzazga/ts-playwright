const speedVerticalSlider = document.getElementById('speed-vertical');
const speedHorizontalSlider = document.getElementById('speed-horizontal');
const changeColorButton = document.getElementById('change-color');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }); // black color for the wireframe
const wireframe = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), wireframeMaterial);

let speedX = 0.01
let speedY = 0.01
scene.add(wireframe);

const predefinedColors = [
    0xff0000, // Red
    0x00ff00, // Green
    0x0000ff, // Blue
    0xffff00, // Yellow
    0xff00ff, // Magenta
    0x00ffff, // Cyan
    0xaaaaaa, // gray
    0xffffff  // White
];

function animate() {
    requestAnimationFrame(animate);
	
	speedX = speedVerticalSlider.value / 100;
	speedY = speedHorizontalSlider.value / 100;

    cube.rotation.x += speedX;
    cube.rotation.y += speedY;
    wireframe.rotation.x += speedX;
    wireframe.rotation.y += speedY;

    renderer.render(scene, camera);
}

changeColorButton.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * predefinedColors.length); 
    const randomColor = predefinedColors[randomIndex]; 
    cube.material.color.set(randomColor); 
});

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

animate();
