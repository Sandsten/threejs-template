import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

import { screenSizeManager } from './modules/helpers';

import basicVertexShader from './shaders/basic/basic.vert?raw';
import basicFragmentShader from './shaders/basic/basic.frag?raw';

import './css/main.scss';

function main() {
  // Create a renderer and append it to our document
  const renderer = new THREE.WebGLRenderer();
  document.body.append(renderer.domElement);

  // Create a perspective camera and move it back 20 units
  const aspect = 2;
  const near = 0.1;
  const far = 20;
  const fov = 75;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.y = 0.5;
  camera.position.z = 2;

  // Move the camera with the mouse
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();

  const scene = new THREE.Scene();

  const customShaderMaterial = new THREE.ShaderMaterial({
    vertexShader: basicVertexShader,
    fragmentShader: basicFragmentShader,

    side: THREE.DoubleSide
  });

  const plane = new THREE.PlaneGeometry(2, 1, 10, 10);
  const planeMesh = new THREE.Mesh(plane, customShaderMaterial);
  scene.add(planeMesh);

  const clock = new THREE.Clock();
  function render() {
    screenSizeManager(renderer, camera);

    const elapsedTIme = clock.elapsedTime;
    const dt = clock.getDelta();

    planeMesh.rotation.y += .5 * dt;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
