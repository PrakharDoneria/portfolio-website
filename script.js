async function fetchProjects() {
    const response = await fetch('https://api.github.com/users/PrakharDoneria/repos');
    const projects = await response.json();
    projects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    displayProjects(projects);
}

function displayProjects(projects) {
    const projectList = document.getElementById('project-list');
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

    const scrollLeftButton = document.getElementById('prev');
    const scrollRightButton = document.getElementById('next');
    const scrollContainer = document.querySelector('.horizontal-scroll-container');

    scrollLeftButton.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });

    scrollRightButton.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });
}

fetchProjects();

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.style.left = x + 'px';
    glow.style.top = y + 'px';

    document.body.appendChild(glow);

    setTimeout(() => {
        glow.remove();
    }, 1000);
});

document.querySelectorAll('.header-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = button.getAttribute('href').substring(1);
        const targetSection = document.querySelector(`#${targetId}`);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    const x = e.pageX;
    const y = e.pageY;

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
});
