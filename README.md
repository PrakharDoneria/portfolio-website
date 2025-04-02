# Prakhar Doneria Portfolio

A modern, futuristic, and animated portfolio website for Prakhar Doneria showcasing his development skills and API projects.

## Features

- Fully static website using vanilla HTML, CSS, and JavaScript
- Futuristic UI with particles and Three.js animations
- Custom cursor with interactive effects
- Responsive design for all device sizes
- Data-driven approach using JSON files for projects, skills, and APIs

## Structure

- `index.html` - Main HTML file
- `assets/css/style.css` - Main stylesheet
- `assets/js/` - JavaScript files
  - `main.js` - Core functionality
  - `particles.js` - Particle animation effects
  - `three-animation.js` - 3D animations using Three.js
- `assets/images/` - SVG images for profile and projects
- `data/` - JSON data files
  - `projects.json` - Projects information
  - `skills.json` - Skills and expertise
  - `apis.json` - API showcase information

## Running the Website

Since this is a completely static website, you can simply open the `index.html` file in your browser or use a simple HTTP server:

```bash
# Using Python's built-in HTTP server
./serve.sh
# or
python -m http.server 5000
```

Then open your browser to http://localhost:5000

## Production Preview

To preview the website in a production-like environment:

1. Open the Replit project in your browser
2. Click the "Run" button at the top of the screen
3. Wait for the Python HTTP server to start
4. When ready, Replit will automatically open the website in the preview pane
5. Click the "Open in new tab" button in the preview header for a full-page view
6. Test your site's responsiveness using browser dev tools (F12 → Toggle device toolbar)

## Deployment

### Deploying on Replit

1. Click the "Deploy" button at the top-right of the Replit interface
2. Choose "Web service" as the deployment type
3. Enter a name for your deployment
4. Click "Deploy" to make your site live
5. Once deployed, Replit will provide you with a URL to access your site

### Deploying on GitHub Pages

1. Create a new repository on GitHub
2. Initialize Git in your local/Replit project (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Connect your local repo to GitHub:
   ```bash
   git remote add origin https://github.com/yourusername/repository-name.git
   git branch -M main
   git push -u origin main
   ```
4. Go to your repository on GitHub
5. Navigate to Settings → Pages
6. Under "Source", select "main" branch and click "Save"
7. GitHub will provide you with a URL where your site is published
8. Your site will be live at `https://yourusername.github.io/repository-name`

### Custom Domain (Optional)

To use a custom domain with GitHub Pages:

1. Purchase a domain from a domain registrar (GoDaddy, Namecheap, etc.)
2. In your GitHub repository, go to Settings → Pages
3. Under "Custom domain", enter your domain name and click "Save"
4. Configure DNS settings at your domain registrar:
   - Add an A record pointing to GitHub Pages IP addresses
   - Or add a CNAME record pointing to your GitHub Pages URL

## Sample Data and Customization

The website uses JSON files in the `data/` directory to manage content, making it easy to update without changing the code.

### Customizing Projects

Edit the `data/projects.json` file to showcase your own projects:

```json
[
  {
    "title": "Project Title",
    "description": "A brief description of your project highlighting key features and technologies used. Keep it concise but informative.",
    "image": "assets/images/your-project-image.svg",
    "technologies": ["Technology1", "Technology2", "Technology3"],
    "demoLink": "https://your-demo-link.com",
    "githubLink": "https://github.com/yourusername/your-repo"
  }
]
```

Example project entry:

```json
{
  "title": "AI-Powered Financial Analysis",
  "description": "Developed a machine learning platform that analyzes financial data to predict market trends with 92% accuracy. Used Python, TensorFlow, and React for the user interface.",
  "image": "assets/images/project-finance.svg",
  "technologies": ["Python", "TensorFlow", "Flask", "React", "AWS"],
  "demoLink": "https://your-demo-link.com",
  "githubLink": "https://github.com/yourusername/finance-ai"
}
```

### Adding Project Images

1. Place your project images in the `assets/images/` directory
2. Use SVG format for best quality and performance
3. Reference the image path in your project JSON entry
4. If no image is available, the site will use a stylish gradient background

### Customizing Skills

Edit the `data/skills.json` file to highlight your expertise:

```json
[
  {
    "title": "Skill Category",
    "icon": "fa-icon-name",
    "iconColor": "#hexcolor",
    "skills": [
      { "name": "Skill Name", "percentage": 90 },
      { "name": "Another Skill", "percentage": 85 }
    ]
  }
]
```

Example skill category:

```json
{
  "title": "Web Development",
  "icon": "fa-globe",
  "iconColor": "#00d8ff",
  "skills": [
    { "name": "HTML/CSS", "percentage": 95 },
    { "name": "JavaScript", "percentage": 90 },
    { "name": "React", "percentage": 85 }
  ]
}
```

### Customizing APIs

If you have APIs you've published, edit the `data/apis.json` file:

```json
[
  {
    "platform": "Platform Name",
    "description": "Platform description",
    "apis": [
      {
        "title": "API Name",
        "description": "API description",
        "tags": ["Tag1", "Tag2", "Tag3"],
        "borderColor": "#hexcolor"
      }
    ],
    "actionText": "Button Text",
    "actionLink": "https://platform-link.com",
    "actionColor": "#hexcolor",
    "logo": "fa-icon-name"
  }
]
```

## Technologies Used

- HTML5
- CSS3 with modern animations
- Vanilla JavaScript
- Three.js for 3D effects
- Font Awesome for icons