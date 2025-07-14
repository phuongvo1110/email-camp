import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import type { Survey } from "../../models/survey";

// Types for better type safety
interface SurveyResponse {
    surveys: Survey[];
    pages?: number;
    total?: number;
    page?: number;
}

interface PaginationParams {
    page: number;
    limit: number;
    sort: string;
}

interface SurveyState {
    loading: boolean;
    loadingWithPagin: boolean;
    items: Survey[];
    itemsWithPagin: Survey[];
    error: string | null;
    pages: number;
    total: number;
    page: number;
    sort: string;
    orderBy?: string;
}

// Helper function to handle API errors
const handleApiError = (error: unknown): string => {
    if (error instanceof AxiosError) {
        return (
            error.response?.data?.message ||
            error.message ||
            "API request failed"
        );
    }
    return error instanceof Error ? error.message : "An unknown error occurred";
};

// Async thunks with improved error handling
export const fetchSurveys = createAsyncThunk<
    SurveyResponse,
    void,
    { rejectValue: string }
>("survey/fetchSurveys/all", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get<SurveyResponse>("/api/surveys/all");
        return response.data;
    } catch (error) {
        return rejectWithValue(handleApiError(error));
    }
});

export const fetchSurveysWithPagin = createAsyncThunk<
    SurveyResponse,
    PaginationParams,
    { rejectValue: string }
