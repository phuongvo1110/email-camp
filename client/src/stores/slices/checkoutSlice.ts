import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getStripe from "../../lib/getStripe";
import axios from "axios";

interface CheckoutState {
    loading: boolean;
    error: string | null;
}

const initialState: CheckoutState = {
    loading: false,
    error: null,
};
export const createCheckout = createAsyncThunk(
    "payment/createSubscriptionSession",
    async (priceId: string, { rejectWithValue }) => {
        try {
            const stripe = await getStripe();
            if (stripe) {
                const res = await axios.post(
                    "/api/payment/create-subscription-session",
                    {
                        priceId: priceId,
                    }
                );
                const sessionId = res.data.id;
                await stripe.redirectToCheckout({
                    sessionId,
                });
                return sessionId;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || { error: "Checkout failed" }
            );
        }
    }
);
const checkoutSlice = createSlice({
    name: "checkout",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCheckout.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCheckout.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createCheckout.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    (action.payload as { error?: string })?.error ||
                    "Something went wrong";
            });
    },
});
export const checkoutActions = checkoutSlice.actions;
export default checkoutSlice.reducer;
