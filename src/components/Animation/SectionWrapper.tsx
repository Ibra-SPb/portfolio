import React, { type ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionWrapperProps {
  children: ReactNode;
  id: string;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className = '',
  threshold = 0.2,
  rootMargin = '-50px 0px -50px 0px',
}) => {
  const ref = useRef<HTMLElement>(null);

  const isInView = useInView(ref, {
    once: false,
    amount: threshold,
    margin: rootMargin,
  });

  return (
    <section id={id} ref={ref} className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;
