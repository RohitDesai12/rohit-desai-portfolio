import React from 'react';
import { GraduationCap, Code2, Cpu } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';

export const AboutSection: React.FC = () => {
  const { personal } = usePortfolio();

  return (
    <section id="about" className="py-24 border-b border-[#DDDFD8] bg-[#F7F7F2]">
      <Container>
        <SectionHeader
          number="01"
          tag="ENGINEERING PROFILE"
          title="About & Technical Background"
          subtitle="A perspective on software engineering, computational foundations, and building reliable systems."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative & Technical Philosophy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-[#202522]">
            <p className="text-lg sm:text-xl font-medium leading-relaxed font-heading text-[#202522]">
              I am a Computer Science Engineering student focused on building dependable, scalable software systems, clean backend services, and practical applications of machine learning.
            </p>

            <div className="space-y-4 text-base text-[#777D78] leading-relaxed">
              {personal.editorialSummary && personal.editorialSummary.length > 0 ? (
                personal.editorialSummary.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))
              ) : (
                <>
                  <p>
                    My technical journey began with core algorithmic foundations in Java and Python, expanding into modern backend engineering with Node.js and Express. I approach software development not merely as writing syntax, but as systematic decomposition: isolating requirements, designing predictable data contracts, and implementing maintainable architectures.
                  </p>
                  <p>
                    In artificial intelligence and natural language processing, I gravitate toward applied implementations—connecting model inference engines to practical web applications rather than treating machine learning as an isolated research silo.
                  </p>
                </>
              )}
            </div>

            {/* Core Pillars */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#E8EEE8]/40 border border-[#DDDFD8]">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#285943] font-semibold mb-2">
                  <Code2 size={16} />
                  <span>Systems & APIs</span>
                </div>
                <p className="text-xs text-[#777D78] leading-relaxed">
                  Designing structured RESTful endpoints, MVC service boundaries, and robust error-handling pipelines.
                </p>
              </div>

              <div className="p-4 bg-[#E8EEE8]/40 border border-[#DDDFD8]">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#285943] font-semibold mb-2">
                  <Cpu size={16} />
                  <span>Applied AI / ML</span>
                </div>
                <p className="text-xs text-[#777D78] leading-relaxed">
                  Integrating NLP workflows, feature extraction, and predictive models into user-facing web tools.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Specification Panel (5 cols) */}
          <div className="lg:col-span-5">
            <div className="border border-[#DDDFD8] bg-[#E8EEE8] p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-[#DDDFD8] pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-[#285943] uppercase tracking-wider font-semibold">
                  <GraduationCap size={16} />
                  <span>ACADEMIC SPECIFICATION</span>
                </div>
                <span className="font-mono text-xs text-[#777D78]">VERIFIED</span>
              </div>

              <div className="space-y-5 text-sm">
                <div>
                  <span className="font-mono text-xs text-[#777D78] uppercase block mb-1">
                    DEGREE PROGRAM
                  </span>
                  <div className="font-heading font-bold text-base text-[#202522]">
                    {personal.academicHighlights.degree}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-xs text-[#777D78] uppercase block mb-1">
                    INSTITUTION
                  </span>
                  <div className="text-[#202522] font-medium">
                    {personal.academicHighlights.institution}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-2 border-y border-[#DDDFD8]">
                  <div>
                    <span className="font-mono text-xs text-[#777D78] uppercase block mb-1">
                      CURRENT STANDING
                    </span>
                    <div className="font-mono text-lg font-bold text-[#285943]">
                      CGPA {personal.academicHighlights.cgpa}
                    </div>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-[#777D78] uppercase block mb-1">
                      EXPECTED GRADUATION
                    </span>
                    <div className="font-mono text-lg font-bold text-[#202522]">
                      {personal.academicHighlights.graduationYear}
                    </div>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-xs text-[#777D78] uppercase block mb-2">
                    CORE TECHNICAL DOMAINS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {personal.academicHighlights.focusAreas.map((area) => (
                      <Badge key={area} variant="default" size="sm">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
