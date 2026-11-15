import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SectionHeaderProps {
  number?: string;
  tag?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  tag,
  title,
  subtitle,
  className,
  align = 'left',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center max-w-2xl mx-auto' : 'max-w-3xl',
        className
      )}
    >
      <div className={cn(
        'flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#777D78] mb-3',
        align === 'center' && 'justify-center'
      )}>
        {number && <span className="text-[#285943] font-semibold">{number}</span>}
        {number && tag && <span className="opacity-40">//</span>}
        {tag && <span>{tag}</span>}
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#202522] tracking-tight leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-[#777D78] font-normal leading-relaxed">
          {subtitle}
        </p>
      )}

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 48 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={cn('mt-6 h-[2px] bg-[#285943]', align === 'center' && 'mx-auto')}
      />
    </motion.div>
  );
};
