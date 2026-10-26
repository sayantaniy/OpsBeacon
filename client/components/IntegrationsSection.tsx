/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PillButton } from './ui/PillButton';
import { SITE_CONTENT } from '../app/_data/landing';
import { scanRepositoryFiles, type DiscoveredService } from '../lib/stackScanner';
import { 
  CodeXml, 
  Cloud, 
  Box, 
  Database, 
  Server, 
  AlertTriangle, 
  Activity, 
  Lock, 
  RefreshCw,
  Search,
  KeyRound,
} from 'lucide-react';

const ICONS: Record<string, React.ReactNode> = {
  Github: <CodeXml className="w-5 h-5" />,
  Cloud: <Cloud className="w-5 h-5" />,
  Box: <Box className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  AlertTriangle: <AlertTriangle className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
};

export const IntegrationsSection: React.FC = () => {
  const [repoInput, setRepoInput] = useState<string>('organization/production-api');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scannedServices, setScannedServices] = useState<DiscoveredService[]>(() => {
    const initial = scanRepositoryFiles(['Dockerfile', 'aws.tf', 'prisma/schema.prisma', 'sentry.config.js', 'datadog.yaml', 'docker-compose.yml']);
    return initial.services;
  });
  const [authorizedMap, setAuthorizedMap] = useState<Record<string, boolean>>({
    github: true,
    aws: true,
    docker: true,
    postgres: true,
    sentry: true,
    datadog: false,
    mongodb: false,
  });

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const files = [
        'Dockerfile',
        '.github/workflows/deploy.yml',
        'infra/terraform/aws_ecs.tf',
        'prisma/schema.prisma',
        'sentry.client.config.ts',
        'datadog-agent.yaml',
      ];
      const result = scanRepositoryFiles(files, repoInput);
      setScannedServices(result.services);
      setIsScanning(false);
    }, 700);
  };

  const toggleAuth = (id: string) => {
    setAuthorizedMap(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="integrations" className="relative w-full py-20 md:py-28 bg-[#F4F7F6] border-b-2 border-[#091316]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono font-black uppercase tracking-widest text-[#0D9488]">
            <span>ZERO-MIGRATION ARCHITECTURE</span>
            <span aria-hidden="true">/</span>
            <span>READ-ONLY DISCOVERY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-[#091316] leading-none mb-6 font-display">
            {SITE_CONTENT.integrations.header}
          </h2>
          <p className="text-base sm:text-lg text-neutral-700 font-semibold leading-relaxed">
            {SITE_CONTENT.integrations.subtext}
          </p>
        </div>

        {/* Tech Logos Pill Marquee & Badges */}
        <div className="mb-14">
          <div className="flex flex-wrap items-center gap-3">
            {SITE_CONTENT.integrations.items.map((item) => (
              <div
                key={item.id}
                className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md border border-[#091316]/25 rounded-full px-6 py-2.5 text-sm font-black uppercase text-[#091316] hover:bg-[#091316] hover:text-[#00D084] transition-all cursor-default select-none shadow-[2px_2px_0px_#091316]"
              >
                <span className="shrink-0 text-[#0D9488]">{ICONS[item.iconName]}</span>
                <span>{item.name}</span>
                <span className="text-[10px] font-mono opacity-60">READ-ONLY</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Stack Scanner & Authorization Terminal */}
        <div className="border-2 border-[#091316] rounded-3xl bg-white/80 backdrop-blur-2xl shadow-[8px_8px_0px_#091316] overflow-hidden">
          {/* Terminal Title Bar */}
          <div className="border-b-2 border-[#091316] bg-[#061114] text-[#00D084] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#00D084]" />
              <span className="font-mono text-xs sm:text-sm font-black tracking-wider uppercase">
                OPSBEACON DISCOVERY AGENT // METADATA PERMISSION VERIFIER
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-white/80">
              <Lock className="w-3.5 h-3.5 text-[#2DD4BF]" />
              <span>CRYPTOGRAPHIC LEAST-PRIVILEGE</span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Repo input bar */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-8">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#091316]">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={repoInput}
                  onChange={(e) => setRepoInput(e.target.value)}
                  placeholder="github-org/your-repo"
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-[#091316] rounded-full font-mono text-sm font-bold text-[#091316] focus:outline-none focus:ring-2 focus:ring-[#00D084] transition-colors"
                />
              </div>

              <PillButton
                variant="mint"
                size="md"
                onClick={handleSimulateScan}
                disabled={isScanning}
                icon={<RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />}
              >
                {isScanning ? 'Scanning Manifests...' : 'Scan Repository'}
              </PillButton>
            </div>

            {/* Scan Status Banner */}
            <div className="mb-6 p-4 border border-[#00D084]/50 rounded-2xl bg-[#00D084]/10 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-[#091316] font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00D084] inline-block" />
                <span>REPOSITORY SCANNED: {repoInput}</span>
                <span aria-hidden="true">·</span>
                <span>0 RAW SOURCE CODE STORED</span>
              </div>
              <div className="flex items-center gap-2 text-[#0D9488]">
                <KeyRound className="w-3.5 h-3.5" />
                <span>DEFAULT SCOPE: 100% READ-ONLY TOKENS</span>
              </div>
            </div>

            {/* Discovered Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scannedServices.map((service) => {
                const isAuthorized = authorizedMap[service.id] ?? false;
                return (
                  <div
                    key={service.id}
                    className={`p-5 rounded-2xl border-2 transition-all ${
                      isAuthorized 
                        ? 'border-[#091316] bg-white shadow-sm' 
                        : 'border-[#091316]/30 bg-white/40 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#061114] text-[#00D084] flex items-center justify-center font-bold text-xs">
                          {service.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-[#091316] tracking-tight leading-tight">
                            {service.name}
                          </h4>
                          <span className="text-[10px] font-mono text-neutral-600 uppercase">
                            {service.category}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleAuth(service.id)}
                        className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-full border-2 transition-all cursor-pointer ${
                          isAuthorized
                            ? 'bg-[#00D084] text-[#091316] border-[#091316] shadow-sm'
                            : 'bg-white text-[#091316] border-[#091316]/60 hover:bg-[#091316] hover:text-[#00D084]'
                        }`}
                        aria-label={`Toggle authorization for ${service.name}`}
                      >
                        {isAuthorized ? 'AUTHORIZED' : 'AUTHORIZE'}
                      </button>
                    </div>

                    <div className="text-xs space-y-1.5 text-neutral-700 font-medium pt-2 border-t border-[#091316]/10">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-neutral-500">MANIFEST:</span>
                        <span className="font-bold text-[#091316]">{service.configFile}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-neutral-500">PERMISSION:</span>
                        <span className="font-bold text-[#0D9488]">READ-ONLY</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-[#091316]/15 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-[#091316]">
              <span className="text-neutral-700">
                Authorized {Object.values(authorizedMap).filter(Boolean).length} of {scannedServices.length} infrastructure signals.
              </span>
              <span className="font-mono text-[#0D9488]">
                No write tokens requested. Production security intact.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
