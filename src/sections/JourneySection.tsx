import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';

export const JourneySection: React.FC = () => {
  const { education } = usePortfolio();

  return (
    <section id="journey" className="py-24 border-b border-[#DDDFD8] bg-[#F7F7F2]">
      <Container>
        <SectionHeader
          number="04"
          tag="ACADEMIC MILESTONES"
          title="Education & Engineering Journey"
          subtitle="A chronological timeline of verified academic coursework, foundational milestones, and institutions."
        />

        <div className="relative border-l border-[#DDDFD8] ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-12">
          {education.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#F7F7F2] border-2 border-[#285943] transition-colors group-hover:bg-[#285943]" />

              <div className="border border-[#DDDFD8] bg-[#F7F7F2] p-6 sm:p-8 hover:border-[#285943]/40 transition-colors">
                {/* Header Row: Duration & Score */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DDDFD8] pb-3 mb-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#285943] font-semibold">
                    <Calendar size={13} />
                    <span>{item.duration}</span>
                  </div>

                  <div className="px-2.5 py-1 bg-[#E8EEE8] border border-[#DDDFD8] font-mono text-xs text-[#202522]">
                    <span className="text-[#777D78] mr-1">{item.scoreLabel}:</span>
                    <span className="font-bold text-[#285943]">{item.scoreValue}</span>
                  </div>
                </div>

                {/* Degree & Field */}
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#202522]">
                  {item.degree}
                </h3>

                {/* Institution & Location */}
                <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-[#777D78]">
                  <span className="font-medium text-[#202522]">{item.institution}</span>
                  {item.location && (
                    <span className="flex items-center gap-1 font-mono text-xs">
                      <MapPin size={12} />
                      <span>{item.location}</span>
                    </span>
                  )}
                </div>

                {/* Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2 border-t border-[#DDDFD8] pt-4">
                    {item.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="text-xs sm:text-sm text-[#777D78] flex items-start gap-2.5 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#285943] mt-1.5 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
