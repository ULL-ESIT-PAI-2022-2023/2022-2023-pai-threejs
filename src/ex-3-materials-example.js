/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Francisco Marqués Armas y Julio Carrasco Armas
 * @since Apr 4 2023
 * @desc Basic materials with three.js
 */
import * as THREE from '../node_modules/three/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';

'use strict';

function main() {
  const CANVAS = document.getElementById('canvasBase'); // Canvas
  const RENDERER = new THREE.WebGLRenderer({
    canvas: CANVAS,
    alpha: true // The canvas will accept transparency
  });

  // Camera
  const FOV = 70;
  const ASPECT_RATIO = (CANVAS.width / CANVAS.height);
  const NEAR = 0.1;
  const FAR = 100;
  const CAMERA = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);
  CAMERA.position.set(4, 6, 4);
  CAMERA.lookAt(0, 0, 0);

  // Camera controls
  const CONTROLS = new OrbitControls(CAMERA, RENDERER.domElement);

  // Scene
  const SCENE = new THREE.Scene();

  // Light blue background
  SCENE.background = new THREE.Color('#DDFEFF');

  // Light
  const LIGHT_COLOR = 'white';
  const INTENSITY = 1;
  const LIGHT = new THREE.PointLight(LIGHT_COLOR, INTENSITY);
  LIGHT.position.set(10, 30, 5);
  SCENE.add(LIGHT);

  // Floor
  const FLOOR_GEOMETRY = new THREE.PlaneGeometry(10, 10);
  const FLOOR_MATERIAL = new THREE.MeshBasicMaterial({
    color: '#6D6D6D',
  });
  const FLOOR = new THREE.Mesh(FLOOR_GEOMETRY, FLOOR_MATERIAL);
  FLOOR.rotation.x = Math.PI * -0.5;
  SCENE.add(FLOOR);

  // Phong material has shininess property
  // Phong sphere normal lighting
  const BASIC_PHONG_GEOMETRY = new THREE.SphereGeometry(0.5);
  const BASIC_PHONG_MATERIAL = new THREE.MeshPhongMaterial({
    color: 'red',
    shininess: 50
  });
  const BASIC_PHONG_SPHERE = new THREE.Mesh(BASIC_PHONG_GEOMETRY, BASIC_PHONG_MATERIAL);
  BASIC_PHONG_SPHERE.position.set(1, 1, 1);
  SCENE.add(BASIC_PHONG_SPHERE);

  // Phong sphere very shiny
  const SHINY_PHONG_GEOMETRY = new THREE.SphereGeometry(0.5);
  const SHINY_PHONG_MATERIAL = new THREE.MeshPhongMaterial({
    color: 'red',
    shininess: 100
  });
  const SHINY_PHONG_SPHERE = new THREE.Mesh(SHINY_PHONG_GEOMETRY, SHINY_PHONG_MATERIAL);
  SHINY_PHONG_SPHERE.position.set(2, 1, 0);
  SCENE.add(SHINY_PHONG_SPHERE);

  // Phong sphere opaque
  const OPAQUE_PHONG_GEOMETRY = new THREE.SphereGeometry(0.5);
  const OPAQUE_PHONG_MATERIAL = new THREE.MeshPhongMaterial({
    color: 'red',
    shininess: 0
  });
  const OPAQUE_PHONG_SPHERE = new THREE.Mesh(OPAQUE_PHONG_GEOMETRY, OPAQUE_PHONG_MATERIAL);
  OPAQUE_PHONG_SPHERE.position.set(0, 1, 2);
  SCENE.add(OPAQUE_PHONG_SPHERE);

  // Standard material has metalness and roughness
  // Standard metallic sphere
  const METALLIC_SPHERE_GEOMETRY = new THREE.SphereGeometry(0.5);
  const METALLIC_SPHERE_MATERIAL = new THREE.MeshStandardMaterial({
    color: 'blue',
    metalness: 1,
    roughness: 0
  });
  const METALLIC_SPHERE = new THREE.Mesh(METALLIC_SPHERE_GEOMETRY, METALLIC_SPHERE_MATERIAL);
  METALLIC_SPHERE.position.set(1, 1, -1);
  SCENE.add(METALLIC_SPHERE);

  // Standard rough sphere
  const ROUGH_SPHERE_GEOMETRY = new THREE.SphereGeometry(0.5);
  const ROUGH_SPHERE_MATERIAL = new THREE.MeshStandardMaterial({
    color: 'blue',
    metalness: 0,
    roughness: 1
  });
  const ROUGH_SPHERE = new THREE.Mesh(ROUGH_SPHERE_GEOMETRY, ROUGH_SPHERE_MATERIAL);
  ROUGH_SPHERE.position.set(-1, 1, 1);
  SCENE.add(ROUGH_SPHERE);

  // Standard mixed sphere
  const MEDIUM_SPHERE_GEOMETRY = new THREE.SphereGeometry(0.5);
  const MEDIUM_SPHERE_MATERIAL = new THREE.MeshStandardMaterial({
    color: 'blue',
    metalness: 0.5,
    roughness: 0.5
  });
  const MEDIUM_SPHERE = new THREE.Mesh(MEDIUM_SPHERE_GEOMETRY, MEDIUM_SPHERE_MATERIAL);
  MEDIUM_SPHERE.position.set(0, 1, 0);
  SCENE.add(MEDIUM_SPHERE);

  // Lambert material sphere
  const LAMBERT_DIM_SPHERE_GEOMETRY = new THREE.SphereGeometry(0.5);
  const LAMBERT_DIM_SPHERE_MATERIAL = new THREE.MeshLambertMaterial({
    color: 'orange',
    emissive: 0x004a4a,
    emissiveIntensity: 0,
  });
  const LAMBERT_DIM_SPHERE = new THREE.Mesh(LAMBERT_DIM_SPHERE_GEOMETRY, LAMBERT_DIM_SPHERE_MATERIAL);
  LAMBERT_DIM_SPHERE.position.set(1, 1, 3);
  SCENE.add(LAMBERT_DIM_SPHERE);

  // Lambert material sphere
  const LAMBERT_HALF_SPHERE_GEOMETRY = new THREE.SphereGeometry(0.5);
  const LAMBERT_HALF_SPHERE_MATERIAL = new THREE.MeshLambertMaterial({
    color: 'orange',
    emissive: 0x004a4a,
    emissiveIntensity: 0.5,
  });
  const LAMBERT_HALF_SPHERE = new THREE.Mesh(LAMBERT_HALF_SPHERE_GEOMETRY, LAMBERT_HALF_SPHERE_MATERIAL);
  LAMBERT_HALF_SPHERE.position.set(2, 1, 2);
  SCENE.add(LAMBERT_HALF_SPHERE);

  // Lambert material sphere
  const LAMBERT_FULL_SPHERE_GEOMETRY = new THREE.SphereGeometry(0.5);
  const LAMBERT_FULL_SPHERE_MATERIAL = new THREE.MeshLambertMaterial({
    color: 'orange',
    emissive: 0x004a4a,
    emissiveIntensity: 1,
  });
  const LAMBERT_FULL_SPHERE = new THREE.Mesh(LAMBERT_FULL_SPHERE_GEOMETRY, LAMBERT_FULL_SPHERE_MATERIAL);
  LAMBERT_FULL_SPHERE.position.set(3, 1, 1);
  SCENE.add(LAMBERT_FULL_SPHERE);

  // Basic material sphere
  const BASIC_SPHERE_GEOMETRY = new THREE.SphereGeometry(0.5);
  const BASIC_SPHERE_MATERIAL = new THREE.MeshBasicMaterial({
    color: 'green',
  });
  const BASIC_SPHERE = new THREE.Mesh(BASIC_SPHERE_GEOMETRY, BASIC_SPHERE_MATERIAL);
  BASIC_SPHERE.position.set(3, 1, 3);
  SCENE.add(BASIC_SPHERE);


  // Render
  function update() {
    RENDERER.render(SCENE, CAMERA);
    CONTROLS.update();
    requestAnimationFrame(update);
  }

  update();
}

main();
