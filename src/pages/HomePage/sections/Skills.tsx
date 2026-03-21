import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import FadeInWhenVisible from '../../../components/Animation/FadeInWhenVisible';
import { skillCategories } from '../../../constants/skills';
import { Code2, Palette, Database, Wrench, Cpu } from 'lucide-react';
import SectionWrapper from '../../../components/Animation/SectionWrapper';

const Skills: React.FC = () => {
  const getCategoryIcon = useCallback((categoryName: string) => {
    switch (categoryName) {
      case 'Frontend Core':
        return <Code2 className="w-6 h-6" />;
      case 'Styling':
        return <Palette className="w-6 h-6" />;
      case 'Backend / Database':
        return <Database className="w-6 h-6" />;
      case 'Tools & Methods':
        return <Wrench className="w-6 h-6" />;
      default:
        return <Cpu className="w-6 h-6" />;
    }
  }, []);

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }),
    [],
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { y: 20, opacity: 0, scale: 0.8 },
      visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 260,
          damping: 20,
        },
      },
    }),
    [],
  );

  return (
    <SectionWrapper
      id="skills"
      className="py-20 bg-gray-50 dark:bg-gray-800/50"
    >
      <div className="container-custom">
        <FadeInWhenVisible>
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Мой стек технологий</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Инструменты, которыми я владею на профессиональном уровне
          </p>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <FadeInWhenVisible key={idx} delay={idx * 0.1}>
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    {getCategoryIcon(category.name)}
                  </div>
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap gap-2"
                >
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      variants={itemVariants}
                      custom={i}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default React.memo(Skills);