>(
    "survey/fetchSurveys/pagin",
    async ({ page, limit, sort }, { rejectWithValue }) => {
        try {
            if (page < 1 || limit < 1) {
                return rejectWithValue("Invalid pagination parameters");
            }

            const response = await axios.get<SurveyResponse>(
                `/api/surveys?page=${page}&limit=${limit}&sort=${
                    sort || "dateSent"
                }`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

// Initial state with proper typing
const initialState: SurveyState = {
    loading: false,
    loadingWithPagin: false,
    items: [],
    itemsWithPagin: [],
    error: null,
    pages: 0,
    total: 0,
    page: 1,
    sort: "dateSent",
    orderBy: "asc", // Default order
};

// Survey slice with improved reducers
const surveySlice = createSlice({
    name: "survey",
    initialState,
    reducers: {
        // Clear error state
        clearError: (state) => {
            state.error = null;
        },

        // Reset pagination state
        resetPagination: (state) => {
            state.page = 1;
            state.pages = 0;
            state.total = 0;
            state.sort = "dateSent";
            state.itemsWithPagin = [];
        },
        //Set Sort
        setSort: (state, action: PayloadAction<string>) => {
            state.sort =
                state.orderBy === "asc"
                    ? state.sort.replace(
                          state.sort.substring(0),
                          action.payload
                      )
                    : state.sort.replace(
                          state.sort.substring(1),
                          action.payload
                      );
        },
        setOrderBy: (state, action) => {
            state.orderBy = action.payload;
            if (state.sort.startsWith("-")) {
                state.sort = state.sort.slice(1);
            }
            state.sort =
                action.payload === "asc" ? state.sort : `-${state.sort}`;
        },
        // Set current page
        setCurrentPage: (state, action: PayloadAction<number>) => {
            if (action.payload > 0) {
                state.page = action.payload;
            }
        },

        // Add a new survey to the state (for optimistic updates)
        addSurvey: (state, action: PayloadAction<Survey>) => {
            state.items.unshift(action.payload);
            state.total += 1;
        },

        // Update an existing survey
        updateSurvey: (
            state,
            action: PayloadAction<{ id: string; updates: Partial<Survey> }>
        ) => {
            const { id, updates } = action.payload;

            // Update in items array
            const itemIndex = state.items.findIndex(
                (survey) => survey._id === id
            );
            if (itemIndex !== -1) {
                state.items[itemIndex] = {
                    ...state.items[itemIndex],
                    ...updates,
                };
            }

            // Update in paginated items array
            const paginatedIndex = state.itemsWithPagin.findIndex(
                (survey) => survey._id === id
            );
            if (paginatedIndex !== -1) {
                state.itemsWithPagin[paginatedIndex] = {
                    ...state.itemsWithPagin[paginatedIndex],
                    ...updates,
                };
            }
        },

        // Remove a survey from state
        removeSurvey: (state, action: PayloadAction<string>) => {
            const surveyId = action.payload;
            state.items = state.items.filter(
                (survey) => survey._id !== surveyId
            );
            state.itemsWithPagin = state.itemsWithPagin.filter(
                (survey) => survey._id !== surveyId
            );
            state.total = Math.max(0, state.total - 1);
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all surveys
            .addCase(fetchSurveys.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSurveys.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.surveys || [];
                state.error = null;
            })
            .addCase(fetchSurveys.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch surveys";
                state.items = [];
            })

            // Fetch surveys with pagination
            .addCase(fetchSurveysWithPagin.pending, (state) => {
                state.loadingWithPagin = true;
                state.error = null;
            })
            .addCase(fetchSurveysWithPagin.fulfilled, (state, action) => {
                state.loadingWithPagin = false;
                state.itemsWithPagin = action.payload.surveys || [];
                state.pages = action.payload.pages || 0;
                state.total = action.payload.total || 0;
                state.page = action.payload.page || 1;
                state.error = null;
            })
            .addCase(fetchSurveysWithPagin.rejected, (state, action) => {
                state.loadingWithPagin = false;
                state.error =
                    action.payload || "Failed to fetch surveys with pagination";
                state.itemsWithPagin = [];
            });
    },
});

// Export actions
export const surveyActions = surveySlice.actions;

// Selectors for better data access
export const surveySelectors = {
    // Basic selectors
    selectSurveys: (state: { survey: SurveyState }) => state.survey.items,
    selectPaginatedSurveys: (state: { survey: SurveyState }) =>
        state.survey.itemsWithPagin,
    selectLoading: (state: { survey: SurveyState }) => state.survey.loading,
    selectPaginationLoading: (state: { survey: SurveyState }) =>
        state.survey.loadingWithPagin,
    selectError: (state: { survey: SurveyState }) => state.survey.error,
    selectPagination: (state: { survey: SurveyState }) => ({
        page: state.survey.page,
        pages: state.survey.pages,
        total: state.survey.total,
    }),

    // Computed selectors
    selectSurveyById: (state: { survey: SurveyState }, id: string) =>
        state.survey.items.find((survey) => survey._id === id),

    selectActiveSurveys: (state: { survey: SurveyState }) => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return state.survey.items.filter(
            (survey) =>
                survey.lastResponded &&
                new Date(survey.lastResponded) > thirtyDaysAgo
        );
    },

    selectRecentSurveys: (state: { survey: SurveyState }) => {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return state.survey.items.filter(
            (survey) => new Date(survey.dateSent) > sevenDaysAgo
        );
    },

    selectTotalContacts: (state: { survey: SurveyState }) =>
        state.survey.items.reduce(
            (sum, survey) => sum + survey.recipients.length,
            0
        ),

    selectAverageResponseRate: (state: { survey: SurveyState }) => {
        const surveys = state.survey.items;
        if (surveys.length === 0) return 0;

        const totalContacts = surveys.reduce(
            (sum, survey) => sum + survey.recipients.length,
            0
        );
        const totalResponses = surveys.reduce(
            (sum, survey) =>
                sum +
                survey.recipients.filter((recipient) => recipient.responded)
                    .length,
            0
        );

        return totalContacts > 0
            ? Number(((totalResponses / totalContacts) * 100).toFixed(1))
            : 0;
    },

    selectSurveyStats: (state: { survey: SurveyState }) => {
        const surveys = state.survey.items;

        if (surveys.length === 0) {
            return {
                totalContacts: 0,
                activeCampaigns: 0,
                avgResponseRate: 0,
                recentCampaigns: 0,
            };
        }

        const totalContacts = surveys.reduce(
            (sum, survey) => sum + survey.recipients.length,
            0
        );

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const activeCampaigns = surveys.filter(
            (survey) =>
                survey.lastResponded &&
                new Date(survey.lastResponded) > thirtyDaysAgo
        ).length;

        const totalResponses = surveys.reduce(
            (sum, survey) =>
                sum +
                survey.recipients.filter((recipient) => recipient.responded)
                    .length,
            0
        );
        const avgResponseRate =
            totalContacts > 0
                ? Number(((totalResponses / totalContacts) * 100).toFixed(1))
                : 0;

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentCampaigns = surveys.filter(
            (survey) => new Date(survey.dateSent) > sevenDaysAgo
        ).length;

        return {
            totalContacts,
            activeCampaigns,
            avgResponseRate,
            recentCampaigns,
        };
    },
};

export default surveySlice.reducer;
