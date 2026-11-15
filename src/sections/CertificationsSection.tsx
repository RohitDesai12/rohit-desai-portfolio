import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Trophy, Sparkles, Eye, FileText } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CertificationItem } from '../data/certifications';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { CertificateViewerModal } from '../components/certificate/CertificateViewerModal';

export const CertificationsSection: React.FC = () => {
  const { certifications, achievements } = usePortfolio();
  const [selectedCertificate, setSelectedCertificate] = useState<CertificationItem | null>(null);
  const [initialDocIndex, setInitialDocIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleOpenCertificate = (cert: CertificationItem, docIndex: number = 0) => {
    setSelectedCertificate(cert);
    setInitialDocIndex(docIndex);
    setIsViewerOpen(true);
  };

  const handleCloseCertificate = () => {
    setIsViewerOpen(false);
  };

  const visibleCertifications = certifications.filter((c) => !c.hidden);

  return (
    <section id="certifications" className="py-24 border-b border-[#DDDFD8] bg-[#F7F7F2]">
      <Container>
        <SectionHeader
          number="05"
          tag="CREDENTIALS & RECOGNITION"
          title="Certifications & Technical Milestones"
          subtitle="Accredited government and IIT certifications, official result transcripts, competitive hackathons, and industry simulations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Group 1: Certifications & Training (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-[#DDDFD8] pb-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#285943] font-semibold tracking-wider">
                <ShieldCheck size={16} />
                <span>Accredited Certifications</span>
              </div>
              <span className="font-mono text-xs text-[#777D78]">
                {visibleCertifications.length} Credentials Available
              </span>
            </div>

            <div className="space-y-4">
              {visibleCertifications.map((cert, cIdx) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: cIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -2 }}
                  className="border border-[#DDDFD8] bg-[#E8EEE8]/40 p-6 space-y-4 hover:border-[#285943]/50 transition-colors shadow-xs"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold font-heading text-[#202522]">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-mono text-[#285943] mt-0.5">
                        {cert.issuer}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {cert.score && (
                        <Badge variant="accent" size="sm">
                          Score: {cert.score}
                        </Badge>
                      )}
                      <Badge variant="default" size="sm">
                        Verified
                      </Badge>
                    </div>
                  </div>

                  {cert.notes && (
                    <p className="text-xs text-[#777D78] leading-relaxed">
                      {cert.notes}
                    </p>
                  )}

                  {/* Metadata line: Timeline & Roll No */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#DDDFD8]/60 text-xs font-mono text-[#777D78]">
                    <div className="flex items-center gap-3">
                      {cert.date && <span>SESSION: {cert.date}</span>}
                      {cert.rollNo && <span>// ROLL: {cert.rollNo}</span>}
                    </div>

                    {/* View Options (Strictly in-browser view; NO download option provided) */}
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleOpenCertificate(cert, 0)}
                        icon={<Eye size={13} />}
                        iconPosition="left"
                      >
                        View Certificate
                      </Button>

                      {/* If certification has a result sheet / scorecard (e.g. AI Bootcamp) */}
                      {cert.resultPdf && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenCertificate(cert, 1)}
                          icon={<FileText size={13} />}
                          iconPosition="left"
                        >
                          View Result Sheet
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Group 2: Achievements & Activities (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-[#DDDFD8] pb-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#285943] font-semibold tracking-wider">
                <Trophy size={16} />
                <span>Achievements & Activities</span>
              </div>
              <span className="font-mono text-xs text-[#777D78]">Recognized</span>
            </div>

            <div className="space-y-4">
              {achievements.map((achievement, aIdx) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: aIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -2 }}
                  className="border border-[#DDDFD8] bg-[#F7F7F2] p-6 space-y-3 hover:border-[#285943]/40 transition-colors shadow-xs"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-base font-bold font-heading text-[#202522]">
                      {achievement.title}
                    </h3>
                    <Badge variant="default" size="sm">
                      {achievement.category}
                    </Badge>
                  </div>

                  <div className="text-xs font-mono text-[#777D78]">
                    {achievement.organization}
                  </div>

                  <p className="text-xs sm:text-sm text-[#202522] leading-relaxed">
                    {achievement.description}
                  </p>

                  {achievement.impactHighlight && (
                    <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#285943]">
                      <Sparkles size={13} />
                      <span>{achievement.impactHighlight}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Global Certificate & Result Viewer Modal (In-website view only; no download button) */}
        <CertificateViewerModal
          certificate={selectedCertificate}
          isOpen={isViewerOpen}
          onClose={handleCloseCertificate}
          initialDocumentIndex={initialDocIndex}
        />
      </Container>
    </section>
  );
};
