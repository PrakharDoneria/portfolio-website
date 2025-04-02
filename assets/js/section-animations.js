// Section-specific 3D animations
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all section animations
  initSkillsAnimation();
  initProjectsAnimation();
  initAPIsAnimation();
  
  // Add scroll event listener for animation triggers
  window.addEventListener('scroll', () => {
    checkVisibility();
  });
});

// Check if sections are visible and start/stop animations accordingly
function checkVisibility() {
  const sections = [
    { id: 'skills-animation-container', func: updateSkillsAnimation },
    { id: 'projects-animation-container', func: updateProjectsAnimation },
    { id: 'apis-animation-container', func: updateAPIsAnimation }
  ];
  
  sections.forEach(section => {
    const container = document.getElementById(section.id);
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const isVisible = (
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom > 0
    );
    
    // Set data attribute for visibility state
    if (isVisible !== (container.dataset.visible === 'true')) {
      container.dataset.visible = isVisible;
      // Call the section's update function with visibility state
      section.func(isVisible);
    }
  });
}

// Skills Section Animation
let skillsScene, skillsCamera, skillsRenderer, skillsObjects = [];
let skillsAnimating = false;

function initSkillsAnimation() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  
  // Create animation container
  const container = document.createElement('div');
  container.id = 'skills-animation-container';
  container.className = 'section-animation';
  container.dataset.visible = false;
  skillsSection.appendChild(container);
  
  // Set up Three.js scene
  skillsScene = new THREE.Scene();
  
  // Use perspective camera with narrower FOV for this section
  skillsCamera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  skillsCamera.position.z = 5;
  
  // Set up renderer
  skillsRenderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true
  });
  skillsRenderer.setSize(container.clientWidth, container.clientHeight);
  skillsRenderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(skillsRenderer.domElement);
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  skillsScene.add(ambientLight);
  
  // Add directional light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  skillsScene.add(light);
  
  // Create skill orbs
  createSkillOrbs();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    if (!skillsRenderer) return;
    
    skillsCamera.aspect = container.clientWidth / container.clientHeight;
    skillsCamera.updateProjectionMatrix();
    skillsRenderer.setSize(container.clientWidth, container.clientHeight);
  });
  
  // Start animation loop
  animateSkills();
}

function createSkillOrbs() {
  const orbCount = 7;
  const colors = [0x00d8ff, 0xbd00ff, 0x00ffaa, 0xff6b00, 0xffee00];
  
  for (let i = 0; i < orbCount; i++) {
    // Create a sphere geometry
    const geometry = new THREE.SphereGeometry(0.3, 32, 32);
    
    // Create a phong material for a shiny look
    const material = new THREE.MeshPhongMaterial({
      color: colors[i % colors.length],
      transparent: true,
      opacity: 0.8,
      shininess: 100
    });
    
    // Create mesh and position randomly
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 3
    );
    
    // Store animation parameters
    const obj = {
      mesh: mesh,
      pulse: {
        speed: 0.5 + Math.random() * 2,
        min: 0.8,
        max: 1.2
      },
      orbit: {
        speed: 0.005 + (Math.random() * 0.02),
        radius: 1 + Math.random() * 3,
        angle: Math.random() * Math.PI * 2,
        yOffset: (Math.random() - 0.5) * 3
      }
    };
    
    skillsScene.add(mesh);
    skillsObjects.push(obj);
  }
  
  // Add glowing particle ring
  const ringGeometry = new THREE.BufferGeometry();
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 2.5;
    
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
  }
  
  ringGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const ringMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.08,
    transparent: true,
    opacity: 0.7
  });
  
  const ring = new THREE.Points(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2; // Make the ring flat/horizontal
  
  skillsScene.add(ring);
  skillsObjects.push({
    mesh: ring,
    rotation: {
      speed: 0.003
    }
  });
}

function animateSkills() {
  requestAnimationFrame(animateSkills);
  
  // Only update if the animation is active
  if (skillsAnimating && skillsScene && skillsRenderer) {
    const time = Date.now() * 0.001;
    
    // Update skill orbs
    skillsObjects.forEach(obj => {
      const mesh = obj.mesh;
      
      // Rotation effect
      if (obj.rotation) {
        mesh.rotation.y += obj.rotation.speed;
      }
      
      // Orbit effect
      if (obj.orbit) {
        obj.orbit.angle += obj.orbit.speed;
        mesh.position.x = Math.cos(obj.orbit.angle) * obj.orbit.radius;
        mesh.position.z = Math.sin(obj.orbit.angle) * obj.orbit.radius;
        mesh.position.y = obj.orbit.yOffset + Math.sin(time + obj.orbit.angle * 2) * 0.5;
      }
      
      // Pulse effect
      if (obj.pulse) {
        const scale = obj.pulse.min + Math.sin(time * obj.pulse.speed) * 
                     (obj.pulse.max - obj.pulse.min);
        mesh.scale.set(scale, scale, scale);
      }
    });
    
    // Camera movement
    skillsCamera.position.y = Math.sin(time * 0.2) * 0.5;
    skillsCamera.lookAt(0, 0, 0);
    
    // Render the scene
    skillsRenderer.render(skillsScene, skillsCamera);
  }
}

