// Three.js Animation
document.addEventListener('DOMContentLoaded', function() {
  console.log('Three.js script loaded');
  initThreeJS();
});

function initThreeJS() {
  const container = document.getElementById('threejs-container');
  if (!container) return;
  
  // Scene setup
  const scene = new THREE.Scene();
  
  // Camera setup
  const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  camera.position.z = 5;
  
  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.setClearColor(0x000000, 0); // transparent background
  container.appendChild(renderer.domElement);
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambientLight);
  
  const pointLight = new THREE.PointLight(0x6633ff, 2, 50);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);
  
  const pointLight2 = new THREE.PointLight(0xff3366, 2, 50);
  pointLight2.position.set(-10, -10, 10);
  scene.add(pointLight2);
  
  // Create geometric objects
  const objects = [];
  
  // Torus
  const torusGeometry = new THREE.TorusGeometry(1.5, 0.4, 16, 100);
  const torusMaterial = new THREE.MeshStandardMaterial({
    color: 0x9900ff,
    metalness: 0.7,
    roughness: 0.3,
    wireframe: false
  });
  const torus = new THREE.Mesh(torusGeometry, torusMaterial);
  torus.position.set(0, 0, 0);
  scene.add(torus);
  objects.push(torus);
  
  // Smaller objects orbiting the torus
  const smallObjectsCount = 5;
  const smallGeometries = [
    new THREE.TetrahedronGeometry(0.3),
    new THREE.OctahedronGeometry(0.3),
    new THREE.IcosahedronGeometry(0.3),
    new THREE.DodecahedronGeometry(0.3),
    new THREE.SphereGeometry(0.2, 32, 32)
  ];
  
  const colors = [0x00ffff, 0xff00ff, 0xffff00, 0x00ff66, 0xff6600];
  
  for (let i = 0; i < smallObjectsCount; i++) {
    const geometry = smallGeometries[i % smallGeometries.length];
    const material = new THREE.MeshStandardMaterial({
      color: colors[i % colors.length],
      metalness: 0.7,
      roughness: 0.2
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    
    // Position in a circle around the torus
    const angle = (i / smallObjectsCount) * Math.PI * 2;
    const radius = 3;
    
    mesh.position.x = Math.cos(angle) * radius;
    mesh.position.y = Math.sin(angle) * radius;
    mesh.position.z = (Math.random() - 0.5) * 2;
    
    scene.add(mesh);
    objects.push(mesh);
  }
  
  // Mouse interaction variables
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let windowHalfX = container.offsetWidth / 2;
  let windowHalfY = container.offsetHeight / 2;
  
  // Handle window resize
  window.addEventListener('resize', function() {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    
    windowHalfX = container.offsetWidth / 2;
    windowHalfY = container.offsetHeight / 2;
  });
  
  // Handle mouse movement
  document.addEventListener('mousemove', function(event) {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;
  });
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Smooth rotation towards target
    targetRotationX += (mouseX - targetRotationX) * 0.05;
    targetRotationY += (mouseY - targetRotationY) * 0.05;
    
    // Rotate torus
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    
    // Rotate and orbit small objects
    objects.forEach((obj, index) => {
      if (obj !== torus) {
        // Rotate object
        obj.rotation.x += 0.02 + (index * 0.005);
        obj.rotation.y += 0.03 - (index * 0.005);
        
        // Orbit around center
        const time = Date.now() * 0.001;
        const radius = 3;
        const speed = 0.5 - (index * 0.1);
        
        obj.position.x = Math.cos(time * speed + index) * radius;
        obj.position.y = Math.sin(time * speed + index) * radius;
        obj.position.z = Math.sin(time * speed * 0.5) * 1.5;
      }
    });
    
    // Apply mouse-based rotation to entire scene
    scene.rotation.x = targetRotationY * 0.5;
    scene.rotation.y = targetRotationX * 0.5;
    
    renderer.render(scene, camera);
  }
  
  animate();
}