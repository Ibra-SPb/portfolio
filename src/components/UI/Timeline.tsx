import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { ExperienceItem } from '../../types';
import { Calendar, Briefcase, Award, ChevronRight } from 'lucide-react';

interface TimelineProps {
  items: ExperienceItem[];
}

const TimelineItem = memo(
  ({ item, index }: { item: ExperienceItem; index: number }) => {
    const [ref, inView] = useInView({
      triggerOnce: false,
      threshold: 0.3,
    });

    const isEven = React.useMemo(() => index % 2 === 0, [index]);

    return (
      <div
        ref={ref}
        className={`flex flex-col md:flex-row gap-8 mb-12 relative ${
          isEven ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
      >
        <motion.div
          className={`md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={
            inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }
          }
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-mono text-blue-600 dark:text-blue-400">
              {item.period}
            </span>
          </div>
        </motion.div>

        <motion.div
          className={`md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          animate={
            inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 50 : -50 }
          }
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-5 h-5 text-blue-500" />
              <h3 className="text-xl font-bold">{item.title}</h3>
            </div>

            <p className="text-lg text-blue-600 dark:text-blue-400 mb-4 font-medium">
              {item.company}
            </p>

            <div className="mb-4">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                Обязанности:
              </h4>
              <ul className="space-y-2">
                {item.description.map((desc, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <ChevronRight className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span>{desc}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-500" />
                Ключевые достижения:
              </h4>
              <ul className="space-y-2">
                {item.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    className="text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <span className="text-green-500 mr-2">⚡</span>
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {item.technologies.map((tech, i) => (
                <motion.span
                  key={i}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.index === nextProps.index
    );
  },
);

TimelineItem.displayName = 'TimelineItem';

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative py-8">
      {items.map((item, index) => (
        <TimelineItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
};

export default Timeline;
