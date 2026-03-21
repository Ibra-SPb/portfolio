/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
  width?: number;
  height?: number;
  lazy?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  placeholderColor = '#f3f4f6',
  width,
  height,
  lazy = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!lazy) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' },
    );

    const currentRef = document.querySelector(`[data-src="${src}"]`);
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => observer.disconnect();
  }, [src, lazy]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: placeholderColor }}
      data-src={src}
    >
      {isInView && (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
          )}
          <motion.img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={lazy ? 'lazy' : 'eager'}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            initial={{ scale: 1.1 }}
            animate={isLoaded ? { scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          />
        </>
      )}
    </div>
  );
};

export default OptimizedImage;
