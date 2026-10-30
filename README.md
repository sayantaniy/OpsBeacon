# Ops Beacon
## Project Documentation 
**Project:** Ops Beacon – Unified Deployment & Monitoring Platform  
**Phase:** 1 – GitHub App Integration and Backend Setup  
**Backend:** Node.js, Express.js, TypeScript  
**Integration:** GitHub REST API using Octokit  
**Status:** Initial implementation completed; end-to-end API verification pending.

---

# 1. Project Overview

Ops Beacon is a unified deployment and monitoring platform designed to bring application repositories, deployment pipelines, infrastructure, and monitoring information into a centralized dashboard.

The platform aims to help developers:

- Connect their GitHub repositories.
- Identify technologies and configurations used in their projects.
- Monitor deployment pipelines and workflow executions.
- Monitor infrastructure and containerized applications.
- Investigate deployment failures and application errors.
- Use AI to understand incidents and suggest possible solutions.
- Approve sensitive operations before changes are made.

The long-term objective is to provide developers with a centralized control room for their application infrastructure.

## 1.1 Planned Technology Stack

| Component | Technology |
|---|---|
| Frontend | Next.js |
| Backend | Node.js, Express.js |
| Language | TypeScript |
| GitHub integration | GitHub Apps, Octokit |
| Database | PostgreSQL (planned) |
| ORM | Prisma (planned) |
| Container integration | Docker (planned) |
| Cloud integration | AWS (planned) |
| AI analysis | Planned |
| Version control | Git and GitHub |

---

# 2. Backend Architecture

The backend follows a modular architecture to keep integrations, business logic, API routes, and application configuration separate.

This makes it easier to introduce additional integrations without making the main Express application difficult to maintain.

## 2.1 Current Backend Structure

```text
server/
│
├── src/
│   │
│   ├── config/
│   │   └── env.ts
│   │
│   ├── integrations/
│   │   └── github/
│   │       ├── github.client.ts
│   │       └── github.service.ts
│   │
│   ├── routes/
│   │   └── github.routes.ts
│   │
│   ├── shared/
│   │   └── http-error.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── pvtkey.pem
├── .gitignore
├── package.json
└── tsconfig.json
```

Other existing directories, such as `jobs`, `middleware`, `modules`, `queues`, and `utils`, are retained for future development.

## 2.2 Responsibilities of Each Module

| File | Responsibility |
|---|---|
| `config/env.ts` | Loads and validates environment variables. |
| `integrations/github/github.client.ts` | Creates the authenticated GitHub API client. |
| `integrations/github/github.service.ts` | Fetches repository information from GitHub. |
| `routes/github.routes.ts` | Defines GitHub-related HTTP endpoints. |
| `shared/http-error.ts` | Provides centralized Express error handling. |
| `app.ts` | Configures Express middleware and registers routes. |
| `server.ts` | Starts the backend HTTP server. |

---

# 3. GitHub App Configuration

## 3.1 GitHub App Creation

A GitHub App named **Ops Beacon** was created through GitHub Developer Settings.

The GitHub App acts as the authentication and authorization bridge between the Ops Beacon backend and GitHub.

Instead of asking users to provide their personal GitHub credentials, the platform uses GitHub App authentication.

## 3.2 Configured Permissions

The following read permissions were configured:

- **Actions:** Read access to GitHub Actions information.
- **Contents / Code:** Read access to repository contents.
- **Metadata:** Read access to repository metadata.

These permissions allow the application to retrieve repository information and inspect authorized project files.

The application was subscribed to the following webhook events:

- Push
- Workflow Run

Event subscriptions are configured, but webhook delivery is not implemented yet because a webhook receiver and publicly reachable webhook URL have not been configured.

## 3.3 GitHub App Installation

Ops Beacon was installed on the developer's GitHub account.

The installation currently uses the selected repository access configuration.

An installation is the association between a GitHub App and an account or organization where it has been installed.

Each installation has its own Installation ID.

For the current development phase, the backend uses one configured Installation ID.

Future multi-user support will require identifying and securely associating each installation with its respective platform user.

---

# 4. GitHub App Authentication

## 4.1 Private Key Generation

A private key in `.pem` format was generated from the GitHub App's settings.