function updateSkillsAnimation(isVisible) {
  skillsAnimating = isVisible;
}

// Projects Section Animation
let projectsScene, projectsCamera, projectsRenderer;
let projectsGroup, projectsAnimating = false;

function initProjectsAnimation() {
  const projectsSection = document.getElementById('projects');
  if (!projectsSection) return;
  
  // Create animation container
  const container = document.createElement('div');
  container.id = 'projects-animation-container';
  container.className = 'section-animation projects-animation';
  container.dataset.visible = false;
  projectsSection.appendChild(container);
  
  // Set up Three.js scene
  projectsScene = new THREE.Scene();
  
  // Create camera
  projectsCamera = new THREE.PerspectiveCamera(
    70,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  projectsCamera.position.z = 5;
  projectsCamera.position.y = 2;
  projectsCamera.lookAt(0, 0, 0);
  
  // Set up renderer
  projectsRenderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true
  });
  projectsRenderer.setSize(container.clientWidth, container.clientHeight);
  projectsRenderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(projectsRenderer.domElement);
  
  // Create a group to hold all objects
  projectsGroup = new THREE.Group();
  projectsScene.add(projectsGroup);
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  projectsScene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  projectsScene.add(directionalLight);
  
  // Create 3D grid
  createProjectsGrid();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    if (!projectsRenderer) return;
    
    projectsCamera.aspect = container.clientWidth / container.clientHeight;
    projectsCamera.updateProjectionMatrix();
    projectsRenderer.setSize(container.clientWidth, container.clientHeight);
  });
  
  // Start animation
  animateProjects();
}

function createProjectsGrid() {
  // Create a grid of cubes
  const gridSize = 5;
  const spacing = 1.5;
  
  for (let x = -gridSize/2; x < gridSize/2; x++) {
    for (let z = -gridSize/2; z < gridSize/2; z++) {
      // Skip some cubes randomly for a more interesting pattern
      if (Math.random() < 0.7) {
        const height = Math.random() * 2 + 0.1;
        
        // Create a box geometry
        const geometry = new THREE.BoxGeometry(0.5, height, 0.5);
        
        // Determine color based on position
        const hue = ((x + gridSize/2) / gridSize) * 0.5 + 
                   ((z + gridSize/2) / gridSize) * 0.5;
        const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
        
        // Create material
        const material = new THREE.MeshPhongMaterial({
          color: color,
          transparent: true,
          opacity: 0.8,
          shininess: 30
        });
        
        // Create mesh
        const cube = new THREE.Mesh(geometry, material);
        
        // Position cube in grid
        cube.position.set(x * spacing, height/2, z * spacing);
        
        // Add animation properties
        cube.userData = {
          initialHeight: height,
          pulseSpeed: Math.random() * 2 + 1,
          pulseAmount: Math.random() * 0.5 + 0.5
        };
        
        projectsGroup.add(cube);
      }
    }
  }
  
  // Add connecting lines
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.2
  });
  
  // Create horizontal grid lines
  for (let x = -gridSize/2; x <= gridSize/2; x++) {
    const lineGeometry = new THREE.BufferGeometry();
    const points = [
      new THREE.Vector3(x * spacing, 0.1, -gridSize/2 * spacing),
      new THREE.Vector3(x * spacing, 0.1, gridSize/2 * spacing)
    ];
    lineGeometry.setFromPoints(points);
    const line = new THREE.Line(lineGeometry, lineMaterial);
    projectsGroup.add(line);
  }
  
  // Create vertical grid lines
  for (let z = -gridSize/2; z <= gridSize/2; z++) {
    const lineGeometry = new THREE.BufferGeometry();
    const points = [
      new THREE.Vector3(-gridSize/2 * spacing, 0.1, z * spacing),
      new THREE.Vector3(gridSize/2 * spacing, 0.1, z * spacing)
    ];
    lineGeometry.setFromPoints(points);
    const line = new THREE.Line(lineGeometry, lineMaterial);
    projectsGroup.add(line);
  }
}

