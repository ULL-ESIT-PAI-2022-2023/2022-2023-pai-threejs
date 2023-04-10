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
import {GUI} from 'https://threejs.org/examples/jsm/libs/lil-gui.module.min.js';

'use strict';

function main() {
    let canvas = document.getElementById('canvasBase'); // Canvas
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true // The canvas will accept transparency
    });
    const FOV = 70; // Camera's field of view
    const ASPECT_RATIO = 2; // canvas default
    const NEAR = 0.1; // Nearest point that will be rendered from the camera
    const FAR = 100; // Farthest point that will be rendered from the camera
    const camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);
    camera.position.set(4, 6, 4); // We move to camera to x=2 y=4 z=2
    camera.lookAt(0, 0, 0); // We point the camera to the origin coordinates
    const SCENE = new THREE.Scene();
    SCENE.background = new THREE.Color('green'); // Green background
    // Phong sphere normal lighting
    const BASIC_PHONG_GEOMETRY = new THREE.SphereGeometry(0.5);
    const BASIC_PHONG_MATERIAL = new THREE.MeshPhongMaterial({ // Allows for some shine
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

    // Basic material sphere
    const BASIC_SPHERE_GEOMETRY = new THREE.SphereGeometry(0.5);
    const BASIC_SPHERE_MATERIAL = new THREE.MeshBasicMaterial({
        color: 'orange',
    });
    const BASIC_SPHERE = new THREE.Mesh(BASIC_SPHERE_GEOMETRY, BASIC_SPHERE_MATERIAL);
    BASIC_SPHERE.position.set(1, 1, 3);
    SCENE.add(BASIC_SPHERE);

    // Lambert material sphere
    const LAMBERT_SPHERE_GEOMETRY = new THREE.SphereGeometry(0.5);
    const LAMBERT_SPHERE_MATERIAL = new THREE.MeshLambertMaterial({
        color: 'orange',
    });
    const LAMBERT_SPHERE = new THREE.Mesh(LAMBERT_SPHERE_GEOMETRY, LAMBERT_SPHERE_MATERIAL);
    LAMBERT_SPHERE.position.set(2, 1, 2);
    SCENE.add(LAMBERT_SPHERE);

    // Phong material sphere
    const PHONG_SPHERE_GEOMETRY = new THREE.SphereGeometry(0.5);
    const PHONG_SPHERE_MATERIAL = new THREE.MeshPhongMaterial({
        color: 'orange',
    });
    const PHONG_SPHERE = new THREE.Mesh(PHONG_SPHERE_GEOMETRY, PHONG_SPHERE_MATERIAL);
    PHONG_SPHERE.position.set(3, 1, 1);
    SCENE.add(PHONG_SPHERE);

    
    // Floor
    const FLOOR_GEOMETRY = new THREE.PlaneGeometry(10, 10); // Now let's add a FLOOR with dimensions 10x10
    const FLOOR_MATERIAL = new THREE.MeshBasicMaterial({
        color: 'purple',
    });
    const FLOOR = new THREE.Mesh(FLOOR_GEOMETRY, FLOOR_MATERIAL); // We create the actual mesh with its geometry and material
    FLOOR.rotation.x = Math.PI * -0.5; // we rotate it to make it horizontal
    SCENE.add(FLOOR); // and we add it to the SCENE   
    // Light
    const LIGHT_COLOR = 'white'; // We need a basic LIGHT to be able to see the spheres
    const INTENSITY = 1.5;
    const LIGHT = new THREE.PointLight(LIGHT_COLOR, INTENSITY);
    LIGHT.position.set(10, 30, 5);
    SCENE.add(LIGHT);
    const HELPER = new THREE.PointLightHelper(LIGHT);
    SCENE.add(HELPER);
    function updateLight() {
        HELPER.update();
    }
    function makeXYZGUI(gui, vector3, name, onChangeFn) { // Used to change LIGHT position, has no direct relation with three.js
        const folder = gui.addFolder(name);
        folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
        folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
        folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
        folder.open();
    }
    let gui = new GUI();
    makeXYZGUI(gui, LIGHT.position, 'position', updateLight);
    // Render
    update(); // Now we call our loop function
    function update() {
        renderer.render(SCENE, camera);
        requestAnimationFrame(update);
    }
}
// Calls the main function
main();
