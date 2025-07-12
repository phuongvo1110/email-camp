import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PricingPlan } from "../../models/pricingplan";
import axios from "axios";
type PricingPlanState = {
    items: PricingPlan[];
    loading: boolean;
};
export const fetchPricingPlans = createAsyncThunk(
    "api/pricingPlans",
    async () => {
        const res = await axios.get("/api/pricingplans");
        return res.data;
    }
);
const initialState: PricingPlanState = {
    items: [],
    loading: true,
};
const pricingPlansSlice = createSlice({
    name: "pricingplans",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPricingPlans.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPricingPlans.fulfilled, (state, action) => {
                state.items = action.payload || [];
                state.loading = false;
            })
            .addCase(fetchPricingPlans.rejected, (state) => {
                state.loading = false;
            });
    },
});
export const PricingPlanActions = pricingPlansSlice.actions;
export default pricingPlansSlice.reducer;
