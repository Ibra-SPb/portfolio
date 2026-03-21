import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import FadeInWhenVisible from '../../../components/Animation/FadeInWhenVisible';
import Button from '../../../components/UI/Button';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgonzwgl';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

interface FormspreeError {
  message: string;
  field?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = useCallback((): boolean => {
    if (!formData.name.trim()) {
      setFormStatus({
        type: 'error',
        message: 'Пожалуйста, введите ваше имя',
      });
      return false;
    }

    if (!validateEmail(formData.email)) {
      setFormStatus({
        type: 'error',
        message: 'Пожалуйста, введите корректный email',
      });
      return false;
    }

    if (formData.message.trim().length < 10) {
      setFormStatus({
        type: 'error',
        message: 'Сообщение должно содержать минимум 10 символов',
      });
      return false;
    }

    return true;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      setFormStatus({ type: 'loading', message: 'Отправка...' });

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `Новое сообщение с портфолио от ${formData.name}`,
            _replyto: formData.email,
            _template: 'table',
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setFormStatus({
            type: 'success',
            message:
              'Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.',
          });

          setFormData({ name: '', email: '', message: '' });

          setTimeout(() => {
            setFormStatus({ type: 'idle', message: '' });
          }, 5000);
        } else {
          if (data.errors) {
            const errorMessages = data.errors
              .map((err: FormspreeError) => err.message)
              .join(', ');
            throw new Error(errorMessages);
          } else {
            throw new Error('Ошибка при отправке формы');
          }
        }
      } catch (error) {
        console.error('Error sending form:', error);
        setFormStatus({
          type: 'error',
          message:
            'Произошла ошибка при отправке. Пожалуйста, попробуйте позже или напишите мне напрямую на isabirbaev@gmail.com',
        });
      }
    },
    [formData, validateForm],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (formStatus.type === 'error') {
        setFormStatus({ type: 'idle', message: '' });
      }
    },
    [formStatus.type],
  );

  const contactInfo = [
    { icon: Phone, text: '+7 (911) 770-10-98', href: 'tel:+79117701098' },
    {
      icon: Mail,
      text: 'isabirbaev@gmail.com',
      href: 'mailto:isabirbaev@gmail.com',
    },
    { icon: MapPin, text: 'Санкт-Петербург, Россия', href: '#' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Ibra-SPb', label: 'GitHub' },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/ibragim-sabirbaev/',
      label: 'LinkedIn',
    },
    {
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.06-.2-.06-.06-.16-.04-.22-.02-.1.02-1.7 1.08-4.8 3.17-.45.31-.86.46-1.22.45-.4-.01-1.17-.23-1.75-.42-.71-.23-1.28-.35-1.23-.74.03-.2.29-.4.8-.61 3.16-1.38 5.27-2.29 6.33-2.73 3.01-1.25 3.64-1.47 4.05-1.47.09 0 .29.02.42.12.1.08.14.19.15.3-.01.07-.02.22-.03.32z" />
        </svg>
      ),
      href: 'https://t.me/lbra_Sabirbaev',
      label: 'Telegram',
    },
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container-custom">
        <FadeInWhenVisible>
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Свяжитесь со мной</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Открыт к обсуждению проектов и интересных предложений
          </p>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <FadeInWhenVisible direction="left">
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold">
                Давайте обсудим ваш проект
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Я всегда открыт к новым знакомствам и интересным проектам. Если
                у вас есть идея или предложение - не стесняйтесь связаться со
                мной!
              </p>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    whileHover={{ x: 10 }}
                    whileTap={{ x: 0 }}
                  >
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.text}
                    </span>
                  </motion.a>
                ))}
              </div>

              <div className="pt-6">
                <h4 className="font-semibold mb-4">Социальные сети</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="right">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
              noValidate
            >
              {formStatus.type !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg flex items-start gap-3 ${
                    formStatus.type === 'success'
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                      : formStatus.type === 'error'
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                        : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                  }`}
                >
                  {formStatus.type === 'success' && (
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  {formStatus.type === 'error' && (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  {formStatus.type === 'loading' && (
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin flex-shrink-0 mt-0.5" />
                  )}
                  <span className="text-sm">{formStatus.message}</span>
                </motion.div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={formStatus.type === 'loading'}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Иван Иванов"
                  aria-label="Ваше имя"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={formStatus.type === 'loading'}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="ivan@example.com"
                  aria-label="Ваш email"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Сообщение *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={formStatus.type === 'loading'}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Расскажите о вашем проекте..."
                  aria-label="Текст сообщения"
                  minLength={10}
                />
              </div>

              <input
                type="text"
                name="_gotcha"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <input type="hidden" name="_language" value="ru" />

              <Button
                type="submit"
                fullWidth
                disabled={formStatus.type === 'loading'}
              >
                {formStatus.type === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Отправить сообщение
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                Нажимая "Отправить", вы соглашаетесь с обработкой персональных
                данных
              </p>
            </form>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Contact);
