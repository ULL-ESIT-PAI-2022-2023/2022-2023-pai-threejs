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
import { GUI } from 'https://threejs.org/examples/jsm/libs/lil-gui.module.min.js';
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

  // GUI
  const GUI_LIGHTS = new GUI();

  // Camera
  const FOV = 90;
  const ASPECT_RATIO = (CANVAS.width / CANVAS.height);
  const NEAR = 0.1;
  const FAR = 100;
  const CAMERA = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);
  CAMERA.position.set(3, 1, 2);
  CAMERA.lookAt(0, 0, 0);

  // Camera controls
  const CONTROLS = new OrbitControls(CAMERA, RENDERER.domElement);

  // Scene
  const SCENE = new THREE.Scene();
  SCENE.background = new THREE.Color('gray');

  // Box
  // We create a box to have an element in our scene that contrasts against
  // the background
  const BOX_GEOMETRY = new THREE.BoxGeometry(2, 2, 2);
  const BOX_MATERIAL = new THREE.MeshPhongMaterial({
    color: 'MediumPurple',
  });
  const BOX = new THREE.Mesh(BOX_GEOMETRY, BOX_MATERIAL);
  BOX.rotation.x = Math.PI * -.5;
  SCENE.add(BOX);
  OBJECTS.push(BOX);

  // Light
  const AMBIENT_COLOR = 'white';
  const AMBIENT_INTENSITY = 0.7;
  const AMBIENT_LIGHT = new THREE.AmbientLight(AMBIENT_COLOR, AMBIENT_INTENSITY);
  SCENE.add(AMBIENT_LIGHT);
  // Ambient light gui
  const alFolder = GUI_LIGHTS.addFolder('ambient light');
  const alSettings = { color: AMBIENT_LIGHT.color.getHex() };
  alFolder.add(AMBIENT_LIGHT, 'visible');
  alFolder.add(AMBIENT_LIGHT, 'intensity', 0, 1, 0.1);
  alFolder
      .addColor(alSettings, 'color')
      .onChange((value) => AMBIENT_LIGHT.color.set(value));
  alFolder.open();

  // Render
  function update(time) {
    time *= 0.005; // Time to seconds
    // Make OBJECTS rotate
    OBJECTS.forEach((obj, ndx) => {
      const SPEED = .1 + ndx * .1;
      const ROTATION = time * SPEED;
      obj.rotation.x = ROTATION;
      obj.rotation.y = ROTATION;
    });
    RENDERER.render(SCENE, CAMERA);
    CONTROLS.update();
    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// Calls the main function
main();