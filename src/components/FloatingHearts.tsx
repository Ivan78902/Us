import React, { useEffect, useRef } from 'react';

const FloatingHearts: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createHeart = () => {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
      container.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 5000);
    };

    const intervalId = setInterval(createHeart, 300);

    return () => clearInterval(intervalId);
  }, []);

  return <div ref={containerRef} className="floating-hearts"></div>;
};

export default FloatingHearts;