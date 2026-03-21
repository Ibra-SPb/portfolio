import React from 'react';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Contact from './sections/Contact';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
};

export default HomePage;
