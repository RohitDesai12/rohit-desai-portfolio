import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { CertificationItem } from '../../data/certifications';
import { Badge } from '../common/Badge';

interface CertificateViewerModalProps {
  certificate: CertificationItem | null;
  isOpen: boolean;
  onClose: () => void;
  initialDocumentIndex?: number;
}

export const CertificateViewerModal: React.FC<CertificateViewerModalProps> = ({
  certificate,
  isOpen,
  onClose,
  initialDocumentIndex = 0,
}) => {
  const [activeDocIndex, setActiveDocIndex] = useState(0);

  // Synchronize initial document index when opened
  useEffect(() => {
    if (isOpen) {
      setActiveDocIndex(initialDocumentIndex);
    }
  }, [isOpen, initialDocumentIndex, certificate]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!certificate) return null;

  const docs = certificate.documents && certificate.documents.length > 0
    ? certificate.documents
    : [{ label: 'Official Certificate', pdfPath: certificate.certificatePdf }];

  const currentDoc = docs[activeDocIndex] || docs[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#202522]/65 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl h-[90vh] bg-[#F7F7F2] border border-[#DDDFD8] shadow-2xl rounded-sm z-10 flex flex-col my-auto overflow-hidden text-[#202522]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-viewer-title"
          >
            {/* Modal Header */}
            <div className="px-3.5 sm:px-6 py-2.5 sm:py-3.5 bg-[#F7F7F2] border-b border-[#DDDFD8] shrink-0 space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-xs bg-[#285943] text-[#F7F7F2] flex items-center justify-center shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <h3 id="cert-viewer-title" className="font-heading font-bold text-xs sm:text-base text-[#202522] truncate">
                        {certificate.title}
                      </h3>
                      {certificate.score && (
                        <Badge variant="accent" size="sm" className="text-[10px] sm:text-xs">
                          {certificate.score}
                        </Badge>
                      )}
                    </div>
                    <p className="text-[10px] sm:text-xs font-mono text-[#777D78] truncate max-w-[200px] sm:max-w-xl">
                      {certificate.issuer} {certificate.rollNo && `// Roll: ${certificate.rollNo}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-[#777D78] px-2 py-0.5 bg-[#E8EEE8] border border-[#DDDFD8]">
                    <Eye size={12} />
                    <span>In-Browser View Only</span>
                  </span>
                  <button
                    onClick={onClose}
                    className="p-1.5 text-[#777D78] hover:text-[#202522] hover:bg-[#E8EEE8] rounded-xs transition-colors shrink-0"
                    aria-label="Close certificate viewer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Multi-Document Tabs (Certificate vs Result Sheet) */}
              {docs.length > 1 && (
                <div className="flex items-center gap-1.5 sm:gap-2 pt-1 border-t border-[#DDDFD8]/60 overflow-x-auto pb-1">
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#777D78] uppercase mr-1 shrink-0">
                    Document:
                  </span>
                  {docs.map((doc, idx) => (
                    <button
                      key={doc.label}
                      onClick={() => setActiveDocIndex(idx)}
                      className={`px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-mono rounded-xs transition-colors flex items-center gap-1 shrink-0 ${
                        activeDocIndex === idx
                          ? 'bg-[#285943] text-[#F7F7F2] font-semibold shadow-xs'
                          : 'bg-[#E8EEE8] text-[#202522] hover:bg-[#DDDFD8] border border-[#DDDFD8]'
                      }`}
                    >
                      <FileText size={11} />
                      <span className="whitespace-nowrap">{doc.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Embedded PDF Viewer Window (No download button provided) */}
            <div className="flex-1 bg-[#E8EEE8] relative overflow-hidden">
              <iframe
                key={currentDoc.pdfPath}
                src={`${currentDoc.pdfPath}#toolbar=0&navpanes=0`}
                title={`${certificate.title} - ${currentDoc.label}`}
                className="w-full h-full border-0"
              />
            </div>

            {/* Modal Sub-footer */}
            <div className="px-5 py-2.5 bg-[#F7F7F2] border-t border-[#DDDFD8] flex items-center justify-between text-xs font-mono text-[#777D78] shrink-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-[#285943]" />
                <span>Viewing: <strong className="text-[#202522]">{currentDoc.label}</strong></span>
              </div>
              <button
                onClick={onClose}
                className="text-[#285943] hover:underline font-semibold"
              >
                Close View
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
