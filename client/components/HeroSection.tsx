/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PillButton } from './ui/PillButton';
import { LiquidGlassHeroArt } from './LiquidGlassHeroArt';
import { SITE_CONTENT } from '../app/_data/landing';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenConnectModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConnectModal }) => {
  return (
    <section className="relative w-full pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-[#F4F7F6] border-b border-[#091316]/15">
      {/* Subtle architectural grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]" 
        style={{
          backgroundImage: 'linear-gradient(#091316 1px, transparent 1px), linear-gradient(90deg, #091316 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Massive Brutalist Typography & Call to Action */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Unboxed Metadata Tagline */}
            <div className="flex items-center gap-2 mb-4 text-xs font-mono font-black uppercase tracking-widest text-[#0D9488]">
              <span>{SITE_CONTENT.hero.badge}</span>
              <span aria-hidden="true" className="text-neutral-400">·</span>
              <span className="flex items-center gap-1 text-[#091316]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00D084]" />
                READ-ONLY BY DEFAULT
              </span>
            </div>

            {/* Massive Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black uppercase tracking-tighter text-[#091316] leading-[0.88] mb-6 text-balance font-display">
              {SITE_CONTENT.hero.headline}
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg md:text-xl text-[#091316]/80 font-medium max-w-xl leading-relaxed mb-8">
              {SITE_CONTENT.hero.subtext}
            </p>

            {/* Side-by-Side Pill Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <PillButton
                size="lg"
                variant="mint"
                onClick={onOpenConnectModal}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                {SITE_CONTENT.hero.primaryCta}
              </PillButton>

              <PillButton
                size="lg"
                variant="ghost"
                href="#platform"
              >
                {SITE_CONTENT.hero.secondaryCta}
              </PillButton>
            </div>

            {/* Clean Unboxed Trust Separators */}
            <div className="w-full pt-6 border-t border-[#091316]/15 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm font-bold text-[#091316]">
              {SITE_CONTENT.hero.statPills.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
                  <span className="text-neutral-500">{stat.label}:</span>
                  <span className="font-extrabold uppercase text-[#091316]">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Liquid Glass & Floating 3D Purple Torus Artwork */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <LiquidGlassHeroArt />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
