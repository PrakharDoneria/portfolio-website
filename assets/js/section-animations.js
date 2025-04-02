// Section-specific animations
document.addEventListener('DOMContentLoaded', function() {
  console.log('Section animations script loaded');
  
  // Initialize section-specific animations
  initSkillsAnimation();
  initProjectsAnimation();
  initAPIsAnimation();
  
  // Set up intersection observers for section visibility
  setupSectionObservers();
});

// Intersection Observer setup
function setupSectionObservers() {
  const sections = [
    { id: 'skills', updateFunction: updateSkillsAnimation },
    { id: 'projects', updateFunction: updateProjectsAnimation },
    { id: 'apis', updateFunction: updateAPIsAnimation }
  ];
  
  sections.forEach(section => {
    const element = document.getElementById(section.id);
    if (!element) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        section.updateFunction(entry.isIntersecting);
      });
    }, { threshold: 0.25 });
    
    observer.observe(element);
  });
}

// Skills Section Animation
let skillsScene, skillsCamera, skillsRenderer, skillsObjects = [];

function initSkillsAnimation() {
  const container = document.querySelector('#skills');
  if (!container) return;
  
  // Create a Three.js scene for skills
  skillsScene = new THREE.Scene();
  
  // Camera
  skillsCamera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  skillsCamera.position.z = 20;
  
  // Renderer
  skillsRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  skillsRenderer.setSize(container.offsetWidth, container.offsetHeight);
  skillsRenderer.setClearColor(0x000000, 0);
  
  // Append renderer to container but position it absolutely
  const rendererElement = skillsRenderer.domElement;
  rendererElement.style.position = 'absolute';
  rendererElement.style.top = '0';
  rendererElement.style.left = '0';
  rendererElement.style.zIndex = '-1';
  rendererElement.style.pointerEvents = 'none';
  container.appendChild(rendererElement);
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  skillsScene.add(ambientLight);
  
  const pointLight = new THREE.PointLight(0x7744ff, 2, 50);
  pointLight.position.set(10, 10, 10);
  skillsScene.add(pointLight);
  
  // Create skill orbs
  createSkillOrbs();
  
  // Animation
  animateSkills();
  
  // Handle window resize
  window.addEventListener('resize', function() {
    skillsCamera.aspect = container.offsetWidth / container.offsetHeight;
    skillsCamera.updateProjectionMatrix();
    skillsRenderer.setSize(container.offsetWidth, container.offsetHeight);
  });
}

function createSkillOrbs() {
  const skillsData = [
    { name: 'JavaScript', level: 0.9, color: 0xf0db4f },
    { name: 'Python', level: 0.85, color: 0x306998 },
    { name: 'React', level: 0.8, color: 0x61dafb },
    { name: 'Node.js', level: 0.85, color: 0x43853d },
    { name: 'HTML/CSS', level: 0.9, color: 0xe34c26 },
    { name: 'SQL', level: 0.75, color: 0x336791 },
    { name: 'Three.js', level: 0.7, color: 0x000000 },
    { name: 'API Development', level: 0.9, color: 0x00a8e8 },
    { name: 'TensorFlow', level: 0.7, color: 0xff6f00 },
    { name: 'Git', level: 0.8, color: 0xf05032 },
    { name: 'MongoDB', level: 0.8, color: 0x3fa037 },
    { name: 'AWS', level: 0.75, color: 0xff9900 }
  ];
  
  skillsData.forEach((skill, index) => {
    // Create a sphere for each skill
    const radius = skill.level * 1.5;
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: skill.color,
      metalness: 0.7,
      roughness: 0.3,
      emissive: skill.color,
      emissiveIntensity: 0.2
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    
    // Position spheres in a circular pattern
    const angle = (index / skillsData.length) * Math.PI * 2;
    const radius3D = 10;
    mesh.position.x = Math.sin(angle) * radius3D;
    mesh.position.y = Math.cos(angle) * radius3D;
    mesh.position.z = (Math.random() - 0.5) * 10;
    
    // Store initial position for animation
    mesh.userData = {
      initialX: mesh.position.x,
      initialY: mesh.position.y,
      initialZ: mesh.position.z,
      speed: 0.5 + Math.random() * 0.5,
      amplitude: 1 + Math.random() * 2
    };
    
    skillsScene.add(mesh);
    skillsObjects.push(mesh);
  });
}

function animateSkills() {
  requestAnimationFrame(animateSkills);
  
  // Rotate camera slightly
  const time = Date.now() * 0.0005;
  skillsCamera.position.x = Math.sin(time * 0.5) * 2;
  skillsCamera.position.y = Math.cos(time * 0.5) * 2;
  skillsCamera.lookAt(0, 0, 0);
  
  // Animate skill orbs
  skillsObjects.forEach((obj, index) => {
    // Oscillate positions
    obj.position.x = obj.userData.initialX + Math.sin(time * obj.userData.speed) * obj.userData.amplitude;
    obj.position.y = obj.userData.initialY + Math.cos(time * obj.userData.speed) * obj.userData.amplitude;
    obj.position.z = obj.userData.initialZ + Math.sin(time * obj.userData.speed * 2) * obj.userData.amplitude;
    
    // Rotate orbs
    obj.rotation.x += 0.01;
    obj.rotation.y += 0.01;
  });
  
  // Render the scene
  skillsRenderer.render(skillsScene, skillsCamera);
}

