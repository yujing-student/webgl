import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

// 1. Maak een scène
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x808080); // Set the background to a grayish color

// 2. Maak een camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 3. Maak een renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Voeg een object toe (bijv. een torus)
const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 ); 
const material = new THREE.MeshBasicMaterial(); // Using MeshDepthMaterial
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// 5. Plaats de camera
camera.position.z = 50;

// 6. Voeg een lichtbron toe (bijv. een puntlicht)
const light = new THREE.PointLight(0xffffff, 1, 100); // White light
light.position.set(10, 10, 10);
scene.add(light);

// 7. Maak een animatielus
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();