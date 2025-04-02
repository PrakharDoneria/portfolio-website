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
  // Create a more tech-focused 3D visualization that represents mobile & web apps
  const projectCount = 6; // Match real project count
  
  // Create a hexagonal arrangement for the projects
  const radius = 5;
  const mainColors = [
    0x00bcd4, // DevBytes - Cyan
    0xff9800, // TrackTik - Orange
    0xe91e63, // SunoSynth - Pink
    0x4caf50, // VerboVisions - Green  
    0x3f51b5, // HTML Editor PRO - Indigo
    0x9c27b0  // PizzaVerse - Purple
  ];
  
  // Add a central node representing the portfolio
  const centralGeometry = new THREE.SphereGeometry(0.7, 32, 32);
  const centralMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    emissive: 0x222222,
    transparent: true,
    opacity: 0.9,
    shininess: 100
  });
  
  const centralNode = new THREE.Mesh(centralGeometry, centralMaterial);
  centralNode.position.set(0, 0, 0);
  
  // Add animation properties
  centralNode.userData = {
    type: 'central',
    pulseSpeed: 1.5,
    pulseAmount: 0.2
  };
  
  projectsGroup.add(centralNode);
  
  // Create different geometry types for variety
  const geometryTypes = [
    new THREE.OctahedronGeometry(0.5, 0), // DevBytes - AI
    new THREE.CylinderGeometry(0.5, 0.5, 0.5, 16), // TrackTik - Mobile app
    new THREE.DodecahedronGeometry(0.5, 0), // SunoSynth - Music
    new THREE.IcosahedronGeometry(0.5, 0), // VerboVisions - Image Generation
    new THREE.BoxGeometry(0.5, 0.5, 0.5), // HTML Editor - code blocks
    new THREE.TorusGeometry(0.4, 0.2, 16, 16) // PizzaVerse - restaurant
  ];
  
  // Create project nodes arranged in a circle
  for (let i = 0; i < projectCount; i++) {
    const angle = (i / projectCount) * Math.PI * 2;
    
    // Create geometry based on project type
    const geometry = geometryTypes[i];
    
    // Create material with project-specific color
    const material = new THREE.MeshPhongMaterial({
      color: mainColors[i],
      emissive: 0x111111,
      transparent: true,
      opacity: 0.8,
      shininess: 80
    });
    
    // Create mesh
    const node = new THREE.Mesh(geometry, material);
    
    // Position in circle around center
    node.position.x = Math.cos(angle) * radius;
    node.position.z = Math.sin(angle) * radius;
    node.position.y = Math.sin(angle + Date.now() * 0.001) * 0.5;
    
    // Add animation properties
    node.userData = {
      index: i,
      angle: angle,
      baseY: node.position.y,
      pulseSpeed: 0.5 + Math.random() * 1.5,
      orbitSpeed: 0.2 + Math.random() * 0.3,
      orbitRadius: radius,
      rotationSpeed: {
        x: Math.random() * 0.02,
        y: Math.random() * 0.02,
        z: Math.random() * 0.02
      }
    };
    
    projectsGroup.add(node);
    
    // Create connecting line to central node
    const lineMaterial = new THREE.LineBasicMaterial({
      color: mainColors[i],
      transparent: true,
      opacity: 0.4
    });
    
    const lineGeometry = new THREE.BufferGeometry();
    const points = [
      new THREE.Vector3(0, 0, 0), // Central node
      node.position // Project node
    ];
    lineGeometry.setFromPoints(points);
    
    const line = new THREE.Line(lineGeometry, lineMaterial);
    line.userData = {
      startIndex: -1, // Central node
      endIndex: i,
      startNode: centralNode,
      endNode: node
    };
    
    projectsGroup.add(line);
  }
  
  // Add data flow particles along the connections
  const particlesCount = 50;
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesPositions = new Float32Array(particlesCount * 3);
  const particlesSizes = new Float32Array(particlesCount);
  const particlesColors = new Float32Array(particlesCount * 3);
  const particlesData = [];
  
  for (let i = 0; i < particlesCount; i++) {
    // Assign each particle to a connection
    const connectionIndex = Math.floor(Math.random() * projectCount);
    const angle = (connectionIndex / projectCount) * Math.PI * 2;
    
    // Calculate position along the connection line
    const t = Math.random(); // Position along the line (0-1)
    const x = t * Math.cos(angle) * radius;
    const z = t * Math.sin(angle) * radius;
    const y = t * 0.5 * Math.sin(angle);
    
    particlesPositions[i * 3] = x;
    particlesPositions[i * 3 + 1] = y;
    particlesPositions[i * 3 + 2] = z;
    
    // Random size for each particle
    particlesSizes[i] = Math.random() * 0.05 + 0.02;
    
    // Get color from main colors array
    const color = new THREE.Color(mainColors[connectionIndex]);
    particlesColors[i * 3] = color.r;
    particlesColors[i * 3 + 1] = color.g;
    particlesColors[i * 3 + 2] = color.b;
    
    // Store particle data for animation
    particlesData.push({
      connectionIndex: connectionIndex,
      position: t,
      speed: Math.random() * 0.01 + 0.005
    });
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
  particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particlesSizes, 1));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particlesColors, 3));
  
  // Create shader material for particles
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    transparent: true,
    opacity: 0.8,
    vertexColors: true,
    blending: THREE.AdditiveBlending
  });
  
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  particles.userData = {
    particlesData: particlesData
  };
  
  projectsGroup.add(particles);
}

