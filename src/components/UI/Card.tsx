import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
}) => {
  const baseStyles =
    'bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden';
  const hoverStyles = hoverable
    ? 'transition-all duration-300 hover:shadow-2xl hover:-translate-y-1'
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${baseStyles} ${hoverStyles} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
