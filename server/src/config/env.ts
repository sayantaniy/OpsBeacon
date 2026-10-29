import "dotenv/config";
import { resolve } from "node:path";

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5001),
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",

  github: {
    appId: requiredEnv("GITHUB_APP_ID"),
    installationId: Number(
      requiredEnv("GITHUB_INSTALLATION_ID"),
    ),
    privateKeyPath: resolve(
      process.cwd(),
      requiredEnv("GITHUB_PRIVATE_KEY_PATH"),
    ),
  },
};

if (!Number.isSafeInteger(env.port) || env.port <= 0) {
  throw new Error("PORT must be a valid positive integer.");
}

if (
  !Number.isSafeInteger(env.github.installationId) ||
  env.github.installationId <= 0
) {
  throw new Error("GITHUB_INSTALLATION_ID must be a positive integer.");
}
