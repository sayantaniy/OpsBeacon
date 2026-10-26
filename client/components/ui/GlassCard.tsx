/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

export interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'frosted' | 'outline' | 'dark' | 'yellow-glass' | 'mint-glass';
  className?: string;
  withGlow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'frosted',
  className = '',
  withGlow = false,
  ...props
}) => {
  const variantStyles = {
    frosted: 'bg-white/80 backdrop-blur-2xl border border-[#091316]/20 shadow-[0_20px_50px_rgba(9,19,22,0.06)]',
    outline: 'border-2 border-[#091316] bg-transparent backdrop-blur-sm',
    dark: 'bg-[#061114]/90 backdrop-blur-2xl border border-neutral-800 text-white shadow-2xl',
    'yellow-glass': 'bg-[#00D084]/20 backdrop-blur-xl border border-[#091316] shadow-lg',
    'mint-glass': 'bg-[#00D084]/20 backdrop-blur-xl border border-[#091316] shadow-lg',
  }[variant];

  return (
    <motion.div
      className={`rounded-3xl p-6 md:p-8 transition-shadow relative overflow-hidden ${variantStyles} ${withGlow ? 'before:absolute before:inset-0 before:bg-radial before:from-purple-500/10 before:to-transparent before:pointer-events-none' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