function animateProjects() {
  requestAnimationFrame(animateProjects);
  
  if (projectsAnimating && projectsScene && projectsRenderer) {
    const time = Date.now() * 0.001;
    
    // Rotate the entire grid slowly
    projectsGroup.rotation.y = Math.sin(time * 0.2) * 0.3;
    
    // Animate each cube
    projectsGroup.children.forEach(child => {
      if (child.type === 'Mesh' && child.userData) {
        const { initialHeight, pulseSpeed, pulseAmount } = child.userData;
        const newHeight = initialHeight + Math.sin(time * pulseSpeed) * pulseAmount;
        
        // Scale the height
        child.scale.y = newHeight / initialHeight;
        
        // Also adjust y position to keep the bottom at ground level
        child.position.y = (newHeight / 2);
        
        // Subtle color shift
        if (child.material && child.material.color) {
          const hue = (child.position.x + child.position.z + time * 0.1) % 1;
          child.material.color.setHSL(hue, 0.8, 0.5);
        }
      }
    });
    
    // Update camera position slightly
    projectsCamera.position.x = Math.sin(time * 0.3) * 1;
    projectsCamera.lookAt(0, 0, 0);
    
    // Render scene
    projectsRenderer.render(projectsScene, projectsCamera);
  }
}

function updateProjectsAnimation(isVisible) {
  projectsAnimating = isVisible;
}

// APIs Section Animation
let apisScene, apisCamera, apisRenderer;
let apisObjects = [], apisAnimating = false;

function initAPIsAnimation() {
  const apisSection = document.getElementById('apis');
  if (!apisSection) return;
  
  // Create animation container
  const container = document.createElement('div');
  container.id = 'apis-animation-container';
  container.className = 'section-animation apis-animation';
  container.dataset.visible = false;
  apisSection.appendChild(container);
  
  // Set up Three.js scene
  apisScene = new THREE.Scene();
  
  // Create camera
  apisCamera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  apisCamera.position.z = 15;
  
  // Set up renderer
  apisRenderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true
  });
  apisRenderer.setSize(container.clientWidth, container.clientHeight);
  apisRenderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(apisRenderer.domElement);
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  apisScene.add(ambientLight);
  
  const light1 = new THREE.PointLight(0xff00ff, 2, 20);
  light1.position.set(5, 5, 5);
  apisScene.add(light1);
  
  const light2 = new THREE.PointLight(0x00ffff, 2, 20);
  light2.position.set(-5, -5, 5);
  apisScene.add(light2);
  
  // Create network visualization
  createAPINetwork();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    if (!apisRenderer) return;
    
    apisCamera.aspect = container.clientWidth / container.clientHeight;
    apisCamera.updateProjectionMatrix();
    apisRenderer.setSize(container.clientWidth, container.clientHeight);
  });
  
  // Start animation
  animateAPIs();
}

function createAPINetwork() {
  // Create nodes (API endpoints)
  const nodeCount = 15;
  const nodes = [];
  
  // Node colors representing different API types
  const colors = [0xff3366, 0x33ff66, 0x3366ff, 0xffcc33, 0x9933ff];
  
  // Create nodes
  for (let i = 0; i < nodeCount; i++) {
    // Create a sphere for the node
    const geometry = new THREE.SphereGeometry(0.3, 16, 16);
    const material = new THREE.MeshPhongMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      emissive: 0x111111,
      shininess: 30
    });
    
    const node = new THREE.Mesh(geometry, material);
    
    // Position in 3D space
    const radius = 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    node.position.x = radius * Math.sin(phi) * Math.cos(theta);
    node.position.y = radius * Math.sin(phi) * Math.sin(theta);
    node.position.z = radius * Math.cos(phi);
    
    // Add animation properties
    node.userData = {
      id: i,
      pulseSpeed: Math.random() * 2 + 1,
      connections: []
    };
    
    apisScene.add(node);
    nodes.push(node);
    apisObjects.push({
      type: 'node',
      mesh: node
    });
  }
  
  // Create connections between nodes
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.2
  });
  
  // Connect each node to 2-4 other nodes
  nodes.forEach(node => {
    const connectionCount = Math.floor(Math.random() * 3) + 2;
    
    for (let i = 0; i < connectionCount; i++) {
      // Find a random node that isn't the current one
      let targetIndex;
      do {
        targetIndex = Math.floor(Math.random() * nodes.length);
      } while (targetIndex === node.userData.id);
      
      const targetNode = nodes[targetIndex];
      
      // Create a line connecting the nodes
      const lineGeometry = new THREE.BufferGeometry();
      const points = [
        node.position,
        targetNode.position
      ];
      lineGeometry.setFromPoints(points);
      
      const line = new THREE.Line(lineGeometry, lineMaterial);
      
      // Store connection data
      line.userData = {
        sourceNode: node,
        targetNode: targetNode,
        pulseSpeed: Math.random() * 2 + 1
      };
      
      apisScene.add(line);
      apisObjects.push({
        type: 'connection',
        mesh: line
      });
      
      // Record this connection
      node.userData.connections.push(line);
    }
  });
  
  // Add data packet particles
  const particleCount = 50;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleSizes = new Float32Array(particleCount);
  
  // Randomly place particles along connections
  const connections = apisObjects.filter(obj => obj.type === 'connection');
  
  for (let i = 0; i < particleCount; i++) {
    // Choose a random connection
    const connection = connections[Math.floor(Math.random() * connections.length)].mesh;
    const { sourceNode, targetNode } = connection.userData;
    
    // Linear interpolation between source and target
    const t = Math.random();
    particlePositions[i * 3] = sourceNode.position.x + (targetNode.position.x - sourceNode.position.x) * t;
    particlePositions[i * 3 + 1] = sourceNode.position.y + (targetNode.position.y - sourceNode.position.y) * t;
    particlePositions[i * 3 + 2] = sourceNode.position.z + (targetNode.position.z - sourceNode.position.z) * t;
    
    // Random size
    particleSizes[i] = Math.random() * 0.2 + 0.1;
  }
  
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
  
  const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.2,
    transparent: true,
    opacity: 0.8,
    vertexColors: false,
    sizeAttenuation: true
  });
  
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  particles.userData = {
    particleData: Array(particleCount).fill().map((_, i) => {
      const connection = connections[Math.floor(Math.random() * connections.length)].mesh;
      return {
        connectionIndex: apisObjects.findIndex(obj => obj.mesh === connection),
        t: Math.random(), // Position along connection (0-1)
        speed: Math.random() * 0.02 + 0.01, // Travel speed
        size: particleSizes[i]
      };
    })
  };
  
  apisScene.add(particles);
  apisObjects.push({
    type: 'particles',
    mesh: particles
  });
}

