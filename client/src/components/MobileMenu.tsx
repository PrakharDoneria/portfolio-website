interface MobileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function MobileMenu({ open, setOpen }: MobileMenuProps) {
  const closeMenu = () => setOpen(false);

  return (
    <div className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-xl flex flex-col justify-center items-center transform transition-transform duration-500 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col items-center gap-8">
        <a href="#about" className="text-2xl font-medium hover:text-[#00ffd5]" onClick={closeMenu}>About</a>
        <a href="#skills" className="text-2xl font-medium hover:text-[#00ffd5]" onClick={closeMenu}>Skills</a>
        <a href="#projects" className="text-2xl font-medium hover:text-[#00ffd5]" onClick={closeMenu}>Projects</a>
        <a href="#apis" className="text-2xl font-medium hover:text-[#00ffd5]" onClick={closeMenu}>APIs</a>
        <a href="#contact" className="text-2xl font-medium hover:text-[#00ffd5]" onClick={closeMenu}>Contact</a>
        <a href="#" className="px-6 py-3 mt-4 border border-[#bd00ff] rounded-lg hover:bg-[#bd00ff]/20 transition-all" onClick={closeMenu}>Resume</a>
      </div>
      <div className="absolute bottom-12 flex gap-6">
        <a href="https://github.com/PrakharDoneria" target="_blank" className="text-xl hover:text-[#00ffd5] transition-colors">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/prakhar-doneria-646090228/" target="_blank" className="text-xl hover:text-[#00ffd5] transition-colors">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://dev.to/prakhar_doneria" target="_blank" className="text-xl hover:text-[#00ffd5] transition-colors">
          <i className="fab fa-dev"></i>
        </a>
        <a href="https://twitter.com/prakhardoneria2" target="_blank" className="text-xl hover:text-[#00ffd5] transition-colors">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com/prakhardoneria/" target="_blank" className="text-xl hover:text-[#00ffd5] transition-colors">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  );
}
