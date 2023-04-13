/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Francisco Marqués Armas y Julio Carrasco Armas
 * @since Apr 10 2023
 * @desc Importing a 3d model
 */

import * as THREE from '../node_modules/three/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

'use strict';

function main() {
  let CANVAS = document.getElementById('canvasBase');
  const RENDERER = new THREE.WebGLRenderer({
    canvas: CANVAS,
    alpha: true,
    antialas: true
  });
  const OBJECTS = [];
  // Camera
  const FOV = 90;
  const ASPECT_RATIO = (CANVAS.width / CANVAS.height);
  const NEAR = 0.1;
  const FAR = 100;
  const CAMERA = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);
  CAMERA.position.set(1, 1, 2);
  CAMERA.lookAt(0, 0, 0);
  // Camera controls
  const CONTROLS = new OrbitControls(CAMERA, RENDERER.domElement);
  
  // Importing the model
  const gltfLoader = new GLTFLoader();
  gltfLoader.load('src/3d_model/scene.gltf', (gltf) => {
    const root = gltf.scene;
    SCENE.add(root);
    OBJECTS.push(root);

    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(root);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    // set the camera to frame the box
    frameArea(boxSize * 0.5, boxSize, boxCenter, CAMERA);

    // update the Trackball controls to handle the new size
    CONTROLS.maxDistance = boxSize * 10;
    CONTROLS.target.copy(boxCenter);
    CONTROLS.update();
  });

  // Scene
  const SCENE = new THREE.Scene();
  SCENE.background = new THREE.Color('white');
  // Textures
  const LOADER = new THREE.TextureLoader();
  const BACKGROUND = LOADER.load('../src/textures/planets.jpg');
  const GRASS = LOADER.load('../src/textures/grass.jpg');
  SCENE.background = BACKGROUND;
  // Light
  const COLOR = 'white';
  const INTENSITY = 3;
  const LIGHT = new THREE.PointLight(COLOR, INTENSITY);
  LIGHT.position.set(0, 5, 2);
  SCENE.add(LIGHT);

  // Render
  function render(time) {
    time *= 0.001; // Time to seconds
    // Make OBJECTS rotate
    OBJECTS.forEach((obj, ndx) => {
      const SPEED = .3 + ndx * .2;
      const ROTATION = time * SPEED;
      obj.rotation.x = ROTATION;
      obj.rotation.y = ROTATION;
    });
    requestAnimationFrame(render);
    CONTROLS.update();
    RENDERER.render(SCENE, CAMERA);


  }
  requestAnimationFrame(render);
}

// Calls the main function
main();