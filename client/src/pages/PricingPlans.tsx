import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useHooks";
import { fetchPricingPlans } from "../stores/slices/pricingPlanSlice";
import type { RootState } from "../stores";
import type { PricingPlan } from "../models/pricingplan";
import { createCheckout } from "../stores/slices/checkoutSlice";

export default function PricingPlans() {
    const dispatch = useAppDispatch();
    const { items } = useAppSelector((state: RootState) => state.pricingplans);

    useEffect(() => {
        dispatch(fetchPricingPlans());
    }, [dispatch]);

    // Example features per plan (customize as needed)
    const planFeatures: Record<string, string[]> = {
        Starter: ["Basic analytics", "Email support"],
        Professional: [
            "Advanced analytics",
            "Priority support",
            "Custom email templates",
        ],
        Enterprise: [
            "Premium analytics",
            "24/7 dedicated support",
            "Advanced segmentation",
            "API access",
        ],
    };
    const handleCheckout = (priceId: string) => {
        dispatch(createCheckout(priceId));
    };
    return (
        <section id="pricing" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
                    Simple, Transparent Pricing
                </h2>
                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                    Pay only for what you need. Credits never expire and can be
                    used anytime.
                </p>
                <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                    {items.map((plan: PricingPlan, idx: number) => (
                        <div
                            key={plan._id}
                            className={`bg-white p-6 rounded-xl shadow-md pricing-card transition duration-300 ${
                                idx === 1 ? "shadow-xl highlight-card" : ""
                            }`}
                        >
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                    {plan.name}
                                </h3>
                                <p className="text-gray-600">
                                    {plan.credits} email credits
                                </p>
                            </div>
                            <div className="text-center mb-8">
                                <span className="text-2xl font-bold text-gray-900">
                                    ${plan.price}
                                </span>
                                <span className="text-gray-600">
                                    / {plan.credits} credits
                                </span>
                                <p className="text-sm text-gray-500 mt-2">
                                    ${(plan.price / plan.credits).toFixed(2)}{" "}
                                    per email
                                </p>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center">
                                    <i className="fas fa-check text-green-500 mr-2" />
                                    <span>{plan.credits} email credits</span>
                                </li>
                                {(planFeatures[plan.name] || []).map(
                                    (feature, i) => (
                                        <li
                                            className="flex items-center"
                                            key={i}
                                        >
                                            <i className="fas fa-check text-green-500 mr-2" />
                                            <span>{feature}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                            <button
                                onClick={() =>
                                    handleCheckout(plan.stripePriceId)
                                }
                                className={`w-full ${
                                    idx === 1 ? "gradient-bg" : "bg-indigo-600"
                                } text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition`}
                            >
                                Choose Plan
                            </button>
                        </div>
                    ))}
                </div>
                <div className="mt-12 bg-white p-8 rounded-xl shadow-sm max-w-3xl mx-auto">
                    <h3 className="text-xl font-semibold text-center mb-4">
                        Need a custom plan?
                    </h3>
                    <p className="text-center text-gray-600 mb-6">
                        We offer discounted rates for non-profits, educational
                        institutions, and bulk purchases over 10,000 credits.
                    </p>
                    <div className="flex justify-center">
                        <button className="border-2 border-indigo-600 text-indigo-600 px-6 py-2 rounded-md font-medium hover:bg-indigo-50 transition">
                            Contact Our Team
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
