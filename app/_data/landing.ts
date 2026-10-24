import { LayoutDashboard, Sparkles, ShieldCheck, type LucideIcon } from "lucide-react";

// Placeholder product name. Change it here and in the CLI snippet in page.tsx.
export const BRAND = "Helm";

export const INTEGRATIONS = [
  "GitHub",
  "AWS",
  "Docker",
  "PostgreSQL",
  "MongoDB",
  "Slack",
  "Telegram",
];

export const SURFACES: {
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  alt: string;
}[] = [
  {
    icon: LayoutDashboard,
    title: "See every deploy next to its fallout",
    description:
      "Deployments, logs, database performance, errors and cloud costs share one timeline, so a slow query and the release that caused it sit side by side.",
    bullets: [
      "Deploys from GitHub, containers from Docker, infrastructure from AWS",
      "PostgreSQL and MongoDB performance in the same view",
      "Cloud costs tied to the service that spent them",
    ],
    image: "/images/dashboard.png",
    alt: "Dashboard showing a deployment, error spike and database latency on one timeline",
  },
  {
    icon: Sparkles,
    title: "Ask what broke. Get the likely cause.",
    description:
      "The copilot reads the correlated timeline, points to a root cause, and proposes a fix for you to review before anything changes.",
    bullets: [
      "Cites the deploy, log line or query behind every answer",
      "Suggests fixes as diffs and commands. It never runs them.",
      "Works only from the access you granted",
    ],
    image: "/images/copilot.png",
    alt: "AI copilot explaining a latency incident with linked evidence",
  },
  {
    icon: ShieldCheck,
    title: "Nothing runs without your yes",
    description:
      "Rollbacks and restarts are requests, not automations. A person reviews each one and approves it from wherever they are.",
    bullets: [
      "Approve from the dashboard, the CLI, Slack or Telegram",
      "Every action is logged with who approved it and when",
      "Read-only access until you decide otherwise",
    ],
    image: "/images/approval.png",
    alt: "Approval request for a rollback with Approve and Dismiss buttons",
  },
];

export const STEPS = [
  {
    title: "Connect your repository",
    body: "We read repository metadata to detect the languages, frameworks and services you use. Your code stays where it is.",
  },
  {
    title: "Approve each integration",
    body: "We list what we found and ask before connecting anything. Every connection starts read-only.",
  },
  {
    title: "Find the cause, then act",
    body: "See what changed, ask the copilot why, and approve a fix from the dashboard, CLI, Slack or Telegram.",
  },
];

export const SECURITY = [
  {
    title: "Read-only by default",
    body: "Integrations can look, not touch. Write access is a separate decision you make per action.",
  },
  {
    title: "Permission for every integration",
    body: "We never connect a service on our own. You see what we found, then choose what to connect.",
  },
  {
    title: "Minimal data storage",
    body: "We keep the signals needed to explain an incident, not your source code or database rows.",
  },
  {
    title: "A person approves every change",
    body: "Rollbacks and restarts need human approval, and each one leaves an audit trail.",
  },
];

export const FAQ = [
  {
    q: "Do I have to migrate my infrastructure?",
    a: `No. ${BRAND} connects to the GitHub, AWS, Docker and database setup you already run.`,
  },
  {
    q: "What can it access?",
    a: "Read-only access by default, and only to the integrations you approve one by one.",
  },
  {
    q: "Can the copilot change production?",
    a: "No. It suggests fixes. Rollbacks and restarts only run after a person approves them.",
  },
  {
    q: "Where do alerts go?",
    a: "To the dashboard, the CLI, Slack or Telegram, and you can approve actions from any of them.",
  },
];