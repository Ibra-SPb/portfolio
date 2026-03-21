import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/UI/Button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToExperience = () => {
    const experienceSection = document.querySelector('#experience');
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="container-custom text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
          >
            👋 Привет, я
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">Ибрагим Сабирбаев</span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8"
          >
            Frontend Developer с опытом создания
            <span className="block text-blue-600 dark:text-blue-400">
              сложных веб-приложений
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 mb-10"
          >
            В IT с 2019 года. Специализируюсь на React, TypeScript и создании
            высоконагруженных интерфейсов. Ищу интересные проекты, которые
            делают жизнь людей лучше.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button onClick={scrollToContact} size="lg">
              Связаться со мной
            </Button>
            <Button onClick={scrollToExperience} size="lg" variant="outline">
              Смотреть проекты
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex gap-4 justify-center"
          >
            {[
              { icon: Github, href: 'https://github.com/Ibra-SPb' },
              {
                icon: Linkedin,
                href: 'https://www.linkedin.com/in/ibragim-sabirbaev/',
              },
              { icon: Mail, href: 'mailto:isabirbaev@gmail.com' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.1 }}
      >
        <ArrowDown className="w-6 h-6 text-gray-400" />
      </motion.button>
    </section>
  );
};

export default Hero;
