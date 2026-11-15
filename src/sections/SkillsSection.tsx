import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';

export const SkillsSection: React.FC = () => {
  const { skills } = usePortfolio();

  return (
    <section id="skills" className="py-24 border-b border-[#DDDFD8] bg-[#F7F7F2]">
      <Container>
        <SectionHeader
          number="03"
          tag="TECHNICAL PROFICIENCY"
          title="Skills & Engineering Toolkit"
          subtitle="A categorized inventory of languages, frameworks, databases, and foundational computer science principles."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="border border-[#DDDFD8] bg-[#F7F7F2] p-6 hover:border-[#285943]/50 transition-colors shadow-xs"
            >
              <div className="border-b border-[#DDDFD8] pb-3 mb-4">
                <h3 className="text-base font-bold font-heading text-[#202522]">
                  {category.categoryTitle}
                </h3>
                <p className="text-xs text-[#777D78] mt-1 leading-relaxed">
                  {category.categoryDescription}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E8EEE8] border border-[#DDDFD8] text-xs font-mono text-[#202522] rounded-xs cursor-default hover:border-[#285943]/40"
                  >
                    <span>{skill.name}</span>
                    {skill.tag && (
                      <span className="text-[10px] text-[#285943] font-semibold uppercase tracking-wider">
                        • {skill.tag}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
