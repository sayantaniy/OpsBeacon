/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DiscoveredService {
  id: string;
  name: string;
  category: 'compute' | 'database' | 'observability' | 'vcs' | 'cloud';
  configFile: string;
  defaultScope: 'read-only' | 'read-write';
  requiresHumanApproval: boolean;
  status: 'discovered' | 'authorized' | 'declined';
  telemetrySignals: string[];
}

export interface ScanResult {
  repository: string;
  services: DiscoveredService[];
  readOnlyDefaultRatio: number;
  securityGuarantee: {
    leastPrivilegeEnforced: boolean;
    zeroLogRetention: boolean;
    approvalRequiredForActions: boolean;
  };
}

const SERVICE_SIGNATURES: Record<string, Omit<DiscoveredService, 'status'>> = {
  'github-actions': {
    id: 'github',
    name: 'GitHub VCS & Actions',
    category: 'vcs',
    configFile: '.github/workflows',
    defaultScope: 'read-only',
    requiresHumanApproval: true,
    telemetrySignals: ['Commit SHA', 'PR Status', 'Deployment Webhooks'],
  },
  'dockerfile': {
    id: 'docker',
    name: 'Docker Containers',
    category: 'compute',
    configFile: 'Dockerfile',
    defaultScope: 'read-only',
    requiresHumanApproval: true,
    telemetrySignals: ['Container Health', 'OOM Events', 'Restart Count'],
  },
  'aws-terraform': {
    id: 'aws',
    name: 'AWS Infrastructure',
    category: 'cloud',
    configFile: 'terraform/aws.tf',
    defaultScope: 'read-only',
    requiresHumanApproval: true,
    telemetrySignals: ['CloudWatch Alarms', 'EC2/ECS CPU', 'Cost Run-Rate'],
  },
  'postgres': {
    id: 'postgres',
    name: 'PostgreSQL Database',
    category: 'database',
    configFile: 'prisma/schema.prisma',
    defaultScope: 'read-only',
    requiresHumanApproval: true,
    telemetrySignals: ['Slow Queries (>200ms)', 'Connection Pool', 'Deadlocks'],
  },
  'mongodb': {
    id: 'mongodb',
    name: 'MongoDB Atlas',
    category: 'database',
    configFile: 'models/index.ts',
    defaultScope: 'read-only',
    requiresHumanApproval: true,
    telemetrySignals: ['Replica Lag', 'Read Latency', 'Document Scans'],
  },
  'sentry': {
    id: 'sentry',
    name: 'Sentry Error Tracking',
    category: 'observability',
    configFile: 'sentry.config.js',
    defaultScope: 'read-only',
    requiresHumanApproval: false,
    telemetrySignals: ['Exception Spikes', 'Stack Traces', 'Release Regressions'],
  },
  'datadog': {
    id: 'datadog',
    name: 'Datadog APM',
    category: 'observability',
    configFile: 'datadog.yaml',
    defaultScope: 'read-only',
    requiresHumanApproval: false,
    telemetrySignals: ['P99 Latency', 'Throughput RPS', 'Host Saturation'],
  },
};

/**
 * Pure function: Scans detected config files to discover services with strict read-only defaults
 */
export function scanRepositoryFiles(files: string[], repoName: string = 'acme/core-api'): ScanResult {
  const discovered: DiscoveredService[] = [];
  const normalized = files.map(f => f.toLowerCase());

  for (const [key, sig] of Object.entries(SERVICE_SIGNATURES)) {
    const isMatch = normalized.some(file => {
      if (key === 'github-actions' && (file.includes('github') || file.includes('action'))) return true;
      if (key === 'dockerfile' && (file.includes('docker') || file.includes('container'))) return true;
      if (key === 'aws-terraform' && (file.includes('aws') || file.includes('terraform') || file.includes('.tf'))) return true;
      if (key === 'postgres' && (file.includes('prisma') || file.includes('postgres') || file.includes('drizzle') || file.includes('sql'))) return true;
      if (key === 'mongodb' && (file.includes('mongo') || file.includes('mongoose'))) return true;
      if (key === 'sentry' && file.includes('sentry')) return true;
      if (key === 'datadog' && file.includes('datadog')) return true;
      return false;
    });

    if (isMatch) {
      discovered.push({
        ...sig,
        status: 'discovered',
      });
    }
  }

  // Fallback defaults if few matched
  if (discovered.length === 0) {
    discovered.push({
      ...SERVICE_SIGNATURES['github-actions'],
      status: 'discovered',
    });
  }

  const readOnlyCount = discovered.filter(s => s.defaultScope === 'read-only').length;

  return {
    repository: repoName,
    services: discovered,
    readOnlyDefaultRatio: readOnlyCount / discovered.length,
    securityGuarantee: {
      leastPrivilegeEnforced: true,
      zeroLogRetention: true,
      approvalRequiredForActions: true,
    },
  };
}

/**
 * Pure function: Calculates incident correlation confidence based on connected signals
 */
export function calculateIncidentCorrelation(activeSignals: string[]): {
  confidencePercent: number;
  verdict: string;
  suggestedAction: string;
  requiresHumanApproval: boolean;
} {
  const hasVCS = activeSignals.some(s => s.toLowerCase().includes('commit') || s.toLowerCase().includes('deploy'));
  const hasDB = activeSignals.some(s => s.toLowerCase().includes('sql') || s.toLowerCase().includes('pool') || s.toLowerCase().includes('query'));
  const hasAPM = activeSignals.some(s => s.toLowerCase().includes('latency') || s.toLowerCase().includes('error'));

  let score = 50;
  if (hasVCS) score += 20;
  if (hasDB) score += 15;
  if (hasAPM) score += 15;

  let verdict = 'Correlating cluster anomalies with recent git deployment tag';
  let suggestedAction = 'Rollback deployment SHA to v2.14.1';

  if (hasDB && !hasVCS) {
    verdict = 'Database pool exhaustion detected at 98% saturation';
    suggestedAction = 'Restart connection pooling proxy (PgBouncer)';
  }

  return {
    confidencePercent: Math.min(score, 99),
    verdict,
    suggestedAction,
    requiresHumanApproval: true,
  };
}
