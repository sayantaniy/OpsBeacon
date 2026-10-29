
import type {
  ErrorRequestHandler,
} from "express";

export const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  console.error("API error:", error);

  if (res.headersSent) {
    return;
  }

  res.status(500).json({
    success: false,
    error: "An unexpected server error occurred.",
  });
};
