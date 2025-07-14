import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useHooks";
import { fetchPricingPlans } from "../stores/slices/pricingPlanSlice";
import type { RootState } from "../stores";
import type { PricingPlan } from "../models/pricingplan";
import { createCheckout } from "../stores/slices/checkoutSlice";
import PlanCard from "../components/PlanCard";

export default function PricingPlans() {
    const dispatch = useAppDispatch();
    const { items } = useAppSelector((state: RootState) => state.pricingplans);

    useEffect(() => {
        dispatch(fetchPricingPlans());
    }, [dispatch]);
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
                        <PlanCard idx={idx} plan={plan} onCheckout={handleCheckout}/>
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