function animateAPIs() {
  requestAnimationFrame(animateAPIs);
  
  if (apisAnimating && apisScene && apisRenderer) {
    const time = Date.now() * 0.001;
    
    // Slowly rotate entire scene
    apisScene.rotation.y = time * 0.1;
    
    // Animate each object based on its type
    apisObjects.forEach(obj => {
      const { type, mesh } = obj;
      
      if (type === 'node') {
        // Pulse effect for nodes
        const scale = 1 + Math.sin(time * mesh.userData.pulseSpeed) * 0.2;
        mesh.scale.set(scale, scale, scale);
        
        // Subtle position drift
        mesh.position.x += Math.sin(time * 0.5 + mesh.userData.id) * 0.002;
        mesh.position.y += Math.cos(time * 0.5 + mesh.userData.id) * 0.002;
      }
      else if (type === 'connection') {
        // Update connection lines to follow nodes
        const { sourceNode, targetNode } = mesh.userData;
        
        const points = [
          sourceNode.position,
          targetNode.position
        ];
        
        mesh.geometry.setFromPoints(points);
        mesh.geometry.verticesNeedUpdate = true;
        
        // Pulse effect for lines
        const opacity = 0.1 + Math.abs(Math.sin(time * mesh.userData.pulseSpeed)) * 0.3;
        mesh.material.opacity = opacity;
      }
      else if (type === 'particles') {
        // Move particles along connections
        const positions = mesh.geometry.attributes.position.array;
        const { particleData } = mesh.userData;
        
        particleData.forEach((particle, i) => {
          // Get current connection
          const connection = apisObjects[particle.connectionIndex];
          
          if (connection && connection.mesh) {
            const { sourceNode, targetNode } = connection.mesh.userData;
            
            // Update position along connection
            particle.t += particle.speed;
            
            // Reset when reaching the end
            if (particle.t > 1) {
              particle.t = 0;
              
              // Randomly switch to a new connection
              const connections = apisObjects.filter(obj => obj.type === 'connection');
              const newConnection = connections[Math.floor(Math.random() * connections.length)];
              particle.connectionIndex = apisObjects.findIndex(obj => obj === newConnection);
            }
            
            // Linear interpolation between source and target
            positions[i * 3] = sourceNode.position.x + (targetNode.position.x - sourceNode.position.x) * particle.t;
            positions[i * 3 + 1] = sourceNode.position.y + (targetNode.position.y - sourceNode.position.y) * particle.t;
            positions[i * 3 + 2] = sourceNode.position.z + (targetNode.position.z - sourceNode.position.z) * particle.t;
          }
        });
        
        mesh.geometry.attributes.position.needsUpdate = true;
      }
    });
    
    // Render the scene
    apisRenderer.render(apisScene, apisCamera);
  }
}

function updateAPIsAnimation(isVisible) {
  apisAnimating = isVisible;
}