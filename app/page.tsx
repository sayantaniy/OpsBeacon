"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import IntegrationsSection from '../components/IntegrationsSection';
import UnifiedDashboardShowcase from '../components/UnifiedDashboardShowcase';
import HowItWorksSection from '../components/HowItWorksSection';
import SecuritySection from '../components/SecuritySection';
import FinalCtaSection from '../components/FinalCtaSection';
import Footer from '../components/Footer';
import InteractiveConnectModal from '../components/InteractiveConnectModal';

export default function LandingPage() {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7F6] text-[#091316]">
      {/* Navigation */}
      <Navbar onOpenConnectModal={() => setIsConnectModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Section 1: Hero (Yellow Brutalism & Liquid Glass) */}
        <HeroSection onOpenConnectModal={() => setIsConnectModalOpen(true)} />

        {/* Section 2: Integrations (Yellow Canvas) */}
        <IntegrationsSection />

        {/* Section 3: Unified Dashboard Showcase (Frosted Glass on Yellow) */}
        <UnifiedDashboardShowcase />

        {/* Section 4: How It Works Grid (Black Borders on Yellow) */}
        <HowItWorksSection />

        {/* Section 5: Security Guarantees (Inverted Mode - Pitch Black Canvas) */}
        <SecuritySection onOpenConnectModal={() => setIsConnectModalOpen(true)} />

        {/* Section 6: Final CTA (Yellow Canvas) */}
        <FinalCtaSection onOpenConnectModal={() => setIsConnectModalOpen(true)} />
      </main>

      {/* Section 7: Footer (Minimal Black) */}
      <Footer />

      {/* Interactive Modal */}
      <InteractiveConnectModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />
    </div>
  );
}
