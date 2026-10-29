
import express from "express";
import cors from "cors";
import helmet from "helmet";

import { env } from "./config/env.js";
import githubRoutes from "./routes/github.routes.js";
import { errorHandler } from "./shared/http-error.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.clientUrl,
  }),
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Ops Beacon API is running!",
  });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    service: "backend",
  });
});

// GitHub integration routes
app.use("/api/github", githubRoutes);

// Centralized error handler (must come after routes)
app.use(errorHandler);

export default app;