The key is stored locally inside the backend directory.

**Filename:** `pvtkey.pem`

The private key is used by the backend to authenticate as the Ops Beacon GitHub App.

It is not intended to be exposed to the frontend or committed to the source repository.

## 4.2 Authentication Flow

The authentication process works as follows:

1. The backend loads the GitHub App ID.
2. It reads the private key from the configured file path.
3. It identifies the relevant installation using the Installation ID.
4. Octokit's GitHub App authentication strategy obtains a temporary installation access token.
5. The authenticated client uses this token to make authorized GitHub API requests.

Installation access tokens are temporary and are managed by the authentication library.

## 4.3 Required Environment Variables

The backend uses a `.env` file to store configuration separately from source code.

Example:

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

GITHUB_APP_ID=your_app_id
GITHUB_INSTALLATION_ID=your_installation_id
GITHUB_PRIVATE_KEY_PATH=./pvtkey.pem
```

Actual credentials must never be included in documentation, frontend code, or committed source files.

---

# 5. Backend Dependencies

The following packages are used by the backend.

| Package | Purpose |
|---|---|
| `express` | Backend HTTP framework. |
| `cors` | Controls cross-origin requests. |
| `helmet` | Adds security-related HTTP headers. |
| `dotenv` | Loads environment variables. |
| `@octokit/rest` | GitHub REST API client. |
| `@octokit/auth-app` | GitHub App authentication. |
| `typescript` | TypeScript development and compilation. |
| `tsx` | Runs TypeScript during development and supports watch mode. |

GitHub integration dependencies were installed using:

```bash
npm install @octokit/rest @octokit/auth-app
```

The other packages are part of the backend's Express setup.

---

# 6. Environment Configuration Module

**File:** `src/config/env.ts`

A centralized environment configuration module was introduced.

Its responsibilities include:

- Loading environment variables.
- Checking that required GitHub credentials exist.
- Validating the Installation ID.
- Resolving the private key path.
- Providing a centralized configuration object for the application.

This avoids repeatedly accessing `process.env` throughout the backend.

It also allows configuration errors to be detected early during application startup.

---

# 7. GitHub Integration Client

**File:** `src/integrations/github/github.client.ts`

The GitHub client module is responsible for establishing authenticated communication with GitHub.

It uses:

- `Octokit`
- `createAppAuth`
- GitHub App ID
- Installation ID
- Private key

A reusable client is created and cached.

The objective is to keep authentication logic separate from repository operations.

This also makes the client reusable for future GitHub integrations such as:

- Workflow monitoring.
- Repository scanning.
- Commit information retrieval.
- Pull request information.
- Webhook-related processing.

---

# 8. GitHub Repository Service

**File:** `src/integrations/github/github.service.ts`

The repository service contains the logic for retrieving repositories accessible to the configured GitHub App installation.

It uses the GitHub REST API endpoint:

```http
GET /installation/repositories
```

Octokit's pagination functionality is used to retrieve repositories across multiple pages.

## 8.1 Repository Information Retrieved

The service extracts the following fields:

| Field | Description |
|---|---|
| `id` | Unique repository ID. |
| `name` | Repository name. |
| `full_name` | Owner and repository name. |
| `private` | Whether the repository is private. |
| `html_url` | Repository URL. |
| `default_branch` | Default branch name. |
| `language` | Primary language reported by GitHub. |
| `updated_at` | Last repository update time. |

The service returns a structured response containing the total repository count and repository information.

---

# 9. GitHub API Routes

**File:** `src/routes/github.routes.ts`

A dedicated GitHub router was introduced to expose GitHub integration functionality through the backend.

## 9.1 Repository Endpoint

**Method:** GET

**Endpoint:**

```http
/api/github/repositories
```

**Local development URL:**

```text
http://localhost:5000/api/github/repositories
```

The route calls the repository service and returns its result in JSON format.

## 9.2 Expected Response Structure

The following is an illustrative response:

```json
{
  "success": true,
  "data": {
    "total_count": 2,
    "repositories": [
      {
        "id": 123456,
        "name": "example-project",
        "full_name": "owner/example-project",
        "private": true,
        "html_url": "https://github.com/owner/example-project",
        "default_branch": "main",
        "language": "TypeScript",
        "updated_at": "2026-10-30T10:00:00Z"
      }
    ]
  }
}
```

Actual values depend on the repositories authorized for the GitHub App installation.

---

# 10. Express Application Configuration

**File:** `src/app.ts`

The main Express application was configured to provide a centralized entry point for backend middleware and routes.

The application includes:

### Helmet

Adds security-related HTTP headers.

### CORS

Allows requests from the configured frontend origin.

The default development frontend origin is:

```text
http://localhost:3000
```

### Express JSON Middleware

Allows the backend to parse incoming JSON request bodies.

### Root Endpoint

```http
GET /
```

Returns a message confirming that the Ops Beacon API is running.

### Health Check

```http
GET /api/health
```

Returns backend health information.

Expected response:

```json
{
  "success": true,
  "status": "ok",
  "service": "backend"
}
```

### GitHub Router Registration

The GitHub router is registered using:

```typescript
app.use("/api/github", githubRoutes);
```

This makes the GitHub routes available under the `/api/github` prefix.

### Centralized Error Handling

The shared error handler is registered after the routes to handle errors passed through Express middleware.

---

# 11. TypeScript and ES Module Configuration

The backend uses TypeScript with Node.js ESM-compatible module resolution.

During development, TypeScript reported error TS2835 because relative imports require explicit file extensions under `Node16` or `NodeNext` module resolution.

The relative imports were updated to use `.js` extensions.

For example:

```typescript
import { env } from "./config/env.js";
import githubRoutes from "./routes/github.routes.js";
import { errorHandler } from "./shared/http-error.js";
```

Although the source files have `.ts` extensions, `.js` is used in the import paths so the compiled JavaScript can be resolved correctly by Node.js.

This convention should be followed consistently across the backend.

---

# 12. Git Ignore and Credential Security

Sensitive configuration files must not be uploaded to the Git repository.

The root `.gitignore` includes:

```gitignore
.env
.env.*
!.env.example
*.pem
```

This excludes environment files and private key files from normal Git tracking.

Important security practices:

- Never commit the GitHub private key.
- Never expose private keys in frontend code.
- Never hardcode credentials in application source files.
- Use environment variables for configuration.
- Limit GitHub App permissions to what the integration actually needs.
- Prefer selected repository access over granting access to every repository.
- Do not expose the current repository endpoint publicly without user authentication and installation ownership checks.

Adding a file to `.gitignore` does not remove it if it has already been committed.

---

# 13. Current Request Flow

The GitHub repository integration follows this architecture:

```text
           Frontend
               |
               |
               v
       Express Application
             app.ts
               |
               v
       GitHub API Router
       github.routes.ts
               |
               v
       GitHub Repository Service
       github.service.ts
               |
               v
       GitHub Client
       github.client.ts
               |
               v
       GitHub App Authentication
               |
               v
        GitHub REST API
               |
               v
       Authorized Repositories
               |
               v
       JSON Response to Frontend
