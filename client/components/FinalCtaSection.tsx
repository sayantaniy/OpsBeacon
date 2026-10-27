/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PillButton } from './ui/PillButton';
import { SITE_CONTENT } from '../app/_data/landing';
import { ArrowRight, Terminal } from 'lucide-react';

interface FinalCtaSectionProps {
  onOpenConnectModal: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenConnectModal }) => {
  return (
    <section className="relative w-full py-24 md:py-36 bg-[#F4F7F6] border-b-2 border-[#091316]/20 overflow-hidden">
      {/* Background Graphic Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]" 
        style={{
          backgroundImage: 'radial-gradient(#091316 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Unboxed Kicker */}
        <div className="flex items-center gap-2 mb-6 text-xs sm:text-sm font-mono font-black uppercase tracking-widest text-[#0D9488]">
          <Terminal className="w-4 h-4" />
          
        </div>

        {/* Massive Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-black uppercase tracking-tighter text-[#091316] leading-[0.88] mb-8 font-display text-balance">
          {SITE_CONTENT.finalCta.header}
        </h2>

        {/* Subtext */}
        <p className="text-base sm:text-xl text-neutral-700 font-semibold max-w-2xl leading-relaxed mb-10">
          {SITE_CONTENT.finalCta.subtext}
        </p>

        {/* Giant Mint Pill Button */}
        <PillButton
          size="xl"
          variant="mint"
          onClick={onOpenConnectModal}
          icon={<ArrowRight className="w-6 h-6" />}
          className="shadow-[8px_8px_0px_#091316] hover:shadow-[12px_12px_0px_#091316] text-xl px-12 py-5"
        >
          {SITE_CONTENT.finalCta.buttonText}
        </PillButton>

        {/* Unboxed Micro Guarantee */}
        <p className="mt-8 text-xs sm:text-sm font-mono font-bold text-neutral-600">
          {SITE_CONTENT.finalCta.guarantee}
        </p>
      </div>
    </section>
  );
};

export default FinalCtaSection;
