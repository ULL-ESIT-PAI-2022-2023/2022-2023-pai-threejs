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

// Fog helper class which will be used to create the GUI
// It will be used to change the fog type and set fog density for FogExp2
class FogHelper {
  constructor(useFogExp2 = false, fogExp2Density = 0.05) {
    this.useFogExp2 = useFogExp2;
    this.fogExp2Density = fogExp2Density;
  }
}

function main() {
  // Function to change the fog type
  function changeFogType() {
    if (FOG_HELPER.useFogExp2) {
      SCENE.fog = new THREE.FogExp2(COLOR_FOG, FOG_HELPER.fogExp2Density);
    } else {
      SCENE.fog = NORMAL_FOG;
    }
    SCENE.background = new THREE.Color(COLOR_FOG);
  }  
  
  const CANVAS = document.getElementById('canvasBase');
  const RENDERER = new THREE.WebGLRenderer({
    canvas: CANVAS,
    alpha: true
  });

  // Camera
  const FOV = 90;
  const ASPECT_RATIO = (CANVAS.width / CANVAS.height);
  const NEAR = 0.1;
  const FAR = 100;
  const CAMERA = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);
  CAMERA.position.set(2, 3, 2);
  CAMERA.lookAt(0, 0, 0);

  // Scene
  const SCENE = new THREE.Scene();
  SCENE.background = new THREE.Color('white');
  const NEAR_FOG = 1;
  const FAR_FOG = 10;
  const COLOR_FOG = 'white';   
  const NORMAL_FOG = new THREE.Fog(COLOR_FOG, NEAR_FOG, FAR_FOG);
  SCENE.fog = NORMAL_FOG;
  SCENE.background = new THREE.Color(COLOR_FOG);

  // GUI
  const GUI_FOG = new GUI();
  const FOG_HELPER = new FogHelper();
  GUI_FOG.add(FOG_HELPER, 'useFogExp2').name('Use FogExp2').onChange(changeFogType);  
  const normalFogSettings = {
    near: NEAR_FOG,
    far: FAR_FOG
  };
  
  // Normal fog gui
  const normalFogFolder = GUI_FOG.addFolder('Normal Fog');
  normalFogFolder.add(NORMAL_FOG, 'near', NEAR_FOG, FAR_FOG);
  normalFogFolder.add(NORMAL_FOG, 'far', NEAR_FOG, FAR_FOG);
  normalFogFolder.open();

  //FogExp2 (realistic) fog gui
  const FOG_EXP_2_FOLDER = GUI_FOG.addFolder('FogExp2');
  FOG_EXP_2_FOLDER.add(FOG_HELPER, 'fogExp2Density', 0.01, 0.5).name('Density').onChange(changeFogType);
  FOG_EXP_2_FOLDER.open();

  // Textures
  // We load the textures of the objects we are going to create
  const LOADER = new THREE.TextureLoader();
  const BRICKS = LOADER.load('./src/textures/bricks.jpg');
  const TILES = LOADER.load('./src/textures/tiles.jpg');
  const GROUND = LOADER.load('./src/textures/ground.png');
  const WOOD = LOADER.load('./src/textures/wood.jpg');

  // We create three spheres
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
    map: GROUND
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

// Calls the main function
main();
