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
  const CANVAS = document.getElementById('canvasBase');
  const RENDERER = new THREE.WebGLRenderer({
    canvas: CANVAS,
    alpha: true,
    antialias: true
  });
  // We create a vector to save the objects to make them rotate later
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

  // Scene
  const SCENE = new THREE.Scene();
  SCENE.background = new THREE.Color('white');

  // Importing the model and we add it to objects vector to make it spin
  const GLTF_LOADER = new GLTFLoader();
  GLTF_LOADER.load('src/3d_model/scene.gltf', (gltf) => {
    const ROOT = gltf.scene;
    SCENE.add(ROOT);
    OBJECTS.push(ROOT);
  });

  // Textures
  // We load our background
  const LOADER = new THREE.TextureLoader();
  const BACKGROUND = LOADER.load('../src/textures/planets.jpg');
  SCENE.background = BACKGROUND;

  // Light
  const AMBIENT_COLOR = 'white';
  const AMBIENT_INTENSITY = 2;
  const AMBIENT_LIGHT = new THREE.AmbientLight(AMBIENT_COLOR, AMBIENT_INTENSITY);
  SCENE.add(AMBIENT_LIGHT);

  // Render
  function update(time) {
    time *= 0.005; // Time to seconds
    // Make OBJECTS rotate
    OBJECTS.forEach((object, index) => {
      const SPEED = .1 + index * .1;
      const ROTATION = time * SPEED;
      object.rotation.x = ROTATION;
      object.rotation.y = ROTATION;
    });
    RENDERER.render(SCENE, CAMERA);
    CONTROLS.update();
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Calls the main function
main();