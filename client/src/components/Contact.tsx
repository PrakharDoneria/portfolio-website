import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form handling would go here in a real implementation
    alert('Message sent successfully! (Demo only)');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 relative bg-[#0a192f]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4 font-rajdhani">
          <span className="text-[#00d8ff]">#</span> Get In Touch
          <div className="h-px bg-gradient-to-r from-[#bd00ff] to-transparent flex-grow ml-4"></div>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-4 gradient-text">Let's Work Together</h3>
              <p className="text-gray-300 mb-6">
                I'm always open to new opportunities, collaborations, and interesting projects. 
                Feel free to reach out if you want to discuss ideas or just say hello!
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#bd00ff]/20 text-[#bd00ff]">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <span className="text-gray-300">contact@prakhardoneria.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00d8ff]/20 text-[#00d8ff]">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <span className="text-gray-300">India</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Find Me On</h3>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://github.com/PrakharDoneria" 
                  target="_blank" 
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-[#121212] border border-[#bd00ff]/30 hover:border-[#bd00ff] hover:text-[#bd00ff] transition-all"
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a 
                  href="https://www.linkedin.com/in/prakhar-doneria-646090228/" 
                  target="_blank" 
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-[#121212] border border-[#bd00ff]/30 hover:border-[#bd00ff] hover:text-[#bd00ff] transition-all"
                >
                  <i className="fab fa-linkedin-in text-xl"></i>
                </a>
                <a 
                  href="https://twitter.com/prakhardoneria2" 
                  target="_blank" 
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-[#121212] border border-[#bd00ff]/30 hover:border-[#bd00ff] hover:text-[#bd00ff] transition-all"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a 
                  href="https://www.instagram.com/prakhardoneria/" 
                  target="_blank" 
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-[#121212] border border-[#bd00ff]/30 hover:border-[#bd00ff] hover:text-[#bd00ff] transition-all"
                >
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a 
                  href="https://dev.to/prakhar_doneria" 
                  target="_blank" 
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-[#121212] border border-[#bd00ff]/30 hover:border-[#bd00ff] hover:text-[#bd00ff] transition-all"
                >
                  <i className="fab fa-dev text-xl"></i>
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-3 bg-[#121212] border border-[#bd00ff]/30 rounded-lg focus:border-[#bd00ff] focus:outline-none text-white"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Your Email" 
                    className="w-full px-4 py-3 bg-[#121212] border border-[#bd00ff]/30 rounded-lg focus:border-[#bd00ff] focus:outline-none text-white"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    placeholder="Subject" 
                    className="w-full px-4 py-3 bg-[#121212] border border-[#bd00ff]/30 rounded-lg focus:border-[#bd00ff] focus:outline-none text-white"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    placeholder="Your Message" 
                    className="w-full px-4 py-3 bg-[#121212] border border-[#bd00ff]/30 rounded-lg focus:border-[#bd00ff] focus:outline-none text-white"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3 bg-gradient-to-r from-[#bd00ff] to-[#00d8ff] text-white rounded-lg hover:opacity-90 transition-all font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
