import * as THREE from 'three';

function main() {
  const canvas = document.querySelector('#canvasBase')!;
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // greenish blue

  const cube = new THREE.Mesh(boxGeometry, material);

  // TORUS KNOT
  const torusKnotRadius  = 3.5;
  const torusKnotTubeRadius = 1.5;
  const torusKnotRadialSegments = 8;
  const torusKnotTubularSegments = 64;
  const torusKnotPValue = 2;
  const torusKnotQValue = 3;
  const torusKnotGeometry = new THREE.TorusKnotGeometry(torusKnotRadius, 
    torusKnotTubeRadius, torusKnotRadialSegments, torusKnotTubularSegments,
    torusKnotPValue, torusKnotQValue);
  const torusKnotMaterial = new THREE.MeshPhongMaterial({color: 0x42aa88});

  const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
  torusKnot.position.set(2, 2, 2);
  scene.add(cube);
  scene.add(torusKnot);
  function render(time: number) {
    time *= 0.001;  // convert time to seconds

    cube.rotation.x = time;
    cube.rotation.y = time;

    torusKnot.rotation.x = time;
    torusKnot.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

}

main();
