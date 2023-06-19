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
    model.position.set(-10, 0, 21);
    model.scale.set(3, 3, 3);
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error('An error occurred while loading the model', error);
  }
);
jeff.position.z = -5;
jeff.position.x = 2;



const moon3 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 10, 5),
  new THREE.MeshBasicMaterial({
    color: 0xffff00,
    trasparent: true,
    wireframe: true
    // map: moonTexture,
    // normalMap: normalTexture,
  })
);
scene.add(moon3);
moon3.position.z = 9;
moon3.position.setX(-10);

var geometr = new THREE.BoxBufferGeometry(1, 1, 1);

// Extract the vertices from the geometry
var vertices = geometr.attributes.position.array;

// Create a new buffer geometry for the cube edges
var edgeGeometry = new THREE.BufferGeometry();
var vertices = [
  new THREE.Vector3(-1, -1, -1),
  new THREE.Vector3(-1, -1, 1),
  new THREE.Vector3(-1, 1, -1),
  new THREE.Vector3(-1, 1, 1),
  new THREE.Vector3(1, -1, -1),
  new THREE.Vector3(1, -1, 1),
  new THREE.Vector3(1, 1, -1),
  new THREE.Vector3(1, 1, 1)
];

// Define the 12 edges of the cube, each edge is a pair of vertices
var edges = [
  [vertices[0], vertices[1]],
  [vertices[0], vertices[2]],
  [vertices[0], vertices[4]],
  [vertices[3], vertices[1]],
  [vertices[3], vertices[2]],
  [vertices[3], vertices[7]],
  [vertices[5], vertices[1]],
  [vertices[5], vertices[4]],
  [vertices[5], vertices[7]],
  [vertices[6], vertices[2]],
  [vertices[6], vertices[4]],
  [vertices[6], vertices[7]]
];

// Create material
var materia = new THREE.MeshBasicMaterial({color: 0x00ff00});

// Loop over each edge and create a thin box for the edge
edges.forEach(edge => {
  var start = edge[0], end = edge[1];

  // Compute the center of the box
  var center = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

  // Compute the length of the box
  var length = new THREE.Vector3().subVectors(start, end).length();

  // Create geometry
  var geometry = new THREE.BoxGeometry(0.05, 0.05, length);

  // Create mesh
  var mesh = new THREE.Mesh(geometry, materia);

  // Position the mesh at the center of the box
  mesh.position.copy(center);

  // Orient the mesh along the box
  mesh.lookAt(start);

  // Add the mesh to the scene
  scene.add(mesh);
});


// Move the camera based on scroll
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;
  // console.log("camera.position.x");

  // console.log(camera.position.x);
  // console.log("camera.position.y");
  // console.log(camera.position.y);
  // console.log("camera.position.z");
  // console.log(camera.position.z);

  moon3.rotation.x += 0.05;
  moon3.rotation.y += 0.075;
  moon3.rotation.z += 0.05;

  if (model) {
    model.rotation.y += 0.1;
    model.rotation.z += 0.1;
  }
}

// moon.rotation.y += 0.01;
// moon.rotation.z += 0.01;

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
