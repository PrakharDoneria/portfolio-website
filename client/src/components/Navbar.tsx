import { Link } from "wouter";

interface NavbarProps {
  visible: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Navbar({ visible, mobileMenuOpen, setMobileMenuOpen }: NavbarProps) {
  return (
    <nav className={`fixed w-full top-0 z-40 glass-nav border-b border-white/10 transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <a href="#" className="text-2xl font-bold gradient-text">PRAKHAR<span className="text-white">.dev</span></a>
          <div className="hidden lg:flex items-center gap-8">
            <a href="#about" className="nav-link text-lg font-medium hover:text-[#00ffd5] transition-colors">About</a>
            <a href="#skills" className="nav-link text-lg font-medium hover:text-[#00ffd5] transition-colors">Skills</a>
            <a href="#projects" className="nav-link text-lg font-medium hover:text-[#00ffd5] transition-colors">Projects</a>
            <a href="#apis" className="nav-link text-lg font-medium hover:text-[#00ffd5] transition-colors">APIs</a>
            <a href="#contact" className="nav-link text-lg font-medium hover:text-[#00ffd5] transition-colors">Contact</a>
            <a href="#" className="px-5 py-2 border border-[#bd00ff] rounded-lg hover:bg-[#bd00ff]/20 transition-all">Resume</a>
          </div>
          <div 
            className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 cursor-none z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`w-7 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-7 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-7 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </div>
      </div>
    </nav>
  );
}
