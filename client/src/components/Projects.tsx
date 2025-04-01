import { useEffect, useRef } from 'react';

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink: string;
  githubLink: string;
  delay: number;
}

function ProjectCard({ 
  title, 
  description, 
  image, 
  technologies, 
  demoLink, 
  githubLink,
  delay
}: ProjectProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Card 3D tilt effect
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      card.style.transform = `perspective(1000px) rotateY(${deltaX * 5}deg) rotateX(${-deltaY * 5}deg)`;
    };
    
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    // Animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            card.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(card);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="card-3d rounded-xl overflow-hidden group opacity-0 transform translate-y-10 transition-all duration-700"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="card-3d-content h-full">
        <div className="relative overflow-hidden">
          <img src={image} alt={title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
        </div>
        <div className="p-6 glass-card h-[calc(100%-192px)]">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-300 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => {
              const colors = [
                "bg-[#bd00ff]/20 text-[#bd00ff]",
                "bg-[#00d8ff]/20 text-[#00d8ff]",
                "bg-[#00ffd5]/20 text-[#00ffd5]"
              ];
              return (
                <span key={index} className={`px-2 py-1 ${colors[index % 3]} text-xs rounded`}>{tech}</span>
              );
            })}
          </div>
          <div className="flex justify-between items-center">
            <a href={demoLink} className="text-[#00d8ff] hover:text-[#00ffd5] transition-colors">
              <i className="fas fa-external-link-alt mr-1"></i> View Demo
            </a>
            <a href={githubLink} className="text-[#00d8ff] hover:text-[#00ffd5] transition-colors">
              <i className="fab fa-github mr-1"></i> GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const projects = [
    {
      title: "HTML Editor PRO",
      description: "A powerful web-based HTML editor with live preview and advanced features for developers.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      technologies: ["HTML", "CSS", "JavaScript"],
      demoLink: "#",
      githubLink: "https://github.com/PrakharDoneria"
    },
    {
      title: "AI Text Generator",
      description: "Advanced text generation tool using GPT-4 for creative content, essays, and more.",
      image: "https://images.unsplash.com/photo-1518737743670-3f217c4def4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      technologies: ["React", "Node.js", "OpenAI API"],
      demoLink: "#",
      githubLink: "https://github.com/PrakharDoneria"
    },
    {
      title: "Music API Integration",
      description: "JioSaavn API integration for seamless music streaming and discovery in applications.",
      image: "https://images.unsplash.com/photo-1571867424488-4565932edb41?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      technologies: ["Express", "API", "JioSaavn"],
      demoLink: "#",
      githubLink: "https://github.com/PrakharDoneria"
    },
    {
      title: "Image Generation API",
      description: "AI-powered image generation service using state-of-the-art models for creative visuals.",
      image: "https://images.unsplash.com/photo-1579403124614-197f69d8187b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      technologies: ["Python", "Flask", "Stable Diffusion"],
      demoLink: "#",
      githubLink: "https://github.com/PrakharDoneria"
    },
    {
      title: "Mobile Task Manager",
      description: "Sleek, AI-enhanced task management app with smart categorization and reminders.",
      image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      technologies: ["React Native", "Firebase", "Mobile Dev"],
      demoLink: "#",
      githubLink: "https://github.com/PrakharDoneria"
    },
    {
      title: "E-Commerce Platform",
      description: "Modern online shopping experience with advanced search and recommendation systems.",
      image: "https://images.unsplash.com/photo-1550063873-ab792950096b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      technologies: ["Next.js", "MongoDB", "Stripe"],
      demoLink: "#",
      githubLink: "https://github.com/PrakharDoneria"
    }
  ];

  return (
    <section id="projects" className="py-20 relative bg-[#0a192f]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4 font-rajdhani">
          <span className="text-[#00d8ff]">#</span> Featured Projects
          <div className="h-px bg-gradient-to-r from-[#bd00ff] to-transparent flex-grow ml-4"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              demoLink={project.demoLink}
              githubLink={project.githubLink}
              delay={index * 100}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="https://github.com/PrakharDoneria" className="inline-flex items-center gap-2 px-6 py-3 border border-[#00d8ff] rounded-lg hover:bg-[#00d8ff]/20 transition-all">
            View All Projects <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
