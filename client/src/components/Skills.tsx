import { useEffect, useRef } from 'react';

interface SkillBarProps {
  name: string;
  percentage: number;
  delay?: number;
}

function SkillBar({ name, percentage, delay = 0 }: SkillBarProps) {
  const skillBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && skillBarRef.current) {
            setTimeout(() => {
              if (skillBarRef.current) {
                skillBarRef.current.style.width = `${percentage}%`;
              }
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (skillBarRef.current) {
      observer.observe(skillBarRef.current.parentElement as Element);
    }

    return () => observer.disconnect();
  }, [percentage, delay]);

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span>{name}</span>
        <span>{percentage}%</span>
      </div>
      <div className="skill-progress">
        <div ref={skillBarRef} className="skill-bar" style={{ width: '0%' }}></div>
      </div>
    </div>
  );
}

interface SkillCategoryProps {
  title: string;
  icon: string;
  iconColor: string;
  skills: { name: string; percentage: number }[];
  delay: number;
}

function SkillCategory({ title, icon, iconColor, skills, delay }: SkillCategoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="glass-card p-6 rounded-xl opacity-0 transform translate-y-10 transition-all duration-700"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-6 flex items-center gap-3">
        <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-${iconColor}/20 text-${iconColor}`}>
          <i className={`fas ${icon} text-2xl`}></i>
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <SkillBar 
            key={index} 
            name={skill.name} 
            percentage={skill.percentage}
            delay={index * 150}
          />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative bg-[#121212]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4 font-rajdhani">
          <span className="text-[#00d8ff]">#</span> My Skills
          <div className="h-px bg-gradient-to-r from-[#bd00ff] to-transparent flex-grow ml-4"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <SkillCategory
            title="Development"
            icon="fa-code"
            iconColor="[#bd00ff]"
            delay={0}
            skills={[
              { name: "HTML/CSS/JavaScript", percentage: 95 },
              { name: "React / Next.js", percentage: 90 },
              { name: "Node.js / Express", percentage: 88 },
              { name: "App Development", percentage: 85 }
            ]}
          />

          <SkillCategory
            title="AI & Machine Learning"
            icon="fa-brain"
            iconColor="[#00d8ff]"
            delay={200}
            skills={[
              { name: "AI Integration", percentage: 92 },
              { name: "LLM Fine-tuning", percentage: 85 },
              { name: "Computer Vision", percentage: 80 },
              { name: "NLP", percentage: 87 }
            ]}
          />

          <SkillCategory
            title="API Development"
            icon="fa-plug"
            iconColor="[#00ffd5]"
            delay={400}
            skills={[
              { name: "RESTful APIs", percentage: 95 },
              { name: "API Integration", percentage: 92 },
              { name: "Serverless Functions", percentage: 90 },
              { name: "API Documentation", percentage: 88 }
            ]}
          />

          <SkillCategory
            title="Tools & Technologies"
            icon="fa-tools"
            iconColor="[#bd00ff]"
            delay={600}
            skills={[
              { name: "Git & GitHub", percentage: 90 },
              { name: "Docker", percentage: 85 },
              { name: "Cloud Platforms", percentage: 87 },
              { name: "CI/CD", percentage: 83 }
            ]}
          />

          <SkillCategory
            title="Database & Backend"
            icon="fa-database"
            iconColor="[#00d8ff]"
            delay={800}
            skills={[
              { name: "MongoDB", percentage: 88 },
              { name: "SQL Databases", percentage: 85 },
              { name: "Firebase", percentage: 90 },
              { name: "Server Management", percentage: 82 }
            ]}
          />

          <SkillCategory
            title="Soft Skills"
            icon="fa-users"
            iconColor="[#00ffd5]"
            delay={1000}
            skills={[
              { name: "Problem Solving", percentage: 95 },
              { name: "Communication", percentage: 90 },
              { name: "Adaptability", percentage: 92 },
              { name: "Creativity", percentage: 94 }
            ]}
          />
        </div>
      </div>
    </section>
  );
}
