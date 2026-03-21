import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface StaggerChildrenProps {
  children: ReactNode[];
  delay?: number;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

const StaggerChildren: React.FC<StaggerChildrenProps> = ({
  children,
  delay = 0,
  staggerDelay = 0.1,
  direction = 'up',
  className = '',
}) => {
  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, ...directions[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggerChildren;
