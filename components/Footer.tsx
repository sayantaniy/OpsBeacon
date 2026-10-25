/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SITE_CONTENT } from '../app/_data/landing';
import { Terminal, Bell } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="docs" className="w-full bg-[#061114] text-[#00D084] border-t-2 border-[#091316]">
      {/* Upper Announcement Ribbon */}
      <div className="border-b border-neutral-800 py-3.5 px-4 sm:px-6 lg:px-8 bg-[#040b0e]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono font-bold">
          <div className="flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-[#00D084] animate-bounce" />
            <span className="uppercase tracking-wider text-neutral-200">
              {SITE_CONTENT.footer.upcomingNotice}
            </span>
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <Terminal className="w-3.5 h-3.5 text-[#2DD4BF]" />
            <span>npm i -g @opsbeacon/cli // PREVIEW STAGE</span>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Left Column: Brand Lockup & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#00D084] text-[#061114] flex items-center justify-center font-black font-mono text-sm rounded-lg shadow-sm">
                OB
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase font-display text-white">
                {SITE_CONTENT.brand.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-medium max-w-sm leading-relaxed">
              The unified deployment & monitoring platform for full-stack developers. Read-only by default, human approval for every production action.
            </p>

            <div className="pt-2 text-[11px] font-mono text-neutral-500">
              {SITE_CONTENT.footer.copyright}
            </div>
          </div>

          {/* Right Columns: Nav Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {SITE_CONTENT.footer.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <p className="font-mono text-xs font-black uppercase tracking-wider text-[#00D084]">
                  {section.title}
                </p>
                <ul className="space-y-2 text-xs font-medium text-neutral-300">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={link.href}
                        className="hover:text-[#00D084] hover:underline transition-colors flex items-center gap-1"
                      >
                        <span>{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
