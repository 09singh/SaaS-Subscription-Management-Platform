import express from "express";
import Plan from "../shema/admain/Plan.js";
const route = express.Router();

route.get("/plans", (req, res) => {
    const plans = await Plan.find();
    try {
        res.status(200).json({
            success: true,
            plans,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
export default route;