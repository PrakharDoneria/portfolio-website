// Three.js animation for the hero section
document.addEventListener('DOMContentLoaded', initThreeJS);

function initThreeJS() {
  const container = document.getElementById('threejs-container');
  if (!container) return;
  
  // Initialize scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  // Create a group to hold our objects
  const group = new THREE.Group();
  scene.add(group);
  
  // Create the geometry
  const geometries = [
    new THREE.IcosahedronGeometry(1, 0),  // Simple icosahedron
    new THREE.OctahedronGeometry(1, 0),   // Simple octahedron
    new THREE.TetrahedronGeometry(1, 0)   // Simple tetrahedron
  ];
  
  // Create materials with gradient colors
  const materials = [
    new THREE.MeshBasicMaterial({
      color: 0xbd00ff,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    }),
    new THREE.MeshBasicMaterial({
      color: 0x00d8ff,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    }),
    new THREE.MeshBasicMaterial({
      color: 0x00ffaa,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    })
  ];
  
  // Create and add meshes to our group
  const meshes = [];
  for (let i = 0; i < geometries.length; i++) {
    const mesh = new THREE.Mesh(geometries[i], materials[i]);
    mesh.position.set(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    );
    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    mesh.scale.setScalar(Math.random() * 0.5 + 0.5);
    
    group.add(mesh);
    meshes.push({
      mesh: mesh,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      }
    });
  }
  
  // Add some particles
  const particleCount = 100;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    particlePositions[i3] = (Math.random() - 0.5) * 5;
    particlePositions[i3 + 1] = (Math.random() - 0.5) * 5;
    particlePositions[i3 + 2] = (Math.random() - 0.5) * 5;
  }
  
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  
  const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.05,
    transparent: true,
    opacity: 0.5
  });
  
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  group.add(particles);
  
  // Position camera
  camera.position.z = 5;
  
  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;
  
  function onDocumentMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    targetRotationX = mouseY * 0.5;
    targetRotationY = mouseX * 0.5;
  }
  
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  
  // Handle window resize
  function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  
  window.addEventListener('resize', onWindowResize, false);
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the group based on mouse position
    group.rotation.x += (targetRotationX - group.rotation.x) * 0.05;
    group.rotation.y += (targetRotationY - group.rotation.y) * 0.05;
    
    // Rotate each mesh individually
    meshes.forEach(m => {
      m.mesh.rotation.x += m.rotationSpeed.x;
      m.mesh.rotation.y += m.rotationSpeed.y;
      m.mesh.rotation.z += m.rotationSpeed.z;
    });
    
    // Slow pulsating effect
    const scale = 1 + Math.sin(Date.now() * 0.001) * 0.1;
    group.scale.set(scale, scale, scale);
    
    renderer.render(scene, camera);
  }
  
  animate();
}