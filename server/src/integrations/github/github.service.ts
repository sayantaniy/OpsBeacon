
import { getGitHubClient } from "./github.client.js";

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  default_branch: string;
  language: string | null;
  updated_at: string | null;
}

export async function getInstallationRepositories(): Promise<{
  total_count: number;
  repositories: GitHubRepository[];
}> {
  const octokit = getGitHubClient();

  const repositories = await octokit.paginate(
    octokit.rest.apps.listReposAccessibleToInstallation,
    {
      per_page: 100,
    },
  );

  return {
    total_count: repositories.length,
    repositories: repositories.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      private: repo.private,
      html_url: repo.html_url,
      default_branch: repo.default_branch,
      language: repo.language,
      updated_at: repo.updated_at,
    })),
  };
}
