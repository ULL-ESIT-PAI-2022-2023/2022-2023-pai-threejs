/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Edwin Plasencia Hernández & Gerard Antony Caramazza Vilá
 * @since May 15 2022
 * @desc Basic figures and orthographic camera with three.js
 */

import * as THREE from '../node_modules/three/build/three.module.js';
import {GUI} from 'https://threejs.org/examples/jsm/libs/lil-gui.module.min.js';

'use strict';

class ChangeCameraHelper {                                                             // This is also needed to create the graphical interface,
  constructor(type=1) {                                      // again, doesn't have anything to do with three.js so don't worry
    this.type = type;
  }
}

function main() {
  let canvas = document.getElementById('canvasBase'); // Canvas
  const RENDERER = new THREE.WebGLRenderer({          // Renderer
    canvas: canvas,
    alpha: true                                       // The canvas will accept transparency
  });
  // Camera
  const near = 0.1;                                                             // Nearest point that will be rendered from the camera
  const far = 100;                                                              // Farthest point that will be rendered from the camera
  let camera = new THREE.OrthographicCamera(-10, 10, 10, -10, near, far);         // Basic orthographic camera
  camera.position.set(5, 5, 5);                                                 // We move to camera to x=2 y=2 z=2
  camera.zoom = 0.2;
  camera.lookAt(0, 0, 0);                                                       // and point it to x=0 y=0 z=0


  function changeCameraType() {
    console.log(changeCameraHelper.type);
    if (changeCameraHelper.type == 0) {
      camera = new THREE.OrthographicCamera(-10, 10, 10, -10, near, far);
      camera.position.set(4, 4, 4);                                                 // We move to camera to x=2 y=2 z=2
      camera.zoom = 0.2;
      camera.lookAt(0, 0, 0);                                                       // and point it to x=0 y=0 z=0
    
    } else {
      camera = new THREE.PerspectiveCamera(75, 2, near, far);
      camera.position.set(4, 4, 4);                                                 // We move to camera to x=2 y=2 z=2
      camera.zoom = 0.2;
      camera.lookAt(0, 0, 0);                                                       // and point it to x=0 y=0 z=0
    
    }
  }
  const gui = new GUI();
  const changeCameraHelper = new ChangeCameraHelper();
  gui.add(changeCameraHelper, 'type', 0, 1, 1).name('changeCameraType').onChange(changeCameraType);;


  // Scene
  const scene = new THREE.Scene();                                              //Basic scene
  // Cube
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);                         // Geometry of a cube with dimensions 1x1x1
  const cubeMaterial = new THREE.MeshBasicMaterial({                           // Basic material for the cube with the color green
    color: 'red',
  });
  const CUBE = new THREE.Mesh(cubeGeometry, cubeMaterial);                    // We create the actual mesh with its geometry and material,
  CUBE.position.set(-1, 1, 1);                                                  // we move the cube
  scene.add(CUBE);                                                              // and we add it to the scene 
  // Sphere
  const SPHERE_GEOMETRY = new THREE.SphereGeometry(0.5);                        // Now we create a sphere geometry with radius 0.5
  const SPHERE_MATERIAL = new THREE.MeshBasicMaterial({                         // Basic material for the sphere with the color blue
    color: 'blue',
  });
  const SPHERE = new THREE.Mesh(SPHERE_GEOMETRY, SPHERE_MATERIAL);              // We create the actual mesh with its geometry and material
  SPHERE.position.set(1, 1, -1);                                                // we move the sphere
  scene.add(SPHERE);                                                            // and we add it to the scene   
  // Floor
  const FLOOR_GEOMETRY = new THREE.PlaneGeometry(10, 10);                       // Now let's add a floor with dimensions 10x10
  const FLOOR_MATERIAL = new THREE.MeshBasicMaterial({                          // Basic material for the floor with the color gray
    color: 'green',
  });
  const FLOOR = new THREE.Mesh(FLOOR_GEOMETRY, FLOOR_MATERIAL);                 // We create the actual mesh with its geometry and material
  FLOOR.rotation.x = Math.PI * -.5;                                             // we rotate it to make it horizontal
  scene.add(FLOOR);                                                             // and we add it to the scene   


  // Render
  update();                                                                     // Now we call our loop function

  function update() {                                                           // The function will keep rendering the scene looking for possible changes
    RENDERER.render(scene, camera);
    requestAnimationFrame(update);
  }
}

// Calls the main function
main();