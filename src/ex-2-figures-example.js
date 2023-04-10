import * as THREE from 'three';

'use strict'

function main() {
    const canvas = document.querySelector('#canvasBase'); // another way of getting the canvas
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas }); // renderer
    const fov = 60; // field of view: when the number gets bigger, more scene is visible
    const aspect = 2; // the canvas default
    const near = 0.1; // minimum distance required for objects to be rendered
    const far = 1000; // maximum distance required for objects to be rendered
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 35;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xAAAAAA);
    { // { } are used to avoid variable name conflicts
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(1, -2, -4);
        scene.add(light);
    }
    const objects = [];
    const spread = 15; // distance between objects
    function addObject(x, y, obj) {
        obj.position.x = x * spread;
        obj.position.y = y * spread;
        scene.add(obj);
        objects.push(obj);
    }
    function createMaterial() {
        const material = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
        });
        const hue = Math.random();
        const saturation = 1;
        const luminance = .5;
        material.color.setHSL(hue, saturation, luminance); // setHSL = setHueSaturationLuminance
        return material;
    }
    function addSolidGeometry(x, y, geometry) {
        const mesh = new THREE.Mesh(geometry, createMaterial());
        addObject(x, y, mesh);
    }
    {
        const width = 8;
        const height = 8;
        const depth = 8;
        addSolidGeometry(-1, 0.5, new THREE.BoxGeometry(width, height, depth));
    }
    {
        const radius = 7;
        const segments = 24;
        addSolidGeometry(0, 0.5, new THREE.CircleGeometry(radius, segments));
    }
    {
        const radiusTop = 4;
        const radiusBottom = 4;
        const height = 8;
        const radialSegments = 12;
        addSolidGeometry(1, 0.5, new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments));
    }
    {
        const width = 9;
        const height = 9;
        const widthSegments = 2;
        const heightSegments = 2;
        addSolidGeometry(-1, -0.5, new THREE.PlaneGeometry(width, height, widthSegments, heightSegments));
    }
    {
        const radius = 7;
        const widthSegments = 12;
        const heightSegments = 8;
        addSolidGeometry(0, -0.5, new THREE.SphereGeometry(radius, widthSegments, heightSegments));
    }
    {
        const radius = 3.5;
        const tube = 1.5;
        const radialSegments = 8;
        const tubularSegments = 64;
        const p = 2;
        const q = 3;
        addSolidGeometry(1, -0.5, new THREE.TorusKnotGeometry(radius, tube, tubularSegments, radialSegments, p, q));
    }

    function render(time) {
        time *= 0.001; // Time to seconds
        // Make objects rotate
        objects.forEach((obj, ndx) => {
            const speed = .1 + ndx * .05;
            const rot = time * speed;
            obj.rotation.x = rot;
            obj.rotation.y = rot;
        });
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}
main();