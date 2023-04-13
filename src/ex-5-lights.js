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
  SCENE.background = new THREE.Color('#888888');

  // Floor
  // We create a floor by making a box
  const GROUND_GEOMETRY = new THREE.BoxGeometry(8, 0.5, 8);
  const GROUND_MATERIAL = new THREE.MeshPhongMaterial({ color: 0x585868 });
  const GROUND_MESH = new THREE.Mesh(GROUND_GEOMETRY, GROUND_MATERIAL);
  GROUND_MESH.position.set(0, 0, 0);
  SCENE.add(GROUND_MESH);

  // We will now create three spheres of Phong material and different colors to illuminate them
  // Sphere
  const SPHERE_FIRST_GEOMETRY = new THREE.SphereGeometry(0.5);
  const SPHERE_FIRST_MATERIAL = new THREE.MeshPhongMaterial({
    // Light purple
    color: 0xAC1CF4
  });
  const SPHERE_FIRST = new THREE.Mesh(SPHERE_FIRST_GEOMETRY, SPHERE_FIRST_MATERIAL);
  SPHERE_FIRST.position.set(1, 1, 0);
  SCENE.add(SPHERE_FIRST);

  // Sphere
  const SPHERE_SECOND_GEOMETRY = new THREE.SphereGeometry(0.5);
  const SPHERE_SECOND_MATERIAL = new THREE.MeshPhongMaterial({
    // Light blue colour
    color: 0x0CE9FF
  });
  const SPHERE_SECOND = new THREE.Mesh(SPHERE_SECOND_GEOMETRY, SPHERE_SECOND_MATERIAL);
  SPHERE_SECOND.position.set(1, 1, 2);
  SCENE.add(SPHERE_SECOND);

  // Sphere
  const SPHERE_THIRD_GEOMETRY = new THREE.SphereGeometry(0.5);
  const SPHERE_THIRD_MATERIAL = new THREE.MeshPhongMaterial({
    // Yellow colour
    color: 0xFBFF00
  });
  const SPHERE_THIRD = new THREE.Mesh(SPHERE_THIRD_GEOMETRY, SPHERE_THIRD_MATERIAL);
  SPHERE_THIRD.position.set(1, 1, -2);
  SCENE.add(SPHERE_THIRD);

  // We will now create all the different types of lights
  // Ambient light illuminates everything equally
  // Ambient Light
  const AMBIENT_COLOR = 'white';
  const AMBIENT_INTENSITY = 0.7;
  const AMBIENT_LIGHT = new THREE.AmbientLight(AMBIENT_COLOR, AMBIENT_INTENSITY);
  SCENE.add(AMBIENT_LIGHT);
  // Ambient light gui
  const alFolder = GUI_LIGHTS.addFolder('ambient light');
  const alSettings = { color: AMBIENT_LIGHT.color.getHex() };
  alFolder.add(AMBIENT_LIGHT, 'visible');
  alFolder.add(AMBIENT_LIGHT, 'intensity', 0, 1, 0.1);
  alFolder.addColor(alSettings, 'color')
  alFolder.onChange((value) => AMBIENT_LIGHT.color.set(value));
  alFolder.open();


  // Directional light functions similar to the sun
  // Directional light
  const DIRECTIONAL_COLOR = 'white';
  const DIRECTIONAL_INTENSITY = 0;
  const DIRECTIONAL_LIGHT = new THREE.DirectionalLight(DIRECTIONAL_COLOR, DIRECTIONAL_INTENSITY);
  DIRECTIONAL_LIGHT.position.set(10, 10, 0);
  SCENE.add(DIRECTIONAL_LIGHT);
  // Directional light gui
  const DL_SETTINGS = {
    visible: true,
    color: DIRECTIONAL_LIGHT.color.getHex(),
  };
  const DL_FOLDER = GUI_LIGHTS.addFolder('directional light');
  DL_FOLDER.add(DL_SETTINGS, 'visible').onChange((value) => {
    DIRECTIONAL_LIGHT.visible = value;
  });
  DL_FOLDER.add(DIRECTIONAL_LIGHT, 'intensity', 0, 1.5, 0.1);
  DL_FOLDER.addColor(DL_SETTINGS, 'color');
  DL_FOLDER.onChange((value) => DIRECTIONAL_LIGHT.color.set(value));
  DL_FOLDER.open();

  // Spot light creates a spot that emits light in a cone
  // Spot light
  const SPOT_COLOR = 'white';
  const SPOT_INTENSITY = 0;
  const SPOT_LIGHT = new THREE.SpotLight(SPOT_COLOR, SPOT_INTENSITY, 8, Math.PI / 8, 0);
  SPOT_LIGHT.position.set(4, 4, 4);
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
  SL_FOLDER.add(SPOT_LIGHT, 'angle', Math.PI / 128, Math.PI / 8, Math.PI / 64);
  SL_FOLDER.open();

  // Point light creates a point that emits light in all directions
  // Point light
  const POINT_COLOR = 'white';
  const POINT_INTENSITY = 0;
  const POINT_LIGHT = new THREE.PointLight(POINT_COLOR, POINT_INTENSITY, 8, 2);
  POINT_LIGHT.position.set(2, 2, 2);
  SCENE.add(POINT_LIGHT)
  // Point light gui
  const PL_SETTINGS = {
    visible: true,
    color: POINT_LIGHT.color.getHex(),
  };
  const PL_FOLDER = GUI_LIGHTS.addFolder('point light');
  PL_FOLDER.add(PL_SETTINGS, 'visible').onChange((value) => {
    POINT_LIGHT.visible = value;
  });
  PL_FOLDER.add(POINT_LIGHT, 'intensity', 0, 2, 0.25);
  PL_FOLDER.add(POINT_LIGHT.position, 'x', -2, 4, 0.5);
  PL_FOLDER.add(POINT_LIGHT.position, 'y', -2, 4, 0.5);
  PL_FOLDER.add(POINT_LIGHT.position, 'z', -2, 4, 0.5);
  PL_FOLDER.addColor(PL_SETTINGS, 'color');
  PL_FOLDER.onChange((value) => POINT_LIGHT.color.set(value));
  PL_FOLDER.open();

  // Hemisphere light shines light from the ground and from the sky, takes 2 colors
  // Hemisphere light
  const HEMISPHERE_1_COLOR = 0xFF0000;
  const HEMISPHERE_2_COLOR = 0x000FFF;
  const HEMISPHERE_INTENSITY = 0;
  const HEMISPHERE_LIGHT = new THREE.HemisphereLight(HEMISPHERE_1_COLOR, HEMISPHERE_2_COLOR, HEMISPHERE_INTENSITY);
  SCENE.add(HEMISPHERE_LIGHT);
  // Hemisphere light gui
  const HL_FOLDER = GUI_LIGHTS.addFolder('hemisphere light');
  HL_FOLDER.add(HEMISPHERE_LIGHT, 'visible');
  HL_FOLDER.add(HEMISPHERE_LIGHT, 'intensity', 0, 1.5, 0.1);
  HL_FOLDER.onChange((value) => HEMISPHERE_LIGHT.color.set(value));
  HL_FOLDER.open();

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
