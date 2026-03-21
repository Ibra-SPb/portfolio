import type { NavigationItem } from '../types';
import { Home, User, Briefcase, Code, Mail } from 'lucide-react';

export const navigationItems: NavigationItem[] = [
  { name: 'Главная', href: '#home', icon: <Home className="w-4 h-4" /> },
  { name: 'Обо мне', href: '#about', icon: <User className="w-4 h-4" /> },
  { name: 'Опыт', href: '#experience', icon: <Briefcase className="w-4 h-4" /> },
  { name: 'Навыки', href: '#skills', icon: <Code className="w-4 h-4" /> },
  { name: 'Контакты', href: '#contact', icon: <Mail className="w-4 h-4" /> },
];