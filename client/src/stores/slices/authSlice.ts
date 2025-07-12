import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../../models/user";
export const fetchCurrentUser = createAsyncThunk("auth/fetchUser", async () => {
    const res = await axios("/api/current_user");
    return res.data;
});
type UserState = {
    user: User | null;
    loading: boolean;
};
const initialState: UserState = {
    user: null,
    loading: true,
};
const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload || null;
                state.loading = false;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.loading = false;
            });
    },
});
export const AuthActions = authSlice.actions;
export default authSlice.reducer;
