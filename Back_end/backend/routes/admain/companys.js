import express from "express";
import { getCompanies } from "../../controller/companycontroller.js";

const router = express.Router();

router.get("/companies", getCompanies);

export default router;