import axios from "axios";
import getStripe from "../lib/getStripe";
import { useMutation } from "@tanstack/react-query";
import { useToastContext } from "./useToastContext";

const createCheckout = async (priceId: string) => {
    try {
        const stripe = await getStripe();
        if (stripe) {
            const response = await axios.post(
                "/api/payment/create-subscription-session",
                {
                    priceId: priceId,
                }
            );
            const sessionId = response.data.id;
            await stripe.redirectToCheckout({
                sessionId,
            });
            return sessionId;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        // Handle error appropriately
        console.error("Checkout failed:", error);
        throw new Error(error.message || "Checkout failed");
    }
};
export const useCreateCheckout = () => {
    const { showSuccess, showError } = useToastContext();
    return useMutation({
        mutationFn: createCheckout,
        onSuccess: () => {
            showSuccess(
                "Checkout Successful",
                "You will be redirected to the payment page."
            );
        },
        onError: (error: Error) => {
            showError("Checkout Failed", error.message);
        },
    });
};
