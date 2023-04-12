/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Francisco Marqués Armas y Julio Carrasco Armas
 * @since Apr 10 2023
 * @desc Texture importing and loading in three.js
 */

import * as THREE from '../node_modules/three/build/three.module.js'
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
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
  CAMERA.position.set(2, 3, 2);
  CAMERA.lookAt(0, 0, 0);
  // Camera controls
  const CONTROLS = new OrbitControls(CAMERA, RENDERER.domElement);

  // Scene
  const SCENE = new THREE.Scene();
  SCENE.background = new THREE.Color('white');
  // Textures
  const LOADER = new THREE.TextureLoader();
  const BRICKS = LOADER.load('../src/textures/bricks.jpg');
  const TILES = LOADER.load('../src/textures/tiles.jpg');
  const GRASS = LOADER.load('../src/textures/grass.jpg');
  const WOOD = LOADER.load('../src/textures/wood.jpg');
  // Sphere
  const SPHERE_BRICKS_GEOMETRY = new THREE.SphereGeometry(0.5);
  const SPHERE_BRICKS_MATERIAL = new THREE.MeshBasicMaterial({
    color: 'white',
    map: BRICKS
  });
  const SPHERE_BRICKS = new THREE.Mesh(SPHERE_BRICKS_GEOMETRY, SPHERE_BRICKS_MATERIAL);
  SPHERE_BRICKS.position.set(0, 1, 0);
  SCENE.add(SPHERE_BRICKS);
  OBJECTS.push(SPHERE_BRICKS);
  // Sphere
  const SPHERE_TILES_GEOMETRY = new THREE.SphereGeometry(0.5);
  const SPHERE_TILES_MATERIAL = new THREE.MeshBasicMaterial({
    map: TILES
  });
  const SPHERE_TILES = new THREE.Mesh(SPHERE_TILES_GEOMETRY, SPHERE_TILES_MATERIAL);
  SPHERE_TILES.position.set(-1, 1, 1);
  SCENE.add(SPHERE_TILES);
  OBJECTS.push(SPHERE_TILES);
  // Sphere
  const SPHERE_WOOD_GEOMETRY = new THREE.SphereGeometry(0.5);
  const SPHERE_WOOD_MATERIAL = new THREE.MeshBasicMaterial({
    color: 'white',
    map: WOOD
  });
  const SPHERE_WOOD = new THREE.Mesh(SPHERE_WOOD_GEOMETRY, SPHERE_WOOD_MATERIAL);
  SPHERE_WOOD.position.set(1, 1, -1);
  SCENE.add(SPHERE_WOOD);
  OBJECTS.push(SPHERE_WOOD);
  // Cube
  const CUBE_MATERIALS = [
    new THREE.MeshBasicMaterial({ map: LOADER.load('../src/textures/bricks.jpg') }),
    new THREE.MeshBasicMaterial({ map: LOADER.load('../src/textures/tiles.jpg') }),
    new THREE.MeshBasicMaterial({ map: LOADER.load('../src/textures/wood.jpg') }),
    new THREE.MeshBasicMaterial({ map: LOADER.load('../src/textures/wood.jpg') }),
    new THREE.MeshBasicMaterial({ map: LOADER.load('../src/textures/bricks.jpg') }),
    new THREE.MeshBasicMaterial({ map: LOADER.load('../src/textures/tiles.jpg') })
  ];
  const CUBE_GEOMETRY = new THREE.BoxGeometry(1, 1, 1);
  const CUBE = new THREE.Mesh(CUBE_GEOMETRY, CUBE_MATERIALS);
  CUBE.position.set(-1.5, 1, 2.5);
  CUBE.rotation.y = Math.PI * -0.20;
  SCENE.add(CUBE);
  OBJECTS.push(CUBE);
  // Floor
  const FLOOR_GEOMETRY = new THREE.PlaneGeometry(10, 10);
  const FLOOR_MATERIAL = new THREE.MeshBasicMaterial({
    color: 'white',
    map: GRASS
  });
  const FLOOR = new THREE.Mesh(FLOOR_GEOMETRY, FLOOR_MATERIAL);
  FLOOR.rotation.x = Math.PI * -.5;
  SCENE.add(FLOOR);
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