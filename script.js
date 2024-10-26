const projectList = document.getElementById('project-list');

async function fetchGitHubProjects() {
    try {
        const response = await fetch('https://api.github.com/users/PrakharDoneria/repos');
        const repos = await response.json();

        repos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available'}</p>
                <a href="${repo.html_url}" target="_blank" class="button">View on GitHub</a>
            `;
            projectList.appendChild(card);
        });
    } catch (error) {
        console.error('Failed to load GitHub projects:', error);
    }
}

fetchGitHubProjects();
