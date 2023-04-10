/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Francisco Marqués Armas y Julio Carrasco Armas
 * @since Apr 4 2023
 * @desc Ambient lights in three.js
 */

import * as THREE from '../node_modules/three/build/three.module.js'
import { GUI } from 'https://threejs.org/examples/jsm/libs/lil-gui.module.min.js';

'use strict';

function main() {
  let CANVAS = document.getElementById('canvasBase');
  const RENDERER = new THREE.WebGLRenderer({
    canvas: CANVAS,
    alpha: true
  });
  // GUI
  const gui = new GUI();
  // Camera
  const FOV = 90;                                                               // Camera's field of view
  const ASPECT_RATIO = (CANVAS.width / CANVAS.height);
  const NEAR = 0.1;                                                             // Nearest point that will be rendered from the camera
  const FAR = 100;                                                              // Farthest point that will be rendered from the camera
  const CAMERA = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);     // Basic perspective camera
  CAMERA.position.set(4, 3, 0);                                                 // We move to camera to x=2 y=2 z=2
  CAMERA.lookAt(0, 0, 0);                                                       // and point it to x=0 y=0 z=0
  // Scene
  const SCENE = new THREE.Scene();                                              // Basic scene
  SCENE.background = new THREE.Color('white');                                  // We are gonna make the background of the scene white
  // Sphere
  const SPHERE_FIRST_GEOMETRY = new THREE.SphereGeometry(0.5);
  const SPHERE_FIRST_MATERIAL = new THREE.MeshPhongMaterial({
    // Light purple
    color: 0xAC1CF4
  });
  const SPHERE_FIRST = new THREE.Mesh(SPHERE_FIRST_GEOMETRY, SPHERE_FIRST_MATERIAL);
  SPHERE_FIRST.position.set(1, 1, 0);
  SPHERE_FIRST.castShadow = true;
  SPHERE_FIRST.receiveShadow = true;
  SCENE.add(SPHERE_FIRST);
  // Sphere
  const SPHERE_SECOND_GEOMETRY = new THREE.SphereGeometry(0.5);
  const SPHERE_SECOND_MATERIAL = new THREE.MeshPhongMaterial({
    // Light blue colour
    color: 0x0CE9FF
  });
  const SPHERE_SECOND = new THREE.Mesh(SPHERE_SECOND_GEOMETRY, SPHERE_SECOND_MATERIAL);
  SPHERE_SECOND.position.set(1, 1, 2);
  SPHERE_SECOND.castShadow = true;
  SPHERE_SECOND.receiveShadow = true;
  SCENE.add(SPHERE_SECOND);
  // Sphere
  const SPHERE_THIRD_GEOMETRY = new THREE.SphereGeometry(0.5);
  const SPHERE_THIRD_MATERIAL = new THREE.MeshPhongMaterial({
    // Yellow colour
    color: 0xFBFF00
  });
  const SPHERE_THIRD = new THREE.Mesh(SPHERE_THIRD_GEOMETRY, SPHERE_THIRD_MATERIAL);
  SPHERE_THIRD.position.set(1, 1, -2);
  SPHERE_THIRD.castShadow = true;
  SPHERE_THIRD.receiveShadow = true;
  SCENE.add(SPHERE_THIRD);
  // Floor
  const GROUND_GEOMETRY = new THREE.BoxGeometry(8, 0.5, 8);
  const GROUND_MATERIAL = new THREE.MeshPhongMaterial({ color: 0x585868 });
  const GROUND_MESH = new THREE.Mesh(GROUND_GEOMETRY, GROUND_MATERIAL);
  GROUND_MESH.position.set(0, 0, 0);
  GROUND_MESH.receiveShadow = true;
  SCENE.add(GROUND_MESH);

  // Lights
  // Ambient Light
  const AMBIENT_COLOR = 'white';
  const AMBIENT_INTENSITY = 0.7;
  const AMBIENT_LIGHT = new THREE.AmbientLight(AMBIENT_COLOR, AMBIENT_INTENSITY);
  SCENE.add(AMBIENT_LIGHT);
  // Ambient light gui
  const alFolder = gui.addFolder('ambient light');
  const alSettings = { color: AMBIENT_LIGHT.color.getHex() };
  alFolder.add(AMBIENT_LIGHT, 'visible');
  alFolder.add(AMBIENT_LIGHT, 'intensity', 0, 1, 0.1);
  alFolder.addColor(alSettings, 'color')
  alFolder.onChange((value) => AMBIENT_LIGHT.color.set(value));
  alFolder.open();
  // Directional light
  const DIRECTIONAL_COLOR = 'white';
  const DIRECTIONAL_INTENSITY = 0;
  const DIRECTIONAL_LIGHT = new THREE.DirectionalLight(DIRECTIONAL_COLOR, DIRECTIONAL_INTENSITY);
  DIRECTIONAL_LIGHT.castShadow = true;
  SCENE.add(DIRECTIONAL_LIGHT);
  // Directional light gui
  const dlSettings = {
    visible: true,
    color: DIRECTIONAL_LIGHT.color.getHex(),
  };
  const dlFolder = gui.addFolder('directional light');
  dlFolder.add(dlSettings, 'visible').onChange((value) => {
    DIRECTIONAL_LIGHT.visible = value;
  });
  dlFolder.add(DIRECTIONAL_LIGHT, 'intensity', 0, 1, 0.1);
  dlFolder.add(DIRECTIONAL_LIGHT, 'castShadow');
  dlFolder
    .addColor(dlSettings, 'color')
    .onChange((value) => DIRECTIONAL_LIGHT.color.set(value));
  dlFolder.open();
  // Spot light
  const SPOT_COLOR = 'white';
  const SPOT_INTENSITY = 0;
  const SPOT_LIGHT = new THREE.SpotLight(SPOT_COLOR, SPOT_INTENSITY, 8, Math.PI / 8, 0);
  SPOT_LIGHT.position.set(4, 4, 4);
  SPOT_LIGHT.castShadow = true;
  SCENE.add(SPOT_LIGHT);
  // Spot light gui
  const slSettings = {
    visible: true,
  };
  const slFolder = gui.addFolder('spot light');
  slFolder.add(slSettings, 'visible').onChange((value) => {
    SPOT_LIGHT.visible = value;
  });
  slFolder.add(SPOT_LIGHT, 'intensity', 0, 4, 0.25);
  slFolder.add(SPOT_LIGHT, 'angle', Math.PI / 128, Math.PI / 8, Math.PI / 64);
  slFolder.add(SPOT_LIGHT, 'castShadow');
  slFolder.open();
  // Point light
  const POINT_COLOR = 'white';
  const POINT_INTENSITY = 0;
  const POINT_LIGHT = new THREE.PointLight(POINT_COLOR, POINT_INTENSITY, 8, 2);
  POINT_LIGHT.position.set(2, 2, 2);
  POINT_LIGHT.castShadow = true;
  SCENE.add(POINT_LIGHT)

  // Point light gui
  const plSettings = {
    visible: true,
    color: POINT_LIGHT.color.getHex(),
  };
  const plFolder = gui.addFolder('point light');
  plFolder.add(plSettings, 'visible').onChange((value) => {
    POINT_LIGHT.visible = value;
  });
  plFolder.add(POINT_LIGHT, 'intensity', 0, 2, 0.25);
  plFolder.add(POINT_LIGHT.position, 'x', -2, 4, 0.5);
  plFolder.add(POINT_LIGHT.position, 'y', -2, 4, 0.5);
  plFolder.add(POINT_LIGHT.position, 'z', -2, 4, 0.5);
  plFolder.add(POINT_LIGHT, 'castShadow');
  plFolder
    .addColor(plSettings, 'color')
    .onChange((value) => POINT_LIGHT.color.set(value));
  plFolder.open();
  // Render
  update();                                                                     // Now we call our loop function

  function update() {                                                           // The function will keep rendering the scene looking for possible changes
    RENDERER.render(SCENE, CAMERA);
    requestAnimationFrame(update);
  }
}

// Calls the main function
main();