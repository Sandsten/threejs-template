import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { screenSizeManager } from './modules/helpers';

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

  // Materials
  const material1 = new THREE.MeshStandardMaterial();
  material1.color.set(0xfff000);
  material1.metalness = 0.1;
  material1.roughness = 0.8;

  // Lights
  const pointLight = new THREE.PointLight(0xffffff, 0.6);
  pointLight.position.set(-1, 3, 3);
  scene.add(pointLight);


  const globalLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(globalLight);

  const torusKnot = new THREE.TorusKnotGeometry(0.3, 0.1, 100, 100, 2, 3);
  const knotMesh = new THREE.Mesh(torusKnot, material1);
  scene.add(knotMesh);

  function render(time: number) {
    time *= 0.001; // Convert milliseconds to seconds
    screenSizeManager(renderer, camera);

    knotMesh.rotation.y = time * 0.5;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
