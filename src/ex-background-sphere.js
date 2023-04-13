/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Francisco Marqués Armas y Julio Carrasco Armas
 * @since Apr 10 2023
 * @desc Adding a background in three.js
 */

import * as THREE from '../node_modules/three/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';

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
  CAMERA.position.set(5, 2, 5);
  CAMERA.lookAt(0, 0, 0);

  // Camera controls
  const CONTROLS = new OrbitControls(CAMERA, RENDERER.domElement);

  // Scene
  const SCENE = new THREE.Scene();
  SCENE.background = new THREE.Color('white');

  // Textures
  // We load the texture of our background and we use WebGLCubeRenderTarget
  // This way our 360 degree image will be loaded properly 
  const LOADER = new THREE.TextureLoader();
  const texture = LOADER.load(
    '../src/textures/rainforest_trail.jpg',
    () => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(RENDERER, texture);
      SCENE.background = rt.texture;
    });
  const GRASS = LOADER.load('../src/textures/grass.jpg');

  // Box
  // We create a box to have an element in our scene that contrasts against
  // the background
  const BOX_GEOMETRY = new THREE.BoxGeometry(2, 2, 2);
  const BOX_MATERIAL = new THREE.MeshBasicMaterial({
    color: 'white',
    map: GRASS
  });
  const BOX = new THREE.Mesh(BOX_GEOMETRY, BOX_MATERIAL);
  BOX.rotation.x = Math.PI * -.5;
  SCENE.add(BOX);
  OBJECTS.push(BOX);

  // Light
  const COLOR = 'white';
  const INTENSITY = 1.5;
  const LIGHT = new THREE.PointLight(COLOR, INTENSITY);
  LIGHT.position.set(5, 20, 5);
  SCENE.add(LIGHT);

  // Render
  function render(time) {
    time *= 0.001; // Time to seconds
    // Make OBJECTS rotate
    OBJECTS.forEach((obj, ndx) => {
      const SPEED = .1 + ndx * .05;
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