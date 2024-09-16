// Create the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;  // Move the camera back a bit so the globe is in view

// Set up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // For sharper rendering on high-DPI screens
document.body.appendChild(renderer.domElement);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft ambient light
scene.add(ambientLight);

// Add point light (to simulate sunlight)
const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Load the Earth textures (diffuse map, bump map, and specular map)
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
const bumpMap = textureLoader.load('https://threejs.org/examples/textures/planets/earth_bump_2048.jpg');
const specularMap = textureLoader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg');

// Create the sphere geometry for the globe (radius, width segments, height segments)
const geometry = new THREE.SphereGeometry(2, 64, 64);

// Create the material for the globe, applying the textures
const material = new THREE.MeshPhongMaterial({
    map: earthTexture,        // Earth texture (diffuse)
    bumpMap: bumpMap,         // Bump map for surface relief
    bumpScale: 0.05,          // Intensity of the bump map effect
    specularMap: specularMap, // Specular map for shiny water areas
    specular: new THREE.Color('gray') // Color of specular reflection
});

// Create the globe mesh and apply the material
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Create stars (randomly scattered points)
function createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = -Math.random() * 2000;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}
createStars();

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Handle mouse movement (hover-based rotation)
let mouseX = 0;
let mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;
});

// Create the render loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the globe slowly (Earth-like rotation)
    globe.rotation.y += 0.005;

    // Rotate the globe based on the mouse position (hover effect)
    globe.rotation.x += (mouseY - globe.rotation.x) * 0.05;
    globe.rotation.y += (mouseX - globe.rotation.y) * 0.05;

    renderer.render(scene, camera);
}

// Start the animation
animate();
