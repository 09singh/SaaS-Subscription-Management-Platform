import express from "express";

import {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
} from "../../controller/Planecontroller.js";

const router = express.Router();

router.get("/plans", getPlans);

router.post("/plans", createPlan);

router.put("/plans/:id", updatePlan);

router.delete("/plans/:id", deletePlan);

export default router;