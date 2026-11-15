import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  download?: boolean | string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  isExternal,
  download,
  icon,
  iconPosition = 'right',
  className,
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-sm gap-1.5 font-mono tracking-wider',
    md: 'text-sm px-5 py-2.5 rounded-sm gap-2 tracking-normal',
    lg: 'text-base px-6 py-3 rounded-sm gap-2.5 tracking-normal',
  };

  const variantStyles = {
    primary:
      'bg-[#285943] text-[#F7F7F2] hover:bg-[#1E4332] active:bg-[#163326] shadow-sm',
    secondary:
      'bg-[#E8EEE8] text-[#202522] hover:bg-[#DFE7DF] border border-[#DDDFD8]',
    outline:
      'bg-transparent text-[#202522] border border-[#DDDFD8] hover:border-[#285943] hover:bg-[#E8EEE8]/40 hover:text-[#285943]',
    ghost:
      'bg-transparent text-[#202522] hover:text-[#285943] hover:bg-[#E8EEE8]/50',
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    const isAnchorExternal = isExternal ?? (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'));
    return (
      <a
        href={href}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        target={isAnchorExternal ? '_blank' : undefined}
        rel={isAnchorExternal ? 'noopener noreferrer' : undefined}
        download={download}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {content}
    </button>
  );
};
