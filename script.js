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
const jefTexture = new THREE.TextureLoader().load('reactjs.png');
const jef = new THREE.Mesh(
  new THREE.SphereGeometry(0.4, 8, 8), // Use SphereGeometry instead of BoxGeometry
  new THREE.MeshBasicMaterial({ map: jefTexture })
);
jef.position.set(-5, 0, 15);
jef.scale.set(3.4, 3.4, 3.4);
scene.add(jef);

const cssTexture = new THREE.TextureLoader().load('css.png');
const css = new THREE.Mesh(
  new THREE.SphereGeometry(0.4, 8, 8), // Use SphereGeometry instead of BoxGeometry
  new THREE.MeshBasicMaterial({ map: cssTexture })
);
css.position.set(-4, 1, 10);
css.scale.set(3.4, 3.4, 3.4);
scene.add(css);

const figmaTexture = new THREE.TextureLoader().load('figma.png');
const figma = new THREE.Mesh(
  new THREE.SphereGeometry(0.4, 8, 8), // Use SphereGeometry instead of BoxGeometry
  new THREE.MeshBasicMaterial({ map: figmaTexture })
);
figma.position.set(-3, 3, 5);
figma.scale.set(3.4, 3.4, 3.4);
scene.add(figma);


jeff.position.z = -5;
jeff.position.x = 2;

// Add the text container to the body
// const textContainer = document.createElement('div');
// textContainer.id = 'text-container';
// document.body.appendChild(textContainer);

// // Create the animated text element
// const animatedText = document.createElement('h1');
// animatedText.id = 'animated-text';
// animatedText.textContent = 'Hello, World!';
// textContainer.appendChild(animatedText);

// Move the camera based on scroll
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  jef.rotation.y += 0.1;
  jef.rotation.z += 0.1;

  css.rotation.y += 0.1;
  css.rotation.z += 0.1;

  figma.rotation.y += 0.1;
  figma.rotation.z += 0.1;

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
