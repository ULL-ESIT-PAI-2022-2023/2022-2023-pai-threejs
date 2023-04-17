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
  const CANVAS = document.getElementById('canvasBase');
  // RENDERER
  const RENDERER = new THREE.WebGLRenderer({
    antialias: true,
    canvas: CANVAS,
    alpha: true
  }); 
  // Camera
  const FOV = 60;
  const ASPECT_RATIO = (CANVAS.width / CANVAS.height);
  const NEAR = 0.1;
  const FAR = 1000;
  const CAMERA = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);
  CAMERA.position.z = 35;
  // Camera controls
  const CONTROLS = new OrbitControls(CAMERA, RENDERER.domElement);
  // Scene
  const SCENE = new THREE.Scene();
  SCENE.background = new THREE.Color('LightGray');

  // Light
  {
    const COLOR = 'white';
    const INTENSITY = 1;
    const LIGHT = new THREE.DirectionalLight(COLOR, INTENSITY);
    LIGHT.position.set(-1, 2, 4);
    SCENE.add(LIGHT);
  }
  const OBJECTS = [];
  const SPREAD = 15; // distance between OBJECTS
  // Add object to SCENE
  function addObject(x, y, obj) {
    obj.position.x = x * SPREAD;
    obj.position.y = y * SPREAD;
    SCENE.add(obj);
    OBJECTS.push(obj);
  }
  // Create MATERIAL of random colour
  function createMaterial() {
    const MATERIAL = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
    });
    const HUE = Math.random();
    const SATURATION = 1;
    const LUMINANCE = .5;
    MATERIAL.color.setHSL(HUE, SATURATION, LUMINANCE); // setHSL = setHueSaturationLuminance
    return MATERIAL;
  }
  function addSolidGeometry(x, y, geometry) {
    const MESH = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, MESH);
  }
  // Box
  {
    const WIDTH = 8;
    const HEIGHT = 8;
    const DEPTH = 8;
    addSolidGeometry(-1, 0.5, new THREE.BoxGeometry(WIDTH, HEIGHT, DEPTH));
  }
  // Circle
  {
    const RADIUS = 7;
    const SEGMENTS = 24;
    addSolidGeometry(0, 0.5, new THREE.CircleGeometry(RADIUS, SEGMENTS));
  }
  // Cylinder
  {
    const RADIUS_TOP = 4;
    const RADIUS_BOTTOM = 4;
    const HEIGHT = 8;
    const RADIAL_SEGMENTS = 12;
    addSolidGeometry(1, 0.5, new THREE.CylinderGeometry(RADIUS_TOP, RADIUS_BOTTOM, HEIGHT, RADIAL_SEGMENTS));
  }
  // Plane
  {
    const WIDTH = 9;
    const HEIGHT = 9;
    const WIDTH_SEGMENTS = 2;
    const HEIGHT_SEGMENTS = 2;
    addSolidGeometry(-1, -0.5, new THREE.PlaneGeometry(WIDTH, HEIGHT, WIDTH_SEGMENTS, HEIGHT_SEGMENTS));
  }
  // Sphere
  {
    const RADIUS = 7;
    const WIDTH_SEGMENTS = 12;
    const HEIGHT_SEGMENTS = 8;
    addSolidGeometry(0, -0.5, new THREE.SphereGeometry(RADIUS, WIDTH_SEGMENTS, HEIGHT_SEGMENTS));
  }
  // Torus Knot
  {
    const RADIUS = 3.5;
    const TUBE = 1.5;
    const RADIAL_SEGMENTS = 8;
    const TUBULAR_SEGMENTS = 64;
    const P_VALUE = 2; // Number of times it wraps around the torus' meridian
    const Q_VALUE = 4; // Number of times it wraps around the torus' equator
    addSolidGeometry(1, -0.5, new THREE.TorusKnotGeometry(RADIUS, TUBE, TUBULAR_SEGMENTS, RADIAL_SEGMENTS, P_VALUE, Q_VALUE));
  }

  // Render
  function update(time) {
    time *= 0.001; // Time to seconds
    // Make OBJECTS rotate
    OBJECTS.forEach((object, index) => {
      const SPEED = .1 + index * .1;
      const ROTATION = time * SPEED;
      object.rotation.x = ROTATION;
      object.rotation.y = ROTATION;
    });
    RENDERER.render(SCENE, CAMERA);
    CONTROLS.update();
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
main();
