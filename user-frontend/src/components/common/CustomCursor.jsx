import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '16px',
        height: '16px',
        backgroundColor: '#ff0000',
        borderRadius: '50%',
        pointerEvents: 'none', // Prevents the dot from interfering with clicks
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.05s ease-out', // Smooth movement
        zIndex: 9999,
      }}
    />
  );
};

export default CustomCursor;