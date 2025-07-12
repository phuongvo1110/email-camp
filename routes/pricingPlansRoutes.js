const mongoose = require("mongoose");
const PricingPlans = mongoose.model("pricingplans");
const requireLogin = require("../middlewares/requireLogin");
module.exports = (app) => {
    app.get("/api/pricingplans", requireLogin, async (req, res) => {
        try {
            const plans = await PricingPlans.find({ isActive: true });
            res.json(plans);
        } catch (error) {
            res.status(500).json({ error: "Failed to load pricing plans" });
        }
    });
};
