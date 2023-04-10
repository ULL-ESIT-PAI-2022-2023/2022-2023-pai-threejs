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

'use strict';

function main() {
  let CANVAS = document.getElementById('canvasBase'); // Canvas
  const RENDERER = new THREE.WebGLRenderer({          // Renderer
    canvas: CANVAS,
    alpha: true,                                       // The CANVAS will accept transparency
    antialas: true
  });
  const OBJECTS = [];
  // Camera
  const FOV = 90;                                                               // Camera's field of view
  const ASPECT_RATIO = (CANVAS.width / CANVAS.height);
  const NEAR = 0.1;                                                             // Nearest point that will be rendered from the CAMERA
  const FAR = 100;                                                              // Farthest point that will be rendered from the CAMERA
  const CAMERA = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);     // Basic perspective CAMERA
  CAMERA.position.set(2, 3, 2);                                                 // We move to CAMERA to x=2 y=2 z=2
  CAMERA.lookAt(0, 0, 0);                                                       // and point it to x=0 y=0 z=0
  // Scene
  const scene = new THREE.Scene();                                              // Basic scene
  scene.background = new THREE.Color('white');                                  // We are gonna make the background of the scene white
  // Textures
  const LOADER = new THREE.TextureLoader();                                     // We initialize our texture LOADER
  const BRICKS = LOADER.load('../src/textures/bricks.jpg');                      // And save our textures in constants to be able to load them
  const TILES = LOADER.load('../src/textures/tiles.jpg');
  const GRASS = LOADER.load('../src/textures/grass.jpg');
  const WOOD = LOADER.load('../src/textures/wood.jpg');
  // Sphere
  const SPHERE_BRICKS_GEOMETRY = new THREE.SphereGeometry(0.5);                 // Sphere with radius 0.5
  const SPHERE_BRICKS_MATERIAL = new THREE.MeshBasicMaterial({                  // Basic material for the sphere, we will give it one of the new loaded textures with map: <texture>
    color: 'white',
    map: BRICKS
  });
  const SPHERE_BRICKS = new THREE.Mesh(SPHERE_BRICKS_GEOMETRY, SPHERE_BRICKS_MATERIAL);
  SPHERE_BRICKS.position.set(0, 1, 0);
  scene.add(SPHERE_BRICKS);
  OBJECTS.push(SPHERE_BRICKS);
  // Sphere
  const SPHERE_TILES_GEOMETRY = new THREE.SphereGeometry(0.5);                 // Sphere with radius 0.5
  const SPHERE_TILES_MATERIAL = new THREE.MeshBasicMaterial({                  // Basic material for the sphere, we will give it one of the new loaded textures with map: <texture>
    color: 'white',
    map: TILES
  });
  const SPHERE_TILES = new THREE.Mesh(SPHERE_TILES_GEOMETRY, SPHERE_TILES_MATERIAL);
  SPHERE_TILES.position.set(-1, 1, 1);
  scene.add(SPHERE_TILES);
  OBJECTS.push(SPHERE_TILES);
  // Sphere
  const SPHERE_WOOD_GEOMETRY = new THREE.SphereGeometry(0.5);                 // Sphere with radius 0.5
  const SPHERE_WOOD_MATERIAL = new THREE.MeshBasicMaterial({                  // Basic material for the sphere, we will give it one of the new loaded textures with map: <texture>
    color: 'white',
    map: WOOD
  });
  const SPHERE_WOOD = new THREE.Mesh(SPHERE_WOOD_GEOMETRY, SPHERE_WOOD_MATERIAL);
  SPHERE_WOOD.position.set(1, 1, -1);
  scene.add(SPHERE_WOOD);
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
  const CUBE_GEOMETRY = new THREE.BoxGeometry(1, 1, 1);                // Cube with dimensions 1x1x1
  const CUBE = new THREE.Mesh(CUBE_GEOMETRY, CUBE_MATERIALS);
  CUBE.position.set(-1.5, 1, 2.5);
  CUBE.rotation.y = Math.PI * -0.20;
  scene.add(CUBE);
  OBJECTS.push(CUBE);
  // Floor
  const FLOOR_GEOMETRY = new THREE.PlaneGeometry(10, 10);                       // Now let's add a floor with dimensions 10x10
  const FLOOR_MATERIAL = new THREE.MeshBasicMaterial({                          // Basic material for the floor with a grass texture
    color: 'white',
    map: GRASS
  });
  const FLOOR = new THREE.Mesh(FLOOR_GEOMETRY, FLOOR_MATERIAL);                 // We create the actual mesh with its geometry and material
  FLOOR.rotation.x = Math.PI * -.5;                                             // we rotate it to make it horizontal
  scene.add(FLOOR);                                                       // and we add it to the scene   
  // Lights
  const COLOR = 'white';                                                        // PointLight
  const INTENSITY = 1.5;
  const LIGHT = new THREE.PointLight(COLOR, INTENSITY);
  LIGHT.position.set(5, 20, 5);
  scene.add(LIGHT);  

  // Render                                                                    // Now we call our loop function
  function render(time) {
    time *= 0.001; // Time to seconds
    // Make OBJECTS rotate
    OBJECTS.forEach((obj, ndx) => {
        const SPEED = .1 + ndx * .05;
        const ROTATION = time * SPEED;
        obj.rotation.x = ROTATION;
        obj.rotation.y = ROTATION;
    });
    RENDERER.render(scene, CAMERA);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);
}

// Calls the main function
main();