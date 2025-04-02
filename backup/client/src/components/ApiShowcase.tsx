import { useEffect, useRef } from 'react';

interface ApiCardProps {
  title: string;
  description: string;
  tags: string[];
  borderColor: string;
}

function ApiCard({ title, description, tags, borderColor }: ApiCardProps) {
  return (
    <div className={`border ${borderColor} p-4 rounded-lg hover:${borderColor.replace('/30', '/70')} transition-all`}>
      <h4 className="text-lg font-bold mb-1">{title}</h4>
      <p className="text-gray-300 text-sm mb-3">{description}</p>
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag, index) => {
          const colors = [
            "bg-[#bd00ff]/20 text-[#bd00ff]",
            "bg-[#00d8ff]/20 text-[#00d8ff]",
            "bg-[#00ffd5]/20 text-[#00ffd5]"
          ];
          return (
            <span key={index} className={`px-2 py-1 ${colors[index % 3]} text-xs rounded`}>{tag}</span>
          );
        })}
      </div>
    </div>
  );
}

interface ApiPlatformProps {
  title: string;
  description: string;
  logo: React.ReactNode;
  apis: ApiCardProps[];
  actionText: string;
  actionLink: string;
  actionColor: string;
  delay: number;
  borderColor: string;
}

function ApiPlatform({
  title,
  description,
  logo,
  apis,
  actionText,
  actionLink,
  actionColor,
  delay,
  borderColor
}: ApiPlatformProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && containerRef.current) {
            containerRef.current.classList.add('opacity-100', 'translate-y-0');
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
      className="glass-card p-8 rounded-xl opacity-0 transform translate-y-10 transition-all duration-700"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
        <div className="w-full md:w-1/3">
          <div className="bg-[#121212] p-4 rounded-lg flex items-center justify-center">
            {logo}
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>

      <div className="space-y-6">
        {apis.map((api, index) => (
          <ApiCard
            key={index}
            title={api.title}
            description={api.description}
            tags={api.tags}
            borderColor={borderColor}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <a href={actionLink} className={`inline-flex items-center gap-2 px-6 py-3 ${actionColor} text-white rounded-lg hover:${actionColor.replace('bg-', 'bg-')}/80 transition-all`}>
          {actionText} <i className="fas fa-external-link-alt"></i>
        </a>
      </div>
    </div>
  );
}

export default function ApiShowcase() {
  return (
    <section id="apis" className="py-20 relative bg-[#121212]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4 font-rajdhani">
          <span className="text-[#00d8ff]">#</span> API Showcase
          <div className="h-px bg-gradient-to-r from-[#bd00ff] to-transparent flex-grow ml-4"></div>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ApiPlatform
            title="RapidAPI"
            description="Explore my collection of powerful APIs available on the RapidAPI marketplace."
            logo={<img src="https://rapidapi.com/static-assets/default/favicon-32x32.png" alt="RapidAPI" className="h-16" />}
            delay={0}
            borderColor="border-[#bd00ff]/30"
            apis={[
              {
                title: "Gemini Advance API",
                description: "Harness the power of Google's Gemini AI model for advanced text generation and analysis.",
                tags: ["AI", "Text Generation", "Google"],
                borderColor: "border-[#bd00ff]/30"
              },
              {
                title: "JioSaavn Music API",
                description: "Integrate music streaming and discovery features into your applications with JioSaavn.",
                tags: ["Music", "Streaming", "JioSaavn"],
                borderColor: "border-[#bd00ff]/30"
              },
              {
                title: "GPT-4 Integration API",
                description: "Simplified access to OpenAI's GPT-4 with enhanced features and optimized performance.",
                tags: ["AI", "GPT-4", "OpenAI"],
                borderColor: "border-[#bd00ff]/30"
              }
            ]}
            actionText="View on RapidAPI"
            actionLink="https://rapidapi.com/"
            actionColor="bg-[#bd00ff]"
          />

          <ApiPlatform
            title="Apyflux"
            description="Discover specialized APIs and tools available on the Apyflux platform."
            logo={
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#00d8ff] to-[#bd00ff] flex items-center justify-center text-white text-2xl font-bold">
                APY
              </div>
            }
            delay={200}
            borderColor="border-[#00d8ff]/30"
            apis={[
              {
                title: "Meta AI Integration",
                description: "Seamlessly integrate Meta's AI technologies into your applications with simplified endpoints.",
                tags: ["AI", "Meta", "Integration"],
                borderColor: "border-[#00d8ff]/30"
              },
              {
                title: "Image Generation Service",
                description: "Create stunning AI-generated images with customizable styles and parameters.",
                tags: ["AI", "Images", "Generation"],
                borderColor: "border-[#00d8ff]/30"
              },
              {
                title: "Data Extraction API",
                description: "Extract structured data from websites, documents, and images with high accuracy.",
                tags: ["Data", "Extraction", "Web Scraping"],
                borderColor: "border-[#00d8ff]/30"
              }
            ]}
            actionText="View on Apyflux"
            actionLink="#"
            actionColor="bg-[#00d8ff]"
          />
        </div>
      </div>
    </section>
  );
}
