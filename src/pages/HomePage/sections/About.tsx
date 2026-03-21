import React from 'react';
import { motion } from 'framer-motion';
import FadeInWhenVisible from '../../../components/Animation/FadeInWhenVisible';
import { User, Calendar, MapPin, Languages } from 'lucide-react';
import SectionWrapper from '../../../components/Animation/SectionWrapper';

const About: React.FC = () => {
  const stats = [
    { label: 'Опыт в IT', value: '6+ лет', icon: Calendar },
    { label: 'Проектов', value: '15+', icon: User },
    { label: 'Языки', value: '3', icon: Languages },
    { label: 'Геология', value: 'Магистр', icon: MapPin },
  ];

  return (
    <SectionWrapper
      id="about"
      className="py-20 bg-gray-50 dark:bg-gray-800/50"
      threshold={0.3}
      rootMargin="-50px 0px -50px 0px"
    >
      <div className="container-custom">
        <FadeInWhenVisible once={false} threshold={0.2}>
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Обо мне</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Моя уникальная траектория: от геологии к созданию сложных
            интерфейсов
          </p>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeInWhenVisible
            once={false}
            threshold={0.3}
            delay={0.2}
            direction="left"
          >
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 p-1">
                <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 p-8 flex items-center justify-center">
                  <span className="text-8xl">👨‍💻</span>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <stat.icon className="w-6 h-6 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible
            once={false}
            threshold={0.3}
            delay={0.3}
            direction="right"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">
                Из геологов в разработчики
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                В IT с 2018 года, начинал с консалтинга, далее перешел в
                разработку специализированных приложений для геологов. Мой
                уникальный бэкграунд позволяет мне видеть задачи под необычным
                углом и создавать решения, которые действительно нужны
                пользователям.
              </p>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Рассматриваю предложения от компаний с открытой культурой
                общения. Сейчас для меня в приоритете участие в разработке
                интересных и полезных для людей IT решений.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <div>
                  <h4 className="font-semibold mb-2">Образование</h4>
                  <p className="text-sm text-gray-500">
                    Магистр геологии, 2015
                  </p>
                  <p className="text-sm text-gray-500">СПбГУ / Геологический</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Бакалавр геологии, 2013
                  </p>
                  <p className="text-sm text-gray-500">СПбГУ / Геологический</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Языки</h4>
                  <ul className="space-y-1 text-sm text-gray-500">
                    <li>🇷🇺 Русский</li>
                    <li>🇬🇧 Английский</li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
