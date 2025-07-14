import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IFormSurvey } from "../../components/SurveyModal";
import axios from "axios";
export const createSurvey = createAsyncThunk(
    "survey/createSurvey",
    async (data: IFormSurvey, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/surveys", {
                title: data.title,
                subject: data.subject,
                recipients: data.recipients,
                body: data.questions,
            });
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || { error: "Failed to create survey" }
            );
        }
    }
);
const surveyModalSlice = createSlice({
    name: "surveyModal",
    initialState: {
        isOpen: false,
        loading: false,
        error: null as string | null,
    },
    reducers: {
        toggleModal(state) {
            state.isOpen = !state.isOpen;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSurvey.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSurvey.fulfilled, (state) => {
                state.loading = false;
                state.isOpen = false; // Close modal on success
            })
            .addCase(createSurvey.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    (action.payload as { error?: string })?.error ||
                    "Something went wrong";
            });
    },
});
export const SurveyModalActions = surveyModalSlice.actions;
export default surveyModalSlice.reducer;
