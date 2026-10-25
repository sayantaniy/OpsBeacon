/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { SITE_CONTENT } from '../app/_data/landing';

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="architecture" className="relative w-full py-20 md:py-28 bg-[#F4F7F6] border-b-2 border-[#091316]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono font-black uppercase tracking-widest text-[#0D9488]">
            <span>OPERATIONAL BLUEPRINT</span>
            <span aria-hidden="true">/</span>
            <span>THREE-STAGE PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-[#091316] leading-none mb-6 font-display">
            {SITE_CONTENT.howItWorks.header}
          </h2>
          <p className="text-base sm:text-lg text-neutral-700 font-semibold leading-relaxed">
            {SITE_CONTENT.howItWorks.subtext}
          </p>
        </div>

        {/* 3-Column Brutalist Cards with 2px Obsidian Borders on Albescent White */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SITE_CONTENT.howItWorks.steps.map((step, idx) => (
            <motion.div
              key={step.number}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="relative border-2 border-[#091316] rounded-3xl p-8 flex flex-col justify-between bg-white/80 backdrop-blur-md shadow-[6px_6px_0px_#091316] hover:shadow-[10px_10px_0px_#091316] transition-all group"
            >
              <div>
                {/* Massive Brutalist Number */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#091316]/15">
                  <span className="text-5xl sm:text-6xl font-black font-display text-[#091316] tracking-tighter group-hover:text-[#0D9488] transition-colors">
                    {step.number}
                  </span>
                  <span className="font-mono text-xs font-black uppercase text-[#0D9488]">
                    PHASE {idx + 1}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-2xl font-black uppercase tracking-tight text-[#091316] mb-2 font-display">
                  {step.title}
                </h3>
                <p className="text-xs font-mono font-bold text-[#0D9488] uppercase tracking-wide mb-4">
                  {step.tagline}
                </p>

                {/* Description */}
                <p className="text-sm font-semibold text-neutral-700 leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="space-y-2.5 pt-4 border-t border-[#091316]/15">
                {step.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2 text-xs font-bold text-[#091316]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] mt-1.5 shrink-0" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
