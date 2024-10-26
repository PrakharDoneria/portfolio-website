const cursor = document.querySelector('.cursor');
const scrollContainer = document.querySelector('.vertical-scroll-container');
const projectList = document.getElementById('project-list');
const scrollLeftButton = document.getElementById('prev');
const scrollRightButton = document.getElementById('next');
const scrollAmount = 300;

async function fetchProjects() {
    const response = await fetch('https://api.github.com/users/PrakharDoneria/repos');
    const projects = await response.json();
    projects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    displayProjects(projects);
}

function displayProjects(projects) {
    projectList.innerHTML = '';
    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description || 'No description available.'}</p>
            <a href="${project.html_url}" target="_blank" class="view-project">View Project</a>
        `;
        projectList.appendChild(projectItem);
    });
}

function handleScroll(direction) {
    scrollContainer.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

scrollLeftButton.addEventListener('click', () => handleScroll(-1));
scrollRightButton.addEventListener('click', () => handleScroll(1));

fetchProjects();

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
    document.body.appendChild(glow);
    
    setTimeout(() => glow.remove(), 1000);
});

document.querySelectorAll('.header-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = button.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});
