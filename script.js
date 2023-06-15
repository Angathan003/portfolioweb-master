// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 30);

// Create a renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create a torus
// const geometry = new THREE.TorusGeometry(10, 3, 8, 10);
// const material = new THREE.MeshStandardMaterial({ color: 0xffff00, wireframe: true });
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);

// Create lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Create stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(400).fill().forEach(addStar);

// Create an avatar
const jeffTexture = new THREE.TextureLoader().load('Angathan.jpeg');
const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));
scene.add(jeff);
jeff.position.set(2, 0, -5);




// Load the 3D model
const loader = new THREE.GLTFLoader();
let model; // Reference to the loaded model

loader.load(
  'scene.gltf',
  (gltf) => {
    model = gltf.scene;
    model.position.set(-10, 0, 30);
    model.scale.set(3, 3, 3);
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error('An error occurred while loading the model', error);
  }
);


// Create a moon
const moonGeometry = new THREE.SphereGeometry(1, 10, 5);
const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, wireframe: true });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);
moon.position.set(-10, 0, 30);

jeff.position.z = -5;
jeff.position.x = 2;

// Move the camera based on scroll
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  if (model) {
    model.rotation.y += 0.1;
    model.rotation.z += 0.1;
  }
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // jeff.rotation.x += 0.01;
  // jeff.rotation.y += 0.005;
  // jeff.rotation.z += 0.01;

  // if (model) {
  //   model.rotation.x += 0.01;
  //   model.rotation.y += 0.005;
  //   model.rotation.z += 0.01;
  // }

  renderer.render(scene, camera);
}
animate();