function updateSkillsAnimation(isVisible) {
  // We can pause/resume the animation when not visible to save resources
  skillsObjects.forEach(obj => {
    obj.visible = isVisible;
  });
}

// Projects Section Animation
let projectsScene, projectsCamera, projectsRenderer, projectsObjects = [];

function initProjectsAnimation() {
  const container = document.querySelector('#projects');
  if (!container) return;
  
  // Create a Three.js scene for projects
  projectsScene = new THREE.Scene();
  
  // Camera
  projectsCamera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  projectsCamera.position.z = 15;
  
  // Renderer
  projectsRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  projectsRenderer.setSize(container.offsetWidth, container.offsetHeight);
  projectsRenderer.setClearColor(0x000000, 0);
  
  // Append renderer to container
  const rendererElement = projectsRenderer.domElement;
  rendererElement.style.position = 'absolute';
  rendererElement.style.top = '0';
  rendererElement.style.left = '0';
  rendererElement.style.zIndex = '-1';
  rendererElement.style.pointerEvents = 'none';
  container.appendChild(rendererElement);
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  projectsScene.add(ambientLight);
  
  const pointLight = new THREE.PointLight(0xff3366, 2, 50);
  pointLight.position.set(10, 10, 10);
  projectsScene.add(pointLight);
  
  // Create projects grid
  createProjectsGrid();
  
  // Animation
  animateProjects();
  
  // Handle window resize
  window.addEventListener('resize', function() {
    projectsCamera.aspect = container.offsetWidth / container.offsetHeight;
    projectsCamera.updateProjectionMatrix();
    projectsRenderer.setSize(container.offsetWidth, container.offsetHeight);
  });
}

function createProjectsGrid() {
  const gridSize = 4; // 4x4 grid
  const spacing = 4;
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // Create different shapes for variation
      let geometry;
      const shapeType = Math.floor(Math.random() * 5);
      
      switch (shapeType) {
        case 0:
          geometry = new THREE.BoxGeometry(1, 1, 1);
          break;
        case 1:
          geometry = new THREE.DodecahedronGeometry(0.7);
          break;
        case 2:
          geometry = new THREE.OctahedronGeometry(0.7);
          break;
        case 3:
          geometry = new THREE.TetrahedronGeometry(0.7);
          break;
        case 4:
          geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 32);
          break;
      }
      
      // Random color
      const colors = [0xff3366, 0x3366ff, 0x33ff66, 0xffcc33, 0xff33cc, 0x33ccff];
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        metalness: 0.7,
        roughness: 0.3
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      
      // Position in grid
      mesh.position.x = (i - gridSize / 2) * spacing + spacing / 2;
      mesh.position.y = (j - gridSize / 2) * spacing + spacing / 2;
      mesh.position.z = (Math.random() - 0.5) * 5;
      
      // Store initial position
      mesh.userData = {
        initialX: mesh.position.x,
        initialY: mesh.position.y,
        initialZ: mesh.position.z,
        speedX: 0.02 + Math.random() * 0.03,
        speedY: 0.02 + Math.random() * 0.03,
        speedZ: 0.02 + Math.random() * 0.03,
        rotationSpeed: 0.01 + Math.random() * 0.02
      };
      
      projectsScene.add(mesh);
      projectsObjects.push(mesh);
    }
  }
}

function animateProjects() {
  requestAnimationFrame(animateProjects);
  
  const time = Date.now() * 0.001;
  
  // Rotate camera in a circular pattern
  const cameraRadius = 10;
  projectsCamera.position.x = Math.sin(time * 0.2) * cameraRadius;
  projectsCamera.position.y = Math.cos(time * 0.2) * cameraRadius;
  projectsCamera.lookAt(0, 0, 0);
  
  // Animate project objects
  projectsObjects.forEach(obj => {
    // Rotate objects
    obj.rotation.x += obj.userData.rotationSpeed;
    obj.rotation.y += obj.userData.rotationSpeed * 0.8;
    
    // Oscillate positions slightly
    obj.position.x = obj.userData.initialX + Math.sin(time * obj.userData.speedX) * 0.5;
    obj.position.y = obj.userData.initialY + Math.cos(time * obj.userData.speedY) * 0.5;
    obj.position.z = obj.userData.initialZ + Math.sin(time * obj.userData.speedZ) * 0.5;
  });
  
  // Render the scene
  projectsRenderer.render(projectsScene, projectsCamera);
}

function updateProjectsAnimation(isVisible) {
  // Pause/resume the animation when not visible
  projectsObjects.forEach(obj => {
    obj.visible = isVisible;
  });
}

// APIs Section Animation
let apisScene, apisCamera, apisRenderer, apisObjects = [];