function animateProjects() {
  requestAnimationFrame(animateProjects);
  
  if (projectsAnimating && projectsScene && projectsRenderer) {
    const time = Date.now() * 0.001;
    
    // Rotate the entire group slowly
    projectsGroup.rotation.y = time * 0.1;
    
    projectsGroup.children.forEach(child => {
      if (child.type === 'Mesh' && child.userData) {
        // Central node animation
        if (child.userData.type === 'central') {
          const scale = 1 + Math.sin(time * child.userData.pulseSpeed) * child.userData.pulseAmount;
          child.scale.set(scale, scale, scale);
          
          // Make the central node glow/pulse
          if (child.material) {
            const emissive = 0.1 + Math.abs(Math.sin(time * 0.5)) * 0.2;
            child.material.emissive.setRGB(emissive, emissive, emissive);
          }
        } 
        // Project node animations
        else if (child.userData.index !== undefined) {
          // Update node position in orbit
          const { index, angle, pulseSpeed, orbitSpeed, orbitRadius, rotationSpeed } = child.userData;
          
          // Rotate each object on its own axis
          child.rotation.x += rotationSpeed.x;
          child.rotation.y += rotationSpeed.y;
          child.rotation.z += rotationSpeed.z;
          
          // Update orbit position
          const orbitAngle = angle + time * orbitSpeed;
          child.position.x = Math.cos(orbitAngle) * orbitRadius;
          child.position.z = Math.sin(orbitAngle) * orbitRadius;
          
          // Vertical bobbing motion
          child.position.y = Math.sin(time * pulseSpeed) * 0.5;
          
          // Update connecting lines
          projectsGroup.children.forEach(line => {
            if (line.type === 'Line' && line.userData && line.userData.endIndex === index) {
              // Update the line points
              const startPoint = new THREE.Vector3(0, 0, 0);
              const endPoint = child.position.clone();
              
              const lineGeometry = new THREE.BufferGeometry();
              lineGeometry.setFromPoints([startPoint, endPoint]);
              line.geometry.dispose();
              line.geometry = lineGeometry;
            }
          });
        }
      }
      // Update particle animation
      else if (child.type === 'Points' && child.userData && child.userData.particlesData) {
        const positions = child.geometry.attributes.position.array;
        const particlesData = child.userData.particlesData;
        
        // Update each particle
        for (let i = 0; i < particlesData.length; i++) {
          const particle = particlesData[i];
          
          // Update particle position
          particle.position += particle.speed;
          
          // Reset particle position when it reaches the end
          if (particle.position > 1) {
            particle.position = 0;
            particle.connectionIndex = Math.floor(Math.random() * 6); // Choose a random connection
          }
          
          // Calculate new position along the connection line
          const angle = (particle.connectionIndex / 6) * Math.PI * 2;
          const radius = 5; // Same as in createProjectsGrid
          
          const x = particle.position * Math.cos(angle) * radius;
          const z = particle.position * Math.sin(angle) * radius;
          const y = particle.position * 0.5 * Math.sin(angle);
          
          // Update particle position
          positions[i * 3] = x;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = z;
        }
        
        // Update the geometry
        child.geometry.attributes.position.needsUpdate = true;
      }
    });
    
    // Camera animation
    projectsCamera.position.x = Math.sin(time * 0.2) * 2;
    projectsCamera.position.y = 3 + Math.sin(time * 0.3) * 1;
    projectsCamera.position.z = 8 + Math.cos(time * 0.2) * 1;
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