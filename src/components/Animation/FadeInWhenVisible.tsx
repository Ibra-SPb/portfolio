/* eslint-disable react-hooks/set-state-in-effect */
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { type ReactNode, useMemo, useEffect, useState } from 'react';

interface FadeInWhenVisibleProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  className = '',
  once = false,
  threshold = 0.3,
  rootMargin = '0px 0px -100px 0px',
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold,
    rootMargin,
  });

  useEffect(() => {
    if (!once && !inView) {
      setHasAnimated(false);
    }
  }, [inView, once]);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  const directions = useMemo(
    () => ({
      up: { y: 50, x: 0 },
      down: { y: -50, x: 0 },
      left: { x: 50, y: 0 },
      right: { x: -50, y: 0 },
    }),
    [],
  );

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const variants = {
    hidden: {
      opacity: 0,
      ...directions[direction],
      transition: { duration, delay, ease: 'easeOut' },
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      ...directions[direction],
      transition: { duration: 0.3, ease: 'easeIn' },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={hasAnimated ? 'visible' : 'hidden'}
      exit="exit"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;