function initAPIsAnimation() {
  const container = document.querySelector('#apis');
  if (!container) return;
  
  // Create a Three.js scene for APIs
  apisScene = new THREE.Scene();
  
  // Camera
  apisCamera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  apisCamera.position.z = 25;
  
  // Renderer
  apisRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  apisRenderer.setSize(container.offsetWidth, container.offsetHeight);
  apisRenderer.setClearColor(0x000000, 0);
  
  // Append renderer to container
  const rendererElement = apisRenderer.domElement;
  rendererElement.style.position = 'absolute';
  rendererElement.style.top = '0';
  rendererElement.style.left = '0';
  rendererElement.style.zIndex = '-1';
  rendererElement.style.pointerEvents = 'none';
  container.appendChild(rendererElement);
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  apisScene.add(ambientLight);
  
  const pointLight = new THREE.PointLight(0x33ccff, 2, 50);
  pointLight.position.set(10, 10, 10);
  apisScene.add(pointLight);
  
  // Create API network
  createAPINetwork();
  
  // Animation
  animateAPIs();
  
  // Handle window resize
  window.addEventListener('resize', function() {
    apisCamera.aspect = container.offsetWidth / container.offsetHeight;
    apisCamera.updateProjectionMatrix();
    apisRenderer.setSize(container.offsetWidth, container.offsetHeight);
  });
}

function createAPINetwork() {
  // Create a network of connected nodes representing APIs
  const nodeCount = 15;
  const nodes = [];
  const connections = [];
  
  // Create nodes
  for (let i = 0; i < nodeCount; i++) {
    // Node geometry
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0x33ccff,
      emissive: 0x33ccff,
      emissiveIntensity: 0.3,
      metalness: 0.8,
      roughness: 0.2
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    
    // Position nodes randomly within a sphere
    const radius = 10;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    mesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
    mesh.position.y = radius * Math.sin(phi) * Math.sin(theta);
    mesh.position.z = radius * Math.cos(phi);
    
    // Store position data for animation
    mesh.userData = {
      initialX: mesh.position.x,
      initialY: mesh.position.y,
      initialZ: mesh.position.z,
      speed: 0.3 + Math.random() * 0.7
    };
    
    apisScene.add(mesh);
    nodes.push(mesh);
    apisObjects.push(mesh);
  }
  
  // Create connections between nodes
  for (let i = 0; i < nodeCount; i++) {
    // Connect each node to 2-4 other nodes
    const connectionCount = 2 + Math.floor(Math.random() * 3);
    
    for (let j = 0; j < connectionCount; j++) {
      // Select a random node to connect to
      const targetIndex = Math.floor(Math.random() * nodeCount);
      if (targetIndex !== i) {
        // Create a line geometry
        const lineGeometry = new THREE.BufferGeometry();
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x33ccff,
          transparent: true,
          opacity: 0.3
        });
        
        // Create a line between the nodes
        const points = [
          nodes[i].position,
          nodes[targetIndex].position
        ];
        
        lineGeometry.setFromPoints(points);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        
        // Store the connected nodes for updating the line position in animation
        line.userData = {
          startNode: i,
          endNode: targetIndex
        };
        
        apisScene.add(line);
        connections.push(line);
        apisObjects.push(line);
      }
    }
  }
  
  // Store the nodes and connections for animation
  apisScene.userData = {
    nodes: nodes,
    connections: connections
  };
}

function animateAPIs() {
  requestAnimationFrame(animateAPIs);
  
  const time = Date.now() * 0.001;
  
  // Rotate camera slowly
  apisCamera.position.x = Math.sin(time * 0.1) * 15;
  apisCamera.position.y = Math.cos(time * 0.1) * 15;
  apisCamera.position.z = 20 + Math.sin(time * 0.05) * 5;
  apisCamera.lookAt(0, 0, 0);
  
  // Get references to nodes and connections
  const nodes = apisScene.userData.nodes;
  const connections = apisScene.userData.connections;
  
  // Animate nodes
  nodes.forEach(node => {
    // Move nodes slightly
    node.position.x = node.userData.initialX + Math.sin(time * node.userData.speed) * 1;
    node.position.y = node.userData.initialY + Math.cos(time * node.userData.speed) * 1;
    node.position.z = node.userData.initialZ + Math.sin(time * node.userData.speed * 2) * 1;
    
    // Pulse size
    const scale = 1 + Math.sin(time * node.userData.speed * 3) * 0.2;
    node.scale.set(scale, scale, scale);
  });
  
  // Update connection lines to follow nodes
  connections.forEach(connection => {
    const startNode = nodes[connection.userData.startNode];
    const endNode = nodes[connection.userData.endNode];
    
    // Update line vertices
    const points = [
      startNode.position,
      endNode.position
    ];
    
    connection.geometry.setFromPoints(points);
    connection.geometry.verticesNeedUpdate = true;
  });
  
  // Render the scene
  apisRenderer.render(apisScene, apisCamera);
}

function updateAPIsAnimation(isVisible) {
  // Pause/resume the animation when not visible
  apisObjects.forEach(obj => {
    obj.visible = isVisible;
  });
}