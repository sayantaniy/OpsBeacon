/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PillButton } from './ui/PillButton';
import { SITE_CONTENT } from '../data/content';
import { Github, Twitter, MessageSquare, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenConnectModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConnectModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F4F7F6]/90 backdrop-blur-md border-b border-[#091316]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="OpsBeacon Homepage"
          >
            <div className="w-8 h-8 bg-[#091316] flex items-center justify-center rounded-sm group-hover:rotate-6 transition-transform shadow-sm">
              <span className="font-mono text-xs font-black text-[#00D084]">OB</span>
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase font-display text-[#091316]">
              {SITE_CONTENT.brand.name}
            </span>
          </a>
        </div>

        {/* Center Navigation Links (Zone 2) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-bold tracking-tight text-black"
        >
          {SITE_CONTENT.navigation.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-1 hover:opacity-75 transition-opacity after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Zone (Zone 3) */}
        <div className="hidden lg:flex items-center gap-5 shrink-0">
          {/* Social Icons */}
          <div className="flex items-center gap-3 text-black">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="p-1.5 rounded-full hover:bg-black/10 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Community"
              className="p-1.5 rounded-full hover:bg-black/10 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord Chat"
              className="p-1.5 rounded-full hover:bg-black/10 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>

          <div className="h-4 w-[1.5px] bg-black/20" />

          {/* Primary Action Button */}
          <PillButton
            size="sm"
            variant="primary"
            onClick={onOpenConnectModal}
            icon={<ArrowUpRight className="w-4 h-4" />}
          >
            Launch Console
          </PillButton>
        </div>

        {/* Mobile menu toggle button */}
        <div className="flex items-center gap-2 md:hidden">
          <PillButton
            size="sm"
            variant="primary"
            onClick={onOpenConnectModal}
            className="text-xs px-3 py-1.5"
          >
            Console
          </PillButton>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border-2 border-[#091316] rounded-lg bg-[#091316] text-[#00D084] cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-[#091316] bg-[#F4F7F6] px-6 py-6 flex flex-col gap-4 shadow-2xl">
          <nav className="flex flex-col gap-3 font-extrabold text-base uppercase tracking-tight">
            {SITE_CONTENT.navigation.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-black/10 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono">→</span>
              </a>
            ))}
          </nav>
          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-black/40 rounded-full" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-black/40 rounded-full" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
            <PillButton
              size="md"
              variant="mint"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConnectModal();
              }}
            >
              Connect your stack
            </PillButton>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
