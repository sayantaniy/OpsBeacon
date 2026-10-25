/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PillButton } from './ui/PillButton';
import { SITE_CONTENT } from '../data/content';
import { 
  AlertCircle, 
  CheckCircle, 
  GitCommit, 
  Database, 
  Activity, 
  RotateCcw, 
  ShieldAlert, 
  Terminal, 
  UserCheck, 
  XCircle,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const UnifiedDashboardShowcase: React.FC = () => {
  const [incidentStatus, setIncidentStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'topology' | 'evidence'>('timeline');

  const handleApprove = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIncidentStatus('approved');
      setIsProcessing(false);
    }, 600);
  };

  const handleReject = () => {
    setIncidentStatus('rejected');
  };

  const handleResetDemo = () => {
    setIncidentStatus('pending');
  };

  return (
    <section id="platform" className="relative w-full py-20 md:py-28 bg-[#F4F7F6] border-b-2 border-[#091316]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono font-black uppercase tracking-widest text-[#0D9488]">
            <span>UNIFIED CONTROL ROOM</span>
            <span aria-hidden="true">/</span>
            <span>HUMAN-IN-THE-LOOP COPILOT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-[#091316] leading-none mb-6 font-display">
            {SITE_CONTENT.dashboardShowcase.header}
          </h2>
          <p className="text-base sm:text-lg text-neutral-700 font-semibold leading-relaxed">
            {SITE_CONTENT.dashboardShowcase.subtext}
          </p>
        </div>

        {/* Master Frosted Glass Dashboard Card */}
        <div className="bg-white/80 backdrop-blur-2xl border-2 border-[#091316] shadow-[10px_10px_0px_#091316] rounded-3xl overflow-hidden">
          {/* Dashboard Top Header Bar */}
          <div className="border-b-2 border-[#091316] bg-[#061114] text-[#00D084] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500 border border-black/40" />
                <span className="w-3 h-3 rounded-full bg-[#00D084] border border-black/40" />
                <span className="w-3 h-3 rounded-full bg-[#2DD4BF] border border-black/40" />
              </div>
              <span className="font-mono text-xs sm:text-sm font-black tracking-wider uppercase ml-2">
                OPSBEACON // LIVE TOPOLOGY CORRELATION VIEW
              </span>
            </div>

            {/* View Selector Tabs */}
            <div className="flex items-center gap-1 bg-black/60 p-1 rounded-full border border-neutral-700 text-xs font-mono">
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-3.5 py-1 rounded-full font-bold transition-colors cursor-pointer ${
                  activeTab === 'timeline' ? 'bg-[#00D084] text-[#091316]' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Incident Timeline
              </button>
              <button
                onClick={() => setActiveTab('evidence')}
                className={`px-3.5 py-1 rounded-full font-bold transition-colors cursor-pointer ${
                  activeTab === 'evidence' ? 'bg-[#00D084] text-[#091316]' : 'text-neutral-400 hover:text-white'
                }`}
              >
                AI Evidence Map
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Live Metrics Row (Deep Black Brutalist Figures) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {SITE_CONTENT.dashboardShowcase.liveMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-[#091316] rounded-2xl p-5 shadow-sm"
                >
                  <p className="font-mono text-[11px] font-black uppercase tracking-wider text-neutral-600 mb-1">
                    {metric.label}
                  </p>
                  <p className="text-3xl sm:text-4xl font-black text-[#091316] font-display tracking-tight tabular-nums mb-1">
                    {metric.value}
                  </p>
                  <p className="text-xs font-bold text-[#0D9488]">
                    {metric.change}
                  </p>
                </div>
              ))}
            </div>

            {/* Main Interactive Incident & AI Copilot Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Incident Timeline & Evidence Correlation */}
              <div className="lg:col-span-7 space-y-4">
                {/* Active Incident Alert Header */}
                <div className="border-2 border-[#091316] rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#061114] text-[#00D084] rounded-lg mt-0.5">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-black text-red-600 uppercase">
                          CRITICAL ANOMALY
                        </span>
                        <span className="text-xs text-neutral-500">· 4 minutes ago</span>
                      </div>
                      <h4 className="text-lg font-black text-[#091316] uppercase tracking-tight">
                        {SITE_CONTENT.dashboardShowcase.incidentDemo.title}
                      </h4>
                      <p className="text-xs sm:text-sm font-semibold text-neutral-700 mt-1">
                        {SITE_CONTENT.dashboardShowcase.incidentDemo.impact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Evidence Stream */}
                <div className="border-2 border-[#091316] rounded-2xl bg-white/90 p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#091316]/10 pb-2">
                    <span className="font-mono text-xs font-black uppercase text-[#091316]">
                      MULTI-SERVICE CORRELATED SIGNALS
                    </span>
                    <span className="text-[11px] font-mono text-[#0D9488] font-bold">3 SIGNALS TIED</span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2.5 text-xs text-[#091316] font-semibold bg-white p-3 rounded-xl border border-[#091316]/15 shadow-2xs">
                      <GitCommit className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">GitHub Actions:</span> Commit{' '}
                        <code className="bg-[#091316]/10 px-1 py-0.5 rounded font-mono text-[11px]">#7b4f9e</code>{' '}
                        "Optimize query indexing" deployed to production 4m ago.
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-xs text-[#091316] font-semibold bg-white p-3 rounded-xl border border-[#091316]/15 shadow-2xs">
                      <Database className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">PostgreSQL Engine:</span> Connection pool saturated at 98%. Lock contention on table <code className="bg-[#091316]/10 px-1 py-0.5 rounded font-mono text-[11px]">orders_v2</code>.
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-xs text-[#091316] font-semibold bg-white p-3 rounded-xl border border-[#091316]/15 shadow-2xs">
                      <Activity className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Sentry Telemetry:</span> 14 occurrences of <code className="bg-[#091316]/10 px-1 py-0.5 rounded font-mono text-[11px]">QueryTimeoutException</code> in checkout_controller.ts.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Copilot Modal with Mandatory Human Approval */}
              <div className="lg:col-span-5">
                <div className="border-2 border-[#091316] rounded-2xl bg-[#061114] text-white p-6 shadow-xl relative">
                  {/* AI Copilot Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#00D084]" />
                      <span className="font-mono text-xs font-black uppercase text-[#00D084] tracking-wider">
                        AI ROOT-CAUSE COPILOT
                      </span>
                    </div>
                    <span className="text-[10px] font-mono bg-neutral-800 text-[#2DD4BF] px-2.5 py-0.5 rounded-full border border-neutral-700">
                      CONFIDENCE: 98.4%
                    </span>
                  </div>

                  {/* Recommendation Text */}
                  <div className="mb-5 space-y-3">
                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                      Missing index creation concurrently locked the primary table. Rollback to stable release <span className="text-[#00D084] font-mono font-bold">v2.14.0</span> will immediately release table locks without data loss.
                    </p>

                    <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-mono space-y-1">
                      <div className="text-neutral-400">PROPOSED ACTION:</div>
                      <div className="text-[#00D084] font-bold">
                        $ opsbeacon rollback --target v2.14.0 --release-locks
                      </div>
                    </div>
                  </div>

                  {/* HUMAN-IN-THE-LOOP APPROVAL SECTION */}
                  <div className="p-4 rounded-xl border-2 border-[#00D084]/60 bg-[#00D084]/10 mb-5">
                    <div className="flex items-center gap-2 text-xs font-black uppercase text-[#00D084] mb-2 font-mono">
                      <UserCheck className="w-4 h-4" />
                      <span>HUMAN APPROVAL REQUIRED</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-normal">
                      Security policy prohibits autonomous production writes. An authorized engineer must sign off to execute this rollback.
                    </p>
                  </div>

                  {/* Interactive Status & Action Buttons */}
                  <AnimatePresence mode="wait">
                    {incidentStatus === 'pending' && (
                      <motion.div
                        key="pending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        <PillButton
                          variant="mint"
                          size="md"
                          onClick={handleApprove}
                          disabled={isProcessing}
                          className="w-full justify-center"
                          icon={<RotateCcw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />}
                        >
                          {isProcessing ? 'Signing Authorization...' : 'Approve Rollback & Restart'}
                        </PillButton>

                        <button
                          onClick={handleReject}
                          className="w-full py-2.5 text-xs font-bold text-neutral-400 hover:text-white transition-colors uppercase font-mono cursor-pointer text-center"
                        >
                          Dismiss / Take Manual Control
                        </button>
                      </motion.div>
                    )}

                    {incidentStatus === 'approved' && (
                      <motion.div
                        key="approved"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-4 bg-emerald-950/80 border border-emerald-500/60 rounded-xl text-center space-y-2"
                      >
                        <div className="flex items-center justify-center gap-2 text-[#00D084] font-bold text-sm">
                          <CheckCircle className="w-5 h-5" />
                          <span>ROLLBACK EXECUTED BY OPERATOR</span>
                        </div>
                        <p className="text-xs text-neutral-300 font-mono">
                          Cluster returned to v2.14.0. Latency normalized to 42ms.
                        </p>
                        <button
                          onClick={handleResetDemo}
                          className="text-[11px] font-mono text-[#00D084] underline mt-2 block mx-auto cursor-pointer"
                        >
                          Reset Interactive Simulation
                        </button>
                      </motion.div>
                    )}

                    {incidentStatus === 'rejected' && (
                      <motion.div
                        key="rejected"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-4 bg-neutral-900 border border-neutral-700 rounded-xl text-center space-y-2"
                      >
                        <div className="flex items-center justify-center gap-2 text-neutral-300 font-bold text-sm">
                          <XCircle className="w-5 h-5 text-neutral-500" />
                          <span>AUTOMATED ACTION REJECTED</span>
                        </div>
                        <p className="text-xs text-neutral-400 font-mono">
                          Zero changes made to cluster. Manual SSH mode active.
                        </p>
                        <button
                          onClick={handleResetDemo}
                          className="text-[11px] font-mono text-[#00D084] underline mt-2 block mx-auto cursor-pointer"
                        >
                          Reset Interactive Simulation
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnifiedDashboardShowcase;
