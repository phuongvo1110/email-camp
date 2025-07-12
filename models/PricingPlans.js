const mongoose = require("mongoose");
const { Schema } = mongoose;
const pricingPlanSchema = new Schema({
    name: { type: String, require: true },
    stripePriceId: { type: String, require: true },
    credits: { type: Number, require: true },
    price: { type: Number, require: true },
    currency: { type: String, default: "usd" },
    interval: {
        type: String,
        enum: ["month", "year", "one_time"],
        default: "month",
    },
    isActive: { type: Boolean, default: true },
});
mongoose.model("pricingplans", pricingPlanSchema);
