import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectImageCarouselProps {
  images: string[];
  projectTitle: string;
  className?: string;
  autoPlayInterval?: number;
}

export const ProjectImageCarousel: React.FC<ProjectImageCarouselProps> = ({
  images,
  projectTitle,
  className = '',
  autoPlayInterval = 3500,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-play effect: changes image automatically every 3.5s, pauses when user hovers
  useEffect(() => {
    if (images.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [images.length, isHovered, autoPlayInterval]);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleSelectDot = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  if (!images || images.length === 0) return null;

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden group/carousel select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Display Area */}
      <div className="relative w-full h-[200px] sm:h-[230px] md:h-[240px] flex items-center justify-center overflow-hidden bg-[#202522]/5">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${projectTitle} screenshot ${currentIndex + 1}`}
            initial={{ opacity: 0, x: direction * 35 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 35 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-contain border border-[#DDDFD8] shadow-xs"
            loading="lazy"
          />
        </AnimatePresence>
      </div>

      {/* Navigation Arrows (Rendered when more than 1 image) */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F7F7F2]/95 hover:bg-[#285943] text-[#202522] hover:text-[#F7F7F2] border border-[#DDDFD8] flex items-center justify-center transition-all duration-200 shadow-sm opacity-80 group-hover/carousel:opacity-100 z-10 cursor-pointer"
            aria-label="Previous screenshot"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F7F7F2]/95 hover:bg-[#285943] text-[#202522] hover:text-[#F7F7F2] border border-[#DDDFD8] flex items-center justify-center transition-all duration-200 shadow-sm opacity-80 group-hover/carousel:opacity-100 z-10 cursor-pointer"
            aria-label="Next screenshot"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

      {/* Progress Pill / Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-1 z-10 pointer-events-auto">
          <div className="flex items-center gap-1.5 bg-[#202522]/75 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => handleSelectDot(idx, e)}
                aria-label={`Jump to screenshot ${idx + 1}`}
                className={`transition-all duration-200 rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? 'w-3.5 h-1.5 bg-[#F7F7F2]'
                    : 'w-1.5 h-1.5 bg-[#F7F7F2]/40 hover:bg-[#F7F7F2]/75'
                }`}
              />
            ))}
            <span className="font-mono text-[9px] text-[#F7F7F2] ml-1">
              {currentIndex + 1}/{images.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
