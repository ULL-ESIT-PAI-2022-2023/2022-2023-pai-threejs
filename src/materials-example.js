/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Edwin Plasencia Hernández & Gerard Antony Caramazza Vilá
 * @since May 15 2022
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
    const fov = 70; // Camera's field of view
    const aspect = 2; // canvas default
    const near = 0.1; // Nearest point that will be rendered from the camera
    const far = 100; // Farthest point that will be rendered from the camera
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(4, 6, 4); // We move to camera to x=2 y=4 z=2
    camera.lookAt(0, 0, 0); // We point the camera to the origin coordinates
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('green'); // Green background
    // Phong sphere normal lighting
    const basicPhongSphereGeometry = new THREE.SphereGeometry(0.5);
    const basicPhongSphereMaterial = new THREE.MeshPhongMaterial({ // Allows for some shine
        color: 'red',
        shininess: 50
    });
    const basicPhongSphere = new THREE.Mesh(basicPhongSphereGeometry, basicPhongSphereMaterial);
    basicPhongSphere.position.set(0, 1, 0);
    scene.add(basicPhongSphere);
    // Phong sphere very shiny
    const shinyPhongSphereGeometry = new THREE.SphereGeometry(0.5);
    const shinyPhongSphereMaterial = new THREE.MeshPhongMaterial({
        color: 'red',
        shininess: 100
    });
    const shinyPhongSphere = new THREE.Mesh(shinyPhongSphereGeometry, shinyPhongSphereMaterial);
    shinyPhongSphere.position.set(1, 1, -1);
    scene.add(shinyPhongSphere);
    // Phong sphere opaque
    const opaquePhongSphereGeometry = new THREE.SphereGeometry(0.5);
    const opaquePhongSphereMaterial = new THREE.MeshPhongMaterial({
        color: 'red',
        shininess: 0
    });
    const opaquePhongSphere = new THREE.Mesh(opaquePhongSphereGeometry, opaquePhongSphereMaterial);
    opaquePhongSphere.position.set(-1, 1, 1);
    scene.add(opaquePhongSphere);
    // Standard metallic sphere
    const metallicSphereGeometry = new THREE.SphereGeometry(0.5);
    const metallicSphereMaterial = new THREE.MeshStandardMaterial({
        color: 'blue',
        metalness: 1,
        roughness: 0
    });
    const metallicSphere = new THREE.Mesh(metallicSphereGeometry, metallicSphereMaterial);
    metallicSphere.position.set(2, 1, 0);
    scene.add(metallicSphere);
    // Standard rough sphere
    const roughSphereGeometry = new THREE.SphereGeometry(0.5);
    const roughSphereMaterial = new THREE.MeshStandardMaterial({
        color: 'blue',
        metalness: 0,
        roughness: 1
    });
    const roughSphere = new THREE.Mesh(roughSphereGeometry, roughSphereMaterial);
    roughSphere.position.set(-0, 1, 2);
    scene.add(roughSphere);
    // Standard mixed sphere
    const mediumSphereGeometry = new THREE.SphereGeometry(0.5);
    const mediumSphereMaterial = new THREE.MeshStandardMaterial({
        color: 'blue',
        metalness: 0.5,
        roughness: 0.5
    });
    const mediumSphere = new THREE.Mesh(mediumSphereGeometry, mediumSphereMaterial);
    mediumSphere.position.set(1, 1, 1);
    scene.add(mediumSphere);

    // Basic material sphere
    const basicSphereGeometry = new THREE.SphereGeometry(0.5);
    const basicSphereMaterial = new THREE.MeshBasicMaterial({
        color: 'orange',
    });
    const basicSphere = new THREE.Mesh(basicSphereGeometry, basicSphereMaterial);
    basicSphere.position.set(1, 1, 3);
    scene.add(basicSphere);

    // Lambert material sphere
    const lambertSphereGeometry = new THREE.SphereGeometry(0.5);
    const lambertSphereMaterial = new THREE.MeshLambertMaterial({
        color: 'orange',
    });
    const lambertSphere = new THREE.Mesh(lambertSphereGeometry, lambertSphereMaterial);
    lambertSphere.position.set(2, 1, 2);
    scene.add(lambertSphere);

    // Phong material sphere
    const phongSphereGeometry = new THREE.SphereGeometry(0.5);
    const phongSphereMaterial = new THREE.MeshPhongMaterial({
        color: 'orange',
    });
    const phongSphere = new THREE.Mesh(phongSphereGeometry, phongSphereMaterial);
    phongSphere.position.set(3, 1, 1);
    scene.add(phongSphere);

    
    // Floor
    const floorGeometry = new THREE.PlaneGeometry(10, 10); // Now let's add a floor with dimensions 10x10
    const floorMaterial = new THREE.MeshBasicMaterial({
        color: 'purple',
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial); // We create the actual mesh with its geometry and material
    floor.rotation.x = Math.PI * -0.5; // we rotate it to make it horizontal
    scene.add(floor); // and we add it to the scene   
    // Light
    const lightColor = 'white'; // We need a basic light to be able to see the spheres
    const intensity = 1.5;
    const light = new THREE.PointLight(lightColor, intensity);
    light.position.set(10, 30, 5);
    scene.add(light);
    const helper = new THREE.PointLightHelper(light);
    scene.add(helper);
    function updateLight() {
        helper.update();
    }
    function makeXYZGUI(gui, vector3, name, onChangeFn) { // Used to change light position, has no direct relation with three.js
        const folder = gui.addFolder(name);
        folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
        folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
        folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
        folder.open();
    }
    const gui = new GUI();
    makeXYZGUI(gui, light.position, 'position', updateLight);
    // Render
    update(); // Now we call our loop function
    function update() {
        renderer.render(scene, camera);
        requestAnimationFrame(update);
    }
}
// Calls the main function
main();
