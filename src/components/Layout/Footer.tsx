import React from 'react';
import { motion } from 'framer-motion';
import { navigationItems } from '../../constants/navigation';
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold gradient-text mb-4">
              Ибрагим Сабирбаев
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Frontend разработчик с опытом создания сложных веб-приложений.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <motion.li key={item.name} whileHover={{ x: 5 }}>
                  <a
                    href={item.href.toLowerCase()}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+7 (911) 770-10-98</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <span>isabirbaev@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Санкт-Петербург</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Социальные сети</h4>
            <div className="flex gap-4">
              <motion.a
                href="https://github.com/Ibra-SPb"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/ibragim-sabirbaev/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://t.me/lbra_Sabirbaev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.06-.2-.06-.06-.16-.04-.22-.02-.1.02-1.7 1.08-4.8 3.17-.45.31-.86.46-1.22.45-.4-.01-1.17-.23-1.75-.42-.71-.23-1.28-.35-1.23-.74.03-.2.29-.4.8-.61 3.16-1.38 5.27-2.29 6.33-2.73 3.01-1.25 3.64-1.47 4.05-1.47.09 0 .29.02.42.12.1.08.14.19.15.3-.01.07-.02.22-.03.32z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
          <p>© {currentYear} Ибрагим Сабирбаев. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
