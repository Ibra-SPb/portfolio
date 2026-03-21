import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { navigationItems } from '../../constants/navigation';
import { Menu, X, Moon, Sun, Download } from 'lucide-react';
import Button from '../UI/Button';
import { useTheme } from '../../hooks/useTheme';
import { useScrollPosition } from '../../hooks/useScrollPosition';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const scrolled = useScrollPosition(50);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const scrollToSection = useCallback(
    (href: string) => {
      closeMenu();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [closeMenu],
  );

  const handleDownloadResume = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/files/Сабирбаев Ибрагим Батырович - CV:hh.pdf';
    link.download = 'CV_Sabirbaev_Ibragim_Frontend.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const headerClasses = useMemo(
    () =>
      `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg py-2'
          : 'bg-transparent py-4'
      }`,
    [scrolled],
  );

  const logoClasses = useMemo(
    () =>
      `text-2xl font-bold gradient-text transition-transform duration-300 hover:scale-105`,
    [],
  );

  const mobileMenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  const navItemVariants = {
    hover: {
      y: -2,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
        damping: 20,
      }}
      className={headerClasses}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className={logoClasses}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="На главную"
          >
            IS
          </motion.a>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigationItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                variants={navItemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <span className="text-blue-500">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </motion.a>
            ))}

            <motion.button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              aria-label={
                isDark ? 'Включить светлую тему' : 'Включить темную тему'
              }
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            <Button size="sm" onClick={handleDownloadResume} className="ml-2">
              <Download className="w-4 h-4 mr-2" />
              Резюме
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={
                isDark ? 'Включить светлую тему' : 'Включить темную тему'
              }
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            <motion.button
              onClick={toggleMenu}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        <motion.div
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          variants={mobileMenuVariants}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2 border-t border-gray-200 dark:border-gray-700 mt-4">
            {navigationItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 10 }}
                whileTap={{ x: 0 }}
              >
                <span className="text-blue-500">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </motion.a>
            ))}

            <div className="pt-4 mt-2 border-t border-gray-200 dark:border-gray-700">
              <Button
                fullWidth
                onClick={handleDownloadResume}
                className="flex items-center justify-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Скачать резюме
              </Button>
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default React.memo(Header);
