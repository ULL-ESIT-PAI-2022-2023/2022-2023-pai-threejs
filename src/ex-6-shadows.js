/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Francisco Marqués Armas y Julio Carrasco Armas
 * @since Apr 4 2023
 * @desc Fog creation in three.js
 */

import * as THREE from '../node_modules/three/build/three.module.js';
import {GUI} from 'https://threejs.org/examples/jsm/libs/lil-gui.module.min.js';

'use strict';


function main() {
  let CANVAS = document.getElementById('canvasBase');
  const RENDERER = new THREE.WebGLRenderer({
    canvas: CANVAS,
    alpha: true,
    antialas: true
  });

  // Camera
  const FOV = 90;
  const ASPECT_RATIO = (CANVAS.width / CANVAS.height);
  const NEAR = 0.1;
  const FAR = 100;
  const CAMERA = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);
  CAMERA.position.set(2, 3, 2);
  CAMERA.lookAt(0, 0, 0);

  // Camera controls
  const CONTROLS = new OrbitControls(CAMERA, RENDERER.domElement);

  // Scene
  const SCENE = new THREE.Scene();
  SCENE.background = new THREE.Color('white');

  // Sphere
  const SPHERE_BRICKS_GEOMETRY = new THREE.SphereGeometry(0.5);
  const SPHERE_BRICKS_MATERIAL = new THREE.MeshBasicMaterial({
    color: 'white',
    map: BRICKS
  });
  const SPHERE_BRICKS = new THREE.Mesh(SPHERE_BRICKS_GEOMETRY, SPHERE_BRICKS_MATERIAL);
  SPHERE_BRICKS.position.set(0, 1, 0);
  SCENE.add(SPHERE_BRICKS);

  // Sphere
  const SPHERE_TILES_GEOMETRY = new THREE.SphereGeometry(0.5);
  const SPHERE_TILES_MATERIAL = new THREE.MeshBasicMaterial({
    color: 'white',
    map: TILES
  });
  const SPHERE_TILES = new THREE.Mesh(SPHERE_TILES_GEOMETRY, SPHERE_TILES_MATERIAL);
  SPHERE_TILES.position.set(-1, 1, 1);
  SCENE.add(SPHERE_TILES);

  // Sphere
  const SPHERE_WOOD_GEOMETRY = new THREE.SphereGeometry(0.5);
  const SPHERE_WOOD_MATERIAL = new THREE.MeshBasicMaterial({
    color: 'white',
    map: WOOD
  });
  const SPHERE_WOOD = new THREE.Mesh(SPHERE_WOOD_GEOMETRY, SPHERE_WOOD_MATERIAL);
  SPHERE_WOOD.position.set(1, 1, -1);
  SCENE.add(SPHERE_WOOD);

  // Floor
  const FLOOR_GEOMETRY = new THREE.PlaneGeometry(10, 10);
  const FLOOR_MATERIAL = new THREE.MeshBasicMaterial({
    color: 'white',
    map: WATER
  });
  const FLOOR = new THREE.Mesh(FLOOR_GEOMETRY, FLOOR_MATERIAL);
  FLOOR.rotation.x = Math.PI * -.5;
  SCENE.add(FLOOR);

  // Lights
  const COLOR = 'white';
  const INTENSITY = 1.5;
  const LIGHT = new THREE.PointLight(COLOR, INTENSITY);
  LIGHT.position.set(5, 20, 5);
  SCENE.add(LIGHT);

  // Render
  update();

  function update() {
    RENDERER.render(SCENE, CAMERA);
    requestAnimationFrame(update);
  }
}

main();
