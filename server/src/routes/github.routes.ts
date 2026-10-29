
import { Router } from "express";
import { getInstallationRepositories } from "../integrations/github/github.service.js";

const router = Router();

router.get("/repositories", async (_req, res, next) => {
  try {
    const result = await getInstallationRepositories();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
