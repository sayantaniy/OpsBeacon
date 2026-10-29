/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PillButton } from './ui/PillButton';
import { SITE_CONTENT } from '../app/_data/landing';
import { Check, ShieldCheck, Lock, FileKey2 } from 'lucide-react';

interface SecuritySectionProps {
  onOpenConnectModal: () => void;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({ onOpenConnectModal }) => {
  return (
    <section id="security" className="relative w-full py-24 md:py-32 bg-[#061114] text-white border-b-2 border-[#091316]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Mint Green Heading, Manifesto & CTA */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono font-black uppercase tracking-widest text-[#00D084]">
              <Lock className="w-3.5 h-3.5" />
              <span></span>
            </div>

            <h2 className="break-words text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tighter text-[#00D084] leading-none mb-6 font-display">
              {SITE_CONTENT.security.header}
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 font-medium leading-relaxed mb-8">
              {SITE_CONTENT.security.subtext}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <PillButton
                variant="mint"
                size="lg"
                onClick={onOpenConnectModal}
              >
                {SITE_CONTENT.security.cta}
              </PillButton>

              <PillButton
                variant="dark-ghost"
                size="lg"
                href="#docs"
              >
                Read Specification
              </PillButton>
            </div>

            {/* Cryptographic Badges */}
            <div className="mt-12 pt-8 border-t border-neutral-800 w-full flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00D084]" />
                <span></span>
              </div>
              <div className="flex items-center gap-2">
                <FileKey2 className="w-4 h-4 text-[#2DD4BF]" />
                <span></span>
              </div>
            </div>
          </div>

          {/* Right Column: List of Security Pillars with Mint Green Checkmarks */}
          <div className="lg:col-span-6 min-w-0 divide-y divide-neutral-800">
            {SITE_CONTENT.security.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="py-8 first:pt-0 last:pb-0 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-[#00D084] text-[#061114] flex items-center justify-center shrink-0 mt-1 shadow-md">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>

                  <div className="min-w-0 space-y-2">
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-display">
                      {pillar.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-300 font-medium leading-relaxed">
                      {pillar.description}
                    </p>
                    <div className="pt-2 text-xs font-mono text-[#2DD4BF]">
                      → {pillar.details}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;