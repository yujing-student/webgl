import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
  -1, -1, 0,
   1, -1, 0,
  -1,  1, 0,
   1,  1, 0
]), 3));
geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([
  0, 0,
  1, 0,
  0, 1,
  1, 1 
]), 2));
geometry.setIndex([0, 1, 2, 2, 1, 3]);

const vertexShader = `
  precision highp float;
  attribute vec3 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

const material = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader
});

const quad = new THREE.Mesh(geometry, material);
scene.add(quad);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

render();