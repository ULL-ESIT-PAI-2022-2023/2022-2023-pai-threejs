/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Francisco Marqués Armas y Julio Carrasco
 * @since Apr 4 2023
 * @desc Basic figures and orthographic camera with three.js
*/

import * as THREE from '../node_modules/three/build/three.module.js';
import { GUI } from 'https://threejs.org/examples/jsm/libs/lil-gui.module.min.js';

'use strict';

// This class helps with camera changes with the GUI,
// it is not necessary to understand it
class ChangeCameraHelper {
  constructor(useOrthographic = true, near = 0.1, far = 100) {
    this.useOrthographic = useOrthographic;
    this.near = near;
    this.far = far;
  }
}

// Function to change camera type if the GUI checkbox is checked



function main() {
  function changeCameraType() {
    if (CHANGE_CAMERA_HELPER.useOrthographic) {
      // First four parameters define the fustrum dimensions (left, right, top, bottom)
      camera = new THREE.OrthographicCamera(-10, 10, 10, -10, CHANGE_CAMERA_HELPER.near, CHANGE_CAMERA_HELPER.far);
      camera.position.set(4, 4, 4);
      camera.zoom = 0.2;
      camera.lookAt(0, 0, 0);
    } else {
      // First parameter is the field of view, second is the aspect ratio, last two are near and far
      camera = new THREE.PerspectiveCamera(75, 2, CHANGE_CAMERA_HELPER.near, CHANGE_CAMERA_HELPER.far);
      camera.position.set(4, 4, 4);
      camera.zoom = 0.2;
      camera.lookAt(0, 0, 0);
    }
  }
  const CANVAS = document.getElementById('canvasBase');
  const RENDERER = new THREE.WebGLRenderer({
    canvas: CANVAS,
    alpha: true // accept transparency
  });

  // Camera
  const NEAR = 0.1; // How close the camera can see
  const FAR = 100;  // How far the camera can see
  // First four parameters define the fustrum dimensions (left, right, top, bottom)
  let camera = new THREE.OrthographicCamera(-10, 10, 10, -10, NEAR, FAR);
  camera.position.set(5, 5, 5);
  camera.zoom = 0.2;
  camera.lookAt(0, 0, 0);

  // GUI used for changing camera type and near/far values
  // also not necessary to understand, just used for explanation purposes
  const GUI_VIEW = new GUI();
  const CHANGE_CAMERA_HELPER = new ChangeCameraHelper();
  GUI_VIEW.add(CHANGE_CAMERA_HELPER, 'useOrthographic').name('Use Orthographic Camera').onChange(changeCameraType);
  GUI_VIEW.add(CHANGE_CAMERA_HELPER, 'near', 0.1, 10).name('Near').onChange(changeCameraType);
  GUI_VIEW.add(CHANGE_CAMERA_HELPER, 'far', 1, 20).name('Far').onChange(changeCameraType);

  // Scene
  const SCENE = new THREE.Scene();

  // Cube
  const CUBE_GEOMETRY = new THREE.BoxGeometry(1, 1, 1);
  const CUBE_MATERIAL = new THREE.MeshBasicMaterial({
    color: 'red',
  });
  const CUBE = new THREE.Mesh(CUBE_GEOMETRY, CUBE_MATERIAL);
  CUBE.position.set(-1, 1, 1);
  SCENE.add(CUBE);

  // Sphere
  const SPHERE_GEOMETRY = new THREE.SphereGeometry(0.5);
  const SPHERE_MATERIAL = new THREE.MeshBasicMaterial({
    color: 'blue',
  });
  const SPHERE = new THREE.Mesh(SPHERE_GEOMETRY, SPHERE_MATERIAL);
  SPHERE.position.set(1, 1, -1);
  SCENE.add(SPHERE);

  // Floor
  const FLOOR_GEOMETRY = new THREE.BoxGeometry(10, 10);
  const FLOOR_MATERIAL = new THREE.MeshBasicMaterial({
    color: 'green',
  });
  const FLOOR = new THREE.Mesh(FLOOR_GEOMETRY, FLOOR_MATERIAL);
  FLOOR.rotation.x = Math.PI * -.5;
  SCENE.add(FLOOR);

  // Render
  update();
  function update() {
    RENDERER.render(SCENE, camera);
    requestAnimationFrame(update);
  }
}

main();