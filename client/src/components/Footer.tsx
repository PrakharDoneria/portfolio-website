export default function Footer() {
  return (
    <footer className="py-8 bg-[#121212] border-t border-[#bd00ff]/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#" className="text-2xl font-bold gradient-text">PRAKHAR<span className="text-white">.dev</span></a>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Prakhar Doneria. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0">
            <a 
              href="#hero" 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#bd00ff]/20 text-[#bd00ff] hover:bg-[#bd00ff]/30 transition-all"
            >
              <i className="fas fa-arrow-up"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
