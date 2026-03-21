import React from 'react';
import FadeInWhenVisible from '../../../components/Animation/FadeInWhenVisible';
import Timeline from '../../../components/UI/Timeline';
import { experienceData } from '../../../constants/experience';
import SectionWrapper from '../../../components/Animation/SectionWrapper';

const Experience: React.FC = () => {
  return (
    <SectionWrapper id="experience" className="py-20">
      <div className="container-custom">
        <FadeInWhenVisible>
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Опыт работы</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Более 5 лет создания сложных веб-приложений
          </p>
        </FadeInWhenVisible>

        <Timeline items={experienceData} />
      </div>
    </SectionWrapper>
  );
};

export default Experience;
