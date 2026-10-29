
import { readFileSync } from "node:fs";
import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";
import { env } from "../../config/env.js";

let octokit: Octokit | undefined;

export function getGitHubClient(): Octokit {
  if (octokit) {
    return octokit;
  }

  const privateKey = readFileSync(
    env.github.privateKeyPath,
    "utf8",
  );

  octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: env.github.appId,
      privateKey,
      installationId: env.github.installationId,
    },
  });

  return octokit;
}
