import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'outline' | 'subtle';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
}) => {
  const baseStyles = 'inline-flex items-center font-mono rounded-xs transition-colors';

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 tracking-wide',
  };

  const variantStyles = {
    default: 'bg-[#E8EEE8] text-[#202522] border border-[#DDDFD8]',
    accent: 'bg-[#285943]/10 text-[#285943] border border-[#285943]/20 font-medium',
    outline: 'bg-transparent text-[#777D78] border border-[#DDDFD8]',
    subtle: 'bg-[#F0F2EB] text-[#202522]',
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
    >
      {children}
    </span>
  );
};
