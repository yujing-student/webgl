import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { OrbitControls } from './utils/OrbitControls.js';
import { OBJLoader } from './utils/OBJLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 100);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const textureLoader = new THREE.TextureLoader();
const diffuseMap = textureLoader.load('./mesh/ufo_diffuse.png');
const normalMap = textureLoader.load('./mesh/ufo_normal.png');
const specularMap = textureLoader.load('./mesh/ufo_spec.png');

const material = new THREE.MeshPhongMaterial({
  map: diffuseMap,
  normalMap: normalMap,
  specularMap: specularMap,
  shininess: 100,
});

const objLoader = new OBJLoader();
objLoader.load(
  './mesh/UFO.obj',
  (object) => {
    object.traverse((child) => {
      console.log(child);
      if (child.isMesh) {
        child.material = material;
      }
    });
    object.position.set(0, 0, 0);
    scene.add(object);
  },
  (xhr) => {
    console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}% completed`);
  },
  (error) => {
    console.error('An error occurred loading the OBJ file:', error);
  }
);

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
