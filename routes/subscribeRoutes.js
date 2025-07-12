const mongoose = require("mongoose");
const { stripeSecretKey } = require("../config/key");
const Stripe = require("stripe");
const stripe = Stripe(stripeSecretKey);
const PricingPlans = mongoose.model("pricingplans");
const requireLogin = require("../middlewares/requireLogin");
module.exports = (app) => {
    app.post(
        "/api/payment/create-subscription-session",
        requireLogin,
        async (req, res) => {
            const { priceId } = req.body;
            const selectedPricingPlans = await PricingPlans.findOne({
                stripePriceId: priceId,
            });
            if (!selectedPricingPlans) {
                return res
                    .status(400)
                    .send({ error: "Pricing plans not found" });
            }
            try {
                const session = await stripe.checkout.sessions.create({
                    mode: "subscription",
                    payment_method_types: ["card"],
                    line_items: [{ price: priceId, quantity: 1 }],
                    success_url:
                        "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
                    cancel_url: "http://localhost:5173/cancel",
                });
                req.user.credits += selectedPricingPlans.credits;
                const updatedUser = await req.user.save();
                res.send({ id: session.id, updatedUser });
            } catch (error) {
                res.status(500).send({ error: "Failed to update credits" });
            }
        }
    );
    app.get(
        "/api/payment/get-subscription-info",
        requireLogin,
        async (req, res) => {
            const sessionId = req.query.session_id;
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription
            );
            const customer = await stripe.customers.retrieve(session.customer);
            const item = subscription.items.data[0];

            // Retrieve price and product
            const price = await stripe.prices.retrieve(item.price.id);
            const product = await stripe.products.retrieve(price.product);

            res.send({
                subscription_id: subscription.id,
                status: subscription.status,
                customer_email: customer.email,
                product: {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    metadata: product.metadata,
                    images: product.images,
                },
                price: {
                    id: price.id,
                    unit_amount: price.unit_amount,
                    currency: price.currency,
                    interval: price.recurring.interval,
                },
            });
        }
    );
};