```

This separation allows authentication, repository operations, and HTTP request handling to evolve independently.

---

# 14. Development and Testing

The backend development script currently uses:

```bash
npm run dev
```

The command runs:

```bash
tsx watch src/server.ts
```

The application is intended to run locally on port `5000`.

## 14.1 Health Check Test

```text
http://localhost:5000/api/health
```

This checks whether the Express application is responding.

## 14.2 GitHub Repository Test

```text
http://localhost:5000/api/github/repositories
```

This checks whether the backend can authenticate as the GitHub App and retrieve repository information.

## 14.3 Configuration Issue Encountered

During the initial startup attempt, the backend returned:

```text
Missing required environment variable: GITHUB_APP_ID
```

This indicated that the required environment variable was not available to the configuration module.

The `.env` configuration was subsequently checked and corrected.

**Verification status:** The integration code has been implemented, but a successful repository response has not yet been confirmed in this documentation.

---

# 15. Git Commit

The implementation was prepared for version control with the following commit:

```bash
git add . && git commit -m "feat(github): add GitHub App repository integration" -m "Configure GitHub App environment variables, add authenticated Octokit client, fetch installation repositories with pagination, expose GitHub repository API route, and add centralized error handling."
```

Commit type: `feat`

Scope: `github`

Description: Add GitHub App repository integration.

---

# 16. Current Implementation Status

| Feature | Status |
|---|---|
| Ops Beacon GitHub App creation | Completed |
| GitHub App permissions configuration | Completed |
| Push and Workflow Run event subscriptions | Completed |
| GitHub App installation | Completed |
| Private key generation | Completed |
| Local environment configuration | Implemented |
| Octokit dependencies | Installed |
| Centralized environment configuration | Implemented |
| GitHub authentication client | Implemented |
| Repository-fetching service | Implemented |
| Repository API route | Implemented |
| Centralized error middleware | Implemented |
| Express route registration | Implemented |
| Backend startup | Needs final verification |
| GitHub repository API response | Needs final verification |
| Webhook receiver | Not implemented |
| Frontend GitHub integration | Not implemented |
| Multi-user installation management | Not implemented |

---

# 17. Upcoming Development Roadmap

The following phases build on the GitHub integration foundation.

## Phase 2 – Repository Scanner

Develop a repository scanner that can inspect authorized repositories and identify:

- Programming languages.
- Frameworks and dependencies.
- Project structure.
- Docker configuration.
- GitHub Actions workflows.
- Deployment configuration.
- Infrastructure-related configuration files.

The initial scanner will use deterministic, rule-based detection.

AI can later be added as an interpretation layer to explain architecture and identify potential configuration issues.

## Phase 3 – GitHub Webhook Integration

Implement a publicly reachable webhook endpoint to receive:

- Push events.
- Workflow run events.

Use webhook signature verification to authenticate incoming GitHub events.

These events will allow Ops Beacon to update repository and workflow information without repeatedly polling GitHub.

## Phase 4 – Deployment Monitoring

Integrate deployment-related services and monitoring information.

Planned integrations:

- GitHub Actions.
- Docker.
- AWS.

The objective is to track deployment activity and infrastructure status from a centralized dashboard.

## Phase 5 – Database and Persistence

Introduce PostgreSQL and Prisma.

Potential stored entities include:

- Users.
- GitHub App installations.
- Connected repositories.
- Repository scan results.
- Deployment records.
- Monitoring information.

Sensitive credentials should be handled using secure storage and appropriate encryption rather than being stored as ordinary database fields.

## Phase 6 – AI-Powered Incident Analysis

Introduce an AI analysis layer capable of:

- Interpreting deployment failures.
- Summarizing build logs.
- Identifying likely configuration problems.
- Explaining infrastructure errors.
- Suggesting possible fixes.

AI-generated recommendations will remain separate from execution.

Sensitive actions must require explicit human approval.

## Phase 7 – Multi-User Authentication and Authorization

Implement:

- User authentication.
- GitHub installation ownership mapping.
- Repository-level authorization.
- Secure credential management.
- Role-based access control where needed.

Each user must only be able to access installations and resources they are authorized to manage.

---

# 18. Security and Design Principles

Ops Beacon will follow these principles throughout development:

1. **Least privilege:** Request only the permissions required by each integration.
2. **Read-only by default:** Begin with read-only integrations wherever possible.
3. **Secure credentials:** Keep secrets out of source control and frontend code.
4. **Human approval:** Require approval before executing sensitive operations.
5. **Minimal data storage:** Store only information required for the platform's functionality.
6. **Modular architecture:** Keep integrations and business logic separate.
7. **AI safety:** Treat repository files and logs as untrusted input and never allow them to override system security rules.
8. **Explicit authorization:** Associate each user's connected resources with their authenticated account.

---

# 19. Summary

The first development milestone establishes the GitHub integration foundation of Ops Beacon.

A GitHub App was created and configured, a private key was generated, and the backend was structured into separate modules for configuration, GitHub authentication, repository retrieval, API routing, and error handling.

The backend is designed to retrieve repository metadata through the GitHub REST API and expose it through a dedicated Express endpoint.

This foundation will support the next major feature: a repository scanner that understands project technologies, dependencies, and deployment configurations.

The longer-term objective is to evolve Ops Beacon into a unified platform for repository analysis, deployment monitoring, infrastructure visibility, and AI-assisted incident investigation.