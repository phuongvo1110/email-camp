import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import pricingPlanReducer from "./slices/pricingPlanSlice";
import checkoutReducer from "./slices/checkoutSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        pricingplans: pricingPlanReducer,
        checkout: checkoutReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
