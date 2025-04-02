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

## Deployment

This website is ready for deployment to any static hosting service:

1. **Replit Deployment**: Click the "Deploy" button to make your site live
2. **GitHub Pages**: Upload the files to a GitHub repository and enable GitHub Pages
3. **Netlify/Vercel**: Connect your repository or upload the files directly
4. **AWS S3/CloudFront**: Upload files to an S3 bucket configured for static website hosting

## Technologies Used

- HTML5
- CSS3 with modern animations
- Vanilla JavaScript
- Three.js for 3D effects
- Font Awesome for icons