import express from "express";

import {
  checkApplication,
  createApplication,
  getApplications,
} from "../controllers/applicationController.js";

const router = express.Router();

router.get("/", getApplications);
router.get("/check/:userId/:jobId", checkApplication);
router.post("/", createApplication);

export default router;
