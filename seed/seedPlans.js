const mongoose = require("mongoose");
const PricingPlan = require("../models/PricingPlans");
const { mongoURI } = require("../config/key");
const seedPlans = async () => {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    await PricingPlan.deleteMany(); // Clear existing plans (optional)

    const plans = [
        {
            name: "Basic Plan",
            stripePriceId: "price_1RjuzkGf5CJ144DxH5ztTzII",
            credits: 100,
            price: 5, // $5.00
            interval: "month",
        },
        {
            name: "Pro Plan",
            stripePriceId: "price_1Rjv0DGf5CJ144DxENjxGeS5",
            credits: 500,
            price: 15, // $15.00
            interval: "month",
        },
        {
            name: "Enterprise Plan",
            stripePriceId: "price_1Rjv0YGf5CJ144DxvvKdxjSG",
            credits: 2000,
            price: 49.99, // $49.99
            interval: "month",
        },
        {
            name: "One-Time 1K Credits",
            stripePriceId: "price_1Rjv24Gf5CJ144DxslMmxvx4",
            credits: 1000,
            price: 25, // $25.00
            interval: "one_time",
        },
    ];

    await PricingPlan.insertMany(plans);
    console.log("Pricing plans seeded!");
    mongoose.disconnect();
};

seedPlans().catch((err) => {
    console.error("Error seeding plans:", err);
    mongoose.disconnect();
});
