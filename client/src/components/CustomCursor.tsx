import { useEffect, useState } from 'react';
import useMousePosition from '@/hooks/useMousePosition';

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.tagName === 'A' || 
                     target.tagName === 'BUTTON' || 
                     target.closest('a') || 
                     target.closest('button');
      
      setIsHovering(!!isLink);
    };

    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        className={`fixed w-5 h-5 rounded-full bg-[#bd00ff]/50 mix-blend-difference pointer-events-none z-[9999] transition-all duration-200 ${isHovering ? 'w-12 h-12 bg-[#00ffd5]/30 mix-blend-lighten' : ''}`}
        style={{
          left: `${x}px`,
          top: `${y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />
      <div 
        className="fixed w-12 h-12 border-2 border-[#00d8ff]/50 rounded-full pointer-events-none z-[9998] transition-all duration-300 opacity-50"
        style={{
          left: `${x}px`,
          top: `${y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  );
}
