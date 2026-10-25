/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PillButton } from './ui/PillButton';
import { scanRepositoryFiles, type DiscoveredService } from '../utils/stackScanner';
import { 
  X, 
  Github, 
  ShieldCheck, 
  Key, 
  Check, 
  ArrowRight, 
  Lock, 
  Copy, 
  CheckCheck,
  Terminal
} from 'lucide-react';

interface InteractiveConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveConnectModal: React.FC<InteractiveConnectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [repoName, setRepoName] = useState('hypergrowth/next-commerce-core');
  const [copied, setCopied] = useState(false);
  const [discoveredServices, setDiscoveredServices] = useState<DiscoveredService[]>([]);

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    const result = scanRepositoryFiles([
      'Dockerfile',
      'docker-compose.yml',
      'infra/aws.tf',
      'prisma/schema.prisma',
      'sentry.config.js'
    ], repoName);
    setDiscoveredServices(result.services);
    setStep(2);
  };

  const handleAuthorize = () => {
    setStep(3);
  };

  const handleCopyWebhook = () => {
    navigator.clipboard?.writeText('https://ingress.opsbeacon.dev/webhook/ro_9f82d1c');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        className="relative w-full max-w-2xl bg-[#F4F7F6] border-4 border-[#091316] rounded-3xl shadow-[12px_12px_0px_#091316] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="bg-[#061114] text-[#00D084] px-6 py-4 flex items-center justify-between border-b-2 border-[#091316]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00D084]" />
            <h3 id="modal-title" className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider">
              OPSBEACON CONNECT // STEP {step} OF 3
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#091316] mb-2 font-display">
                    CONNECT YOUR REPOSITORY
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-700 leading-relaxed">
                    OpsBeacon inspects repository manifest files (Dockerfile, Terraform, Prisma, Sentry) to map dependencies. We never clone or retain source code.
                  </p>
                </div>

                <form onSubmit={handleStartScan} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-black uppercase text-[#091316] mb-1.5">
                      GitHub Repository Identifier
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#091316]">
                        <Github className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={repoName}
                        onChange={(e) => setRepoName(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white border-2 border-[#091316] rounded-full font-mono text-sm font-bold text-[#091316] focus:outline-none focus:ring-2 focus:ring-[#00D084]"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border-2 border-[#091316]/20 bg-white/70 text-xs font-bold text-[#091316] space-y-1">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
                      <span>Zero Write Permissions Requested</span>
                    </div>
                    <p className="text-neutral-600 font-normal">
                      Only public or authorized scoped metadata is parsed. No access to private proprietary algorithms or database passwords.
                    </p>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <PillButton
                      type="submit"
                      variant="mint"
                      size="md"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Scan & Discover Stack
                    </PillButton>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#091316] mb-1 font-display">
                    {discoveredServices.length} SERVICES DISCOVERED
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-700">
                    Review and confirm read-only telemetry permissions for each identified infrastructure signal.
                  </p>
                </div>

                <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                  {discoveredServices.map((service) => (
                    <div
                      key={service.id}
                      className="p-3 bg-white border-2 border-[#091316] rounded-xl flex items-center justify-between shadow-2xs"
                    >
                      <div>
                        <div className="font-extrabold text-sm text-[#091316]">{service.name}</div>
                        <div className="text-[11px] font-mono text-neutral-600">
                          Detected in: {service.configFile}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-black bg-[#00D084] text-[#091316] px-2.5 py-1 rounded-full uppercase">
                        READ-ONLY
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-mono font-bold text-[#091316] underline cursor-pointer"
                  >
                    ← Back
                  </button>
                  <PillButton
                    variant="mint"
                    size="md"
                    onClick={handleAuthorize}
                    icon={<Lock className="w-4 h-4" />}
                  >
                    Authorize Read-Only Signals
                  </PillButton>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 text-center"
              >
                <div className="w-16 h-16 bg-[#00D084] text-[#061114] rounded-full flex items-center justify-center mx-auto shadow-lg border-2 border-[#091316]">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div>
                  <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#091316] mb-2 font-display">
                    STACK CONNECTED SUCCESSFULLY
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-700 max-w-md mx-auto">
                    OpsBeacon is now listening for deployment events and metrics. Actions like rollback or restart require explicit human approval.
                  </p>
                </div>

                <div className="bg-[#061114] text-white p-4 rounded-2xl text-left border-2 border-[#091316] space-y-2">
                  <span className="text-[10px] font-mono uppercase text-[#00D084] font-bold">
                    WEBHOOK INGRESS ENDPOINT:
                  </span>
                  <div className="flex items-center justify-between gap-2 bg-neutral-900 px-3 py-2 rounded-xl text-xs font-mono">
                    <span className="truncate text-neutral-300">
                      https://ingress.opsbeacon.dev/webhook/ro_9f82d1c
                    </span>
                    <button
                      onClick={handleCopyWebhook}
                      className="p-1 rounded hover:bg-neutral-800 text-[#00D084] cursor-pointer shrink-0"
                      aria-label="Copy webhook URL"
                    >
                      {copied ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <PillButton
                    variant="mint"
                    size="lg"
                    onClick={handleReset}
                    className="w-full justify-center"
                  >
                    Open Live Control Room
                  </PillButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveConnectModal;
