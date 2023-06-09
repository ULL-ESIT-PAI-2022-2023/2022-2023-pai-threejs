/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Francisco Marqués Armas y Julio Carrasco Armas
 * @since Apr 4 2023
 * @desc Shadows using PCFShadowMap in three.js
 */

import * as THREE from '../node_modules/three/build/three.module.js';
import { GUI } from 'https://threejs.org/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';

'use strict';

function main() {
  const CANVAS = document.getElementById('canvasBase');
  const RENDERER = new THREE.WebGLRenderer({
    canvas: CANVAS,
    alpha: true
  });

  // We need to tell the renderer that we want it to render shadows
  RENDERER.shadowMap.enabled = true;
  RENDERER.shadowMap.type = THREE.PCFShadowMap;
  RENDERER.shadowMap.autoUpdate = true;

  // GUI
  const GUI_LIGHTS = new GUI();

  // Camera
  const FOV = 90;
  const ASPECT_RATIO = (CANVAS.width / CANVAS.height);
  const NEAR = 0.1;
  const FAR = 100;
  const CAMERA = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);
  CAMERA.position.set(4, 3, 0);
  CAMERA.lookAt(0, 0, 0);

  // Camera controls
  const CONTROLS = new OrbitControls(CAMERA, RENDERER.domElement);

  // Scene
  const SCENE = new THREE.Scene();
  SCENE.background = new THREE.Color('gray');

  // Floor
  // We create a box to make the floor, important that we make receiveShadow = true
  // Otherwise the item will not display shadows casted into it
  const GROUND_GEOMETRY = new THREE.BoxGeometry(8, 0.5, 8);
  const GROUND_MATERIAL = new THREE.MeshPhongMaterial({ color: 0x585868 });
  const GROUND_MESH = new THREE.Mesh(GROUND_GEOMETRY, GROUND_MATERIAL);
  GROUND_MESH.position.set(0, 0, 0);
  GROUND_MESH.receiveShadow = true;
  SCENE.add(GROUND_MESH);

  // We will proceed to create three spheres of different colors to produce shadows
  // We need to add castShadow = true to make the object be able to cast a shadow

  // Sphere
  const SPHERE_FIRST_GEOMETRY = new THREE.SphereGeometry(0.5);
  const SPHERE_FIRST_MATERIAL = new THREE.MeshPhongMaterial({
    // Light purple
    color: 'Magenta'
  });
  const SPHERE_FIRST = new THREE.Mesh(SPHERE_FIRST_GEOMETRY, SPHERE_FIRST_MATERIAL);
  SPHERE_FIRST.position.set(1, 1, 0);
  SPHERE_FIRST.castShadow = true;
  SCENE.add(SPHERE_FIRST);

  // Sphere
  const SPHERE_SECOND_GEOMETRY = new THREE.SphereGeometry(0.5);
  const SPHERE_SECOND_MATERIAL = new THREE.MeshPhongMaterial({
    // Light blue colour
    color: 'Cyan'
  });
  const SPHERE_SECOND = new THREE.Mesh(SPHERE_SECOND_GEOMETRY, SPHERE_SECOND_MATERIAL);
  SPHERE_SECOND.position.set(1, 1, 2);
  SPHERE_SECOND.castShadow = true;
  SCENE.add(SPHERE_SECOND);

  // Sphere
  const SPHERE_THIRD_GEOMETRY = new THREE.SphereGeometry(0.5);
  const SPHERE_THIRD_MATERIAL = new THREE.MeshPhongMaterial({
    // Yellow colour
    color: 'Yellow'
  });
  const SPHERE_THIRD = new THREE.Mesh(SPHERE_THIRD_GEOMETRY, SPHERE_THIRD_MATERIAL);
  SPHERE_THIRD.position.set(1, 1, -2);
  SPHERE_THIRD.castShadow = true;
  SCENE.add(SPHERE_THIRD);

  // We create the lights that will cast the shadow, we use an ambient light with
  // low intensity to avoid making the scene too dark, and we use a high intensity
  // spot light to generate the shadows

  // Ambient light
  const AMBIENT_COLOR = 'white';
  const AMBIENT_INTENSITY = 0.15;
  const AMBIENT_LIGHT = new THREE.AmbientLight(AMBIENT_COLOR, AMBIENT_INTENSITY);
  SCENE.add(AMBIENT_LIGHT);

  // Spot light
  const SPOT_COLOR = 'white';
  const SPOT_INTENSITY = 4;
  const SPOT_LIGHT = new THREE.SpotLight(SPOT_COLOR, SPOT_INTENSITY, 8, Math.PI / 8, 0);
  SPOT_LIGHT.position.set(-3, 4, 3);
  SPOT_LIGHT.lookAt(0, 0, 0);
  // We need to make it so the light can cast a shadow, we also set the resolution of the shadow
  // and its blur
  SPOT_LIGHT.castShadow = true;
  SPOT_LIGHT.shadow.mapSize.width = 256;
  SPOT_LIGHT.shadow.mapSize.height = 256;
  // We set how strong the blur will be
  SPOT_LIGHT.shadow.radius = 5;
  SPOT_LIGHT.shadow.blurSamples = 25;
  SCENE.add(SPOT_LIGHT);
  // Spot light gui
  const SL_SETTINGS = {
    visible: true,
  };
  const SL_FOLDER = GUI_LIGHTS.addFolder('spot light');
  SL_FOLDER.add(SL_SETTINGS, 'visible').onChange((value) => {
    SPOT_LIGHT.visible = value;
  });
  SL_FOLDER.add(SPOT_LIGHT, 'intensity', 0, 4, 0.25);
  SL_FOLDER.add(SPOT_LIGHT, 'angle', Math.PI / 128, Math.PI / 4, Math.PI / 64);
  SL_FOLDER.add(SPOT_LIGHT, 'castShadow');
  SL_FOLDER.add(SPOT_LIGHT.shadow, 'radius', 5, 40, 0.5);
  SL_FOLDER.open();

  // Render
  function update() {
    requestAnimationFrame(update);
    CONTROLS.update();
    RENDERER.render(SCENE, CAMERA);
  }

  update();
}

// Calls the main function
main();
