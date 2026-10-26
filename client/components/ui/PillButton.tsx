/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

export interface PillButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'mint' | 'teal' | 'yellow' | 'dark-ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  href?: string;
}

export const PillButton: React.FC<PillButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  href,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-tight rounded-full transition-colors cursor-pointer select-none whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2';

  const sizeStyles = {
    sm: 'text-xs px-4 py-1.5 gap-1.5',
    md: 'text-sm px-6 py-2.5 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5',
    xl: 'text-lg px-10 py-4 gap-3 font-extrabold',
  }[size];

  const variantStyles = {
    primary: 'bg-[#091316] text-white hover:bg-black border-2 border-[#091316] shadow-sm',
    ghost: 'bg-transparent text-[#091316] border-2 border-[#091316] hover:bg-[#091316]/5',
    mint: 'bg-[#00D084] text-[#091316] border-2 border-[#091316] hover:bg-[#00be76] shadow-[2px_2px_0px_#091316]',
    teal: 'bg-[#0D9488] text-white border-2 border-[#091316] hover:bg-[#0f766e] shadow-[2px_2px_0px_#091316]',
    yellow: 'bg-[#00D084] text-[#091316] border-2 border-[#091316] hover:bg-[#00be76]',
    'dark-ghost': 'bg-transparent text-[#2DD4BF] border-2 border-[#2DD4BF] hover:bg-[#2DD4BF]/10',
  }[variant];

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default PillButton;
