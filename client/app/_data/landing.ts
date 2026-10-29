/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  iconName: string;
  description: string;
  detectedFile: string;
  defaultPermissions: string;
}

export interface HowItWorksStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
}

export interface SecurityPillar {
  title: string;
  description: string;
  details: string;
}

export interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

export const SITE_CONTENT = {
  brand: {
    name: "OPSBEACON",
    tagline: "Unified Deployment & Monitoring Platform for Full-Stack Developers",
    statusBadge: "SYSTEM CONTROL ROOM // V2.4",
  },

  navigation: [
    { label: "Platform", href: "#platform" },
    { label: "Integrations", href: "#integrations" },
    { label: "Architecture", href: "#architecture" },
    { label: "Security", href: "#security" },
    { label: "Docs", href: "#docs" },
  ] as NavLink[],

  hero: {
    
    headline: "EVERY SERVICE CONNECTED. EVERY INCIDENT UNDERSTOOD.",
    subtext: "Discover your tech stack, connect the tools you choose, and bring infrastructure signals together to understand incidents with evidence-backed insights.",
    primaryCta: "Connect your stack",
    secondaryCta: "Explore platform →",
    statPills: [
      { label: "Default Access", value: "100% Read-Only" },
      { label: "Mean Time to Root Cause", value: "< 2 Minutes" },
      { label: "Human Verification", value: "Always Required" },
    ],
  },

  integrations: {
    header: "YOUR STACK STAYS YOURS.",
    subtext: "Connect GitHub to discover technologies and configuration-defined services in your repository. Review and authorize each integration before connecting it.",
    items: [
      {
        id: "github",
        name: "GitHub",
        category: "Source & VCS",
        iconName: "Github",
        description: "Scans repository metadata and workflow triggers without cloning code.",
        detectedFile: ".github/workflows/deploy.yml",
        defaultPermissions: "Read-only webhooks & commit SHAs",
      },
      {
        id: "aws",
        name: "AWS",
        category: "Cloud Compute",
        iconName: "Cloud",
        description: "Reads CloudWatch alarms, ECS task metrics, and CloudFront distributions.",
        detectedFile: "infra/terraform/aws_ecs.tf",
        defaultPermissions: "CloudWatch:GetMetricData (Read-Only)",
      },
      {
        id: "docker",
        name: "Docker",
        category: "Container Runtime",
        iconName: "Box",
        description: "Inspects container memory limits, health check signals, and restart cascades.",
        detectedFile: "Dockerfile & docker-compose.yml",
        defaultPermissions: "Local socket inspection (Read-Only)",
      },
      {
        id: "postgresql",
        name: "PostgreSQL",
        category: "Relational DB",
        iconName: "Database",
        description: "Monitors connection pool saturation, deadlocks, and slow query budgets (>200ms).",
        detectedFile: "prisma/schema.prisma",
        defaultPermissions: "pg_stat_statements (Read-Only)",
      },
      {
        id: "mongodb",
        name: "MongoDB",
        category: "Document Store",
        iconName: "Server",
        description: "Tracks replica set primary elections, query collscans, and wire latency.",
        detectedFile: "mongoose.connect() / Atlas URI",
        defaultPermissions: "Atlas Monitoring API Token",
      },
      {
        id: "sentry",
        name: "Sentry",
        category: "Exception Tracking",
        iconName: "AlertTriangle",
        description: "Correlates stack trace spikes directly with deployment git tags.",
        detectedFile: "sentry.client.config.ts",
        defaultPermissions: "Organization Read API Key",
      },
      {
        id: "datadog",
        name: "Datadog",
        category: "APM & Telemetry",
        iconName: "Activity",
        description: "Pulls trace waterfall summaries and service map latency distributions.",
        detectedFile: "datadog-agent.yaml",
        defaultPermissions: "Metrics Query Token",
      },
    ] as IntegrationItem[],
  },

  dashboardShowcase: {
    header: "YOUR ENTIRE STACK. ONE CLEAR PICTURE.",
    subtext: "Live correlation engine tying together code commits, container health, database locking, and cloud egress in real time.",
    liveMetrics: [
      { label: "API LATENCY (P99)", value: "42ms", change: "-12ms vs avg", state: "healthy" },
      { label: "ERROR RATE", value: "0.04%", change: "Within SLA", state: "healthy" },
      { label: "CONNECTED SERVICES", value: "7 / 7", change: "100% Authorized", state: "healthy" },
      { label: "ESTIMATED RUN-RATE", value: "$412 / mo", change: "-8% cloud egress", state: "neutral" },
    ],
    incidentDemo: {
      title: "INCIDENT #894: ELEVATED P99 LATENCY DETECTED",
      impact: "Checkout API latency spiked from 38ms to 1,240ms after commit #7b4f9e",
      correlationEvidence: [
        "Commit #7b4f9e 'Optimize query indexing' deployed 4 minutes ago via GitHub Actions",
        "PostgreSQL connection pool exhausted: 98/100 connections holding idle in transaction",
        "Sentry: 14 instances of QueryTimeoutException in checkout_controller.ts:89",
      ],
      aiCopilotRecommendation: "AI Copilot identified missing index lock migration. Recommended action: Roll back to release v2.14.0 and kill blocked postgres PID 4921.",
      humanInTheLoopRequirement: "CRITICAL: Rollback & process termination requires explicit human cryptographic authorization.",
    },
  },

  howItWorks: {
    header: "FROM CONNECTED TOOLS TO ACTIONABLE INSIGHTS.",
    subtext: "Three disciplined steps that turn noisy fragmented telemetry into verifiable root-cause clarity.",
    steps: [
      {
        number: "01",
        title: "DISCOVER & CONNECT",
        tagline: "Read-only by default. Zero code cloning.",
        description: "Point OpsBeacon at your Git repository. Our engine scans config manifests (Dockerfile, Terraform, Prisma, Sentry) and maps your architecture into a verified DAG.",
        bullets: [
          "Zero source code stored on our infrastructure",
          "Explicit opt-in prompt for every individual service",
          "Automated detection of environment boundaries (Staging vs Prod)",
        ],
      },
      {
        number: "02",
        title: "CORRELATE SIGNALS",
        tagline: "Continuous context across deployments, logs & metrics.",
        description: "Stop jumping between 6 browser tabs. When an outage occurs, OpsBeacon overlays deployment timestamps directly on error spikes and query saturation graphs.",
        bullets: [
          "Temporal alignment of git SHAs with APM anomalies",
          "Automatic trace linking between DB deadlocks and endpoints",
          "Cloud cost drift alert correlated with container restarts",
        ],
      },
      {
        number: "03",
        title: "UNDERSTAND & ACT",
        tagline: "AI cited evidence. Human approval strictly required.",
        description: "Our AI Copilot analyzes the unified telemetry timeline, cites exact lines in commits and query plans, and drafts surgical remediations.",
        bullets: [
          "Cites verified evidence, not hallucinations",
          "One-click rollback or container restart proposal",
          "Strict Human-in-the-Loop approval gate before execution",
        ],
      },
    ] as HowItWorksStep[],
  },

  security: {
    header: "YOUR INFRASTRUCTURE. YOUR PERMISSION. YOUR CONTROL.",
    subtext: "We believe dev tools should have the least possible power over your production environment. OpsBeacon operates under cryptographic zero-trust principles.",
    cta: "Explore security whitepaper",
    pillars: [
      {
        title: "LEAST-PRIVILEGE ACCESS BY DEFAULT",
        description: "Read-only credentials for all telemetry, logs, and metrics. Write tokens are never requested during initial setup.",
        details: "Scoped AWS IAM roles with explicit Deny on resource deletion. Ephemeral GitHub App tokens with 15-minute rotation windows.",
      },
      {
        title: "MANDATORY HUMAN APPROVAL GATES",
        description: "No autonomous AI agent will ever restart, rollback, or alter your production cluster without explicit human sign-off.",
        details: "Cryptographically signed confirmation requests sent via WebAuthn, Slack interactive prompt, or console verification.",
      },
      {
        title: "ZERO RAW SOURCE CODE OR LOG RETENTION",
        description: "Telemetry is queried on-demand and analyzed in volatile memory. Your code never rests on OpsBeacon disks.",
        details: "End-to-end TLS 1.3 tunnels with customer-isolated data planes. Strict adherence to SOC 2 Type II and GDPR protocols.",
      },
      {
        title: "CONTINUOUS COMPLIANCE AUDIT TRAIL",
        description: "Every query executed, evidence cited, and action approved is logged to an immutable hash chain.",
        details: "Exportable audit logs for security teams with exact operator identity, timestamp, and signed authorization payload.",
      },
    ] as SecurityPillar[],
  },

  finalCta: {
    header: "BRING YOUR ENTIRE STACK INTO FOCUS.",
    subtext: "Connect your repository in 90 seconds. No agents to install, no infra to migrate, 100% read-only verification.",
    buttonText: "Connect your stack →",
  },

  footer: {
    upcomingNotice: "UPCOMING: CLI access and Slack/Telegram notifications",
    copyright: "© 2026 OpsBeacon Inc. All rights reserved.",
    sections: [
      {
        title: "PLATFORM",
        links: [
          { label: "Architecture", href: "#architecture" },
          { label: "Integrations", href: "#integrations" },
          { label: "AI Copilot", href: "#platform" },
          { label: "Changelog", href: "#" },
        ],
      },
      {
        title: "SECURITY",
        links: [
          { label: "Trust Center", href: "#security" },
          { label: "SOC 2 Type II", href: "#security" },
          { label: "Read-Only Spec", href: "#security" },
          { label: "Audit Logs", href: "#security" },
        ],
      },
      {
        title: "RESOURCES",
        links: [
          { label: "Documentation", href: "#docs" },
          { label: "GitHub Quickstart", href: "https://github.com" },
          { label: "Status Page", href: "#" },
          { label: "Security Whitepaper", href: "#security" },
        ],
      },
    ] as FooterSection[],
  },
};
