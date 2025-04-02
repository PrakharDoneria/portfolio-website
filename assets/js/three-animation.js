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
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);
  
  // Create a secondary group for background objects
  const backgroundGroup = new THREE.Group();
  scene.add(backgroundGroup);
  
  // Create the main geometry objects
  const geometries = [
    new THREE.IcosahedronGeometry(1, 0),    // Simple icosahedron
    new THREE.OctahedronGeometry(1, 0),     // Simple octahedron
    new THREE.TetrahedronGeometry(1, 0),    // Simple tetrahedron
    new THREE.TorusGeometry(0.7, 0.2, 16, 100), // Torus (donut)
    new THREE.DodecahedronGeometry(0.8, 0), // Dodecahedron
    new THREE.ConeGeometry(0.6, 1.2, 8)     // Cone
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
    }),
    new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    }),
    new THREE.MeshBasicMaterial({
      color: 0xff00aa,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    }),
    new THREE.MeshBasicMaterial({
      color: 0xffee00,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    })
  ];
  
  // Create solid materials for some objects
  const solidMaterials = [
    new THREE.MeshPhongMaterial({
      color: 0xbd00ff,
      emissive: 0x320044,
      transparent: true,
      opacity: 0.3,
      shininess: 100
    }),
    new THREE.MeshPhongMaterial({
      color: 0x00d8ff,
      emissive: 0x003a44,
      transparent: true,
      opacity: 0.3,
      shininess: 100
    })
  ];
  
  // Create and add primary meshes to our main group
  const meshes = [];
  for (let i = 0; i < 3; i++) {
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
    
    mainGroup.add(mesh);
    meshes.push({
      mesh: mesh,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      },
      orbit: {
        radius: Math.random() * 1 + 2,
        speed: (Math.random() - 0.5) * 0.005,
        angle: Math.random() * Math.PI * 2,
        y: (Math.random() - 0.5) * 3
      }
    });
  }
  
  // Add secondary objects
  const secondaryMeshes = [];
  for (let i = 3; i < geometries.length; i++) {
    const material = materials[i] || materials[i % materials.length];
    const mesh = new THREE.Mesh(geometries[i], material);
    
    // Position these further out
    const radius = 3 + Math.random() * 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    mesh.position.set(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
    
    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    
    mesh.scale.setScalar(Math.random() * 0.4 + 0.3);
    
    backgroundGroup.add(mesh);
    secondaryMeshes.push({
      mesh: mesh,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      },
      orbit: {
        radius: radius,
        speed: (Math.random() - 0.5) * 0.002,
        angle: theta,
        y: mesh.position.y
      }
    });
  }
  
  // Add some solid objects that catch light
  const solidObjects = [];
  for (let i = 0; i < 2; i++) {
    // Create a torus knot - complex and interesting shape
    const torusKnot = new THREE.TorusKnotGeometry(0.5, 0.15, 64, 8, 2, 3);
    const mesh = new THREE.Mesh(torusKnot, solidMaterials[i]);
    
    // Position these in a different area
    mesh.position.set(
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 3 - 3 // Push them back
    );
    
    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    
    mesh.scale.setScalar(Math.random() * 0.3 + 0.2);
    
    backgroundGroup.add(mesh);
    solidObjects.push({
      mesh: mesh,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      }
    });
  }
  
  // Add lighting for the solid objects
  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambientLight);
  
  const light1 = new THREE.PointLight(0xff00ff, 3, 10);
  light1.position.set(2, 2, 2);
  scene.add(light1);
  
  const light2 = new THREE.PointLight(0x00ffff, 3, 10);
  light2.position.set(-2, -2, 2);
  scene.add(light2);
  
  // Add enhanced particles with different sizes
  const particleCount = 150;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleSizes = new Float32Array(particleCount);
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    particlePositions[i3] = (Math.random() - 0.5) * 8;
    particlePositions[i3 + 1] = (Math.random() - 0.5) * 8;
    particlePositions[i3 + 2] = (Math.random() - 0.5) * 8;
    particleSizes[i] = Math.random() * 0.1 + 0.03;
  }
  
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
  
  const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.05,
    transparent: true,
    opacity: 0.7,
    vertexColors: false,
    sizeAttenuation: true
  });
  
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  backgroundGroup.add(particles);
  
  // Create a star-like effect with small bright points
  const starCount = 100;
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starCount * 3);
  
  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    // Place stars further out
    const radius = 7 + Math.random() * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    starPositions[i3 + 1] = radius * Math.cos(phi);
    starPositions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }
  
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.08,
    transparent: true,
    opacity: 0.9
  });
  
  const stars = new THREE.Points(starGeometry, starMaterial);
  backgroundGroup.add(stars);
  
  // Position camera
  camera.position.z = 6;
  
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
    
    // Current time for animations
    const time = Date.now() * 0.001;
    
    // Rotate the main group based on mouse position
    mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;
    mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
    
    // Slowly rotate the background group independently
    backgroundGroup.rotation.y += 0.001;
    backgroundGroup.rotation.x = Math.sin(time * 0.2) * 0.1;
    
    // Animate primary objects
    meshes.forEach(m => {
      // Individual rotation
      m.mesh.rotation.x += m.rotationSpeed.x;
      m.mesh.rotation.y += m.rotationSpeed.y;
      m.mesh.rotation.z += m.rotationSpeed.z;
      
      // Orbital movement
      if (m.orbit) {
        m.orbit.angle += m.orbit.speed;
        m.mesh.position.x = Math.cos(m.orbit.angle) * m.orbit.radius;
        m.mesh.position.z = Math.sin(m.orbit.angle) * m.orbit.radius;
      }
    });
    
    // Animate secondary objects
    secondaryMeshes.forEach(m => {
      // Individual rotation
      m.mesh.rotation.x += m.rotationSpeed.x;
      m.mesh.rotation.y += m.rotationSpeed.y;
      m.mesh.rotation.z += m.rotationSpeed.z;
      
      // Orbital movement on a different axis
      if (m.orbit) {
        m.orbit.angle += m.orbit.speed;
        m.mesh.position.x = Math.cos(m.orbit.angle) * m.orbit.radius;
        m.mesh.position.z = Math.sin(m.orbit.angle) * m.orbit.radius;
        // Add a slight y oscillation
        m.mesh.position.y = m.orbit.y + Math.sin(time + m.orbit.angle * 3) * 0.5;
      }
    });
    
    // Animate solid objects
    solidObjects.forEach(m => {
      m.mesh.rotation.x += m.rotationSpeed.x;
      m.mesh.rotation.y += m.rotationSpeed.y;
      m.mesh.rotation.z += m.rotationSpeed.z;
      
      // Pulsate scale
      const pulseScale = 1 + Math.sin(time * 2 + Math.PI * 2 * Math.random()) * 0.1;
      m.mesh.scale.set(pulseScale, pulseScale, pulseScale);
    });
    
    // Move lights around for dynamic lighting
    light1.position.x = Math.sin(time * 0.7) * 3;
    light1.position.y = Math.cos(time * 0.5) * 3;
    light1.position.z = Math.cos(time * 0.3) * 3;
    
    light2.position.x = Math.sin(time * 0.3 + Math.PI) * 3;
    light2.position.y = Math.cos(time * 0.5 + Math.PI) * 3;
    light2.position.z = Math.sin(time * 0.7 + Math.PI) * 3;
    
    // Make stars twinkle
    const positions = stars.geometry.attributes.position.array;
    const sizes = stars.geometry.attributes.size ? stars.geometry.attributes.size.array : null;
    
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      // Add subtle movement to stars
      positions[i3] += Math.sin(time + i) * 0.005;
      positions[i3 + 1] += Math.cos(time + i) * 0.005;
      
      // If we have size attribute, make stars twinkle
      if (sizes) {
        sizes[i] = Math.sin(time * 3 + i) * 0.5 + 0.5;
      }
    }
    
    stars.geometry.attributes.position.needsUpdate = true;
    if (stars.geometry.attributes.size) {
      stars.geometry.attributes.size.needsUpdate = true;
    }
    
    // Slow pulsating effect for main group
    const mainScale = 1 + Math.sin(time * 0.8) * 0.1;
    mainGroup.scale.set(mainScale, mainScale, mainScale);
    
    renderer.render(scene, camera);
  }
  
  animate();
}