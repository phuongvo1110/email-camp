import { useMutation, useQuery } from "@tanstack/react-query";
import type { IFormSurvey } from "../components/SurveyModal";
import axios from "axios";
import { useToastContext } from "./useToastContext";
import { queryClient } from "../lib/queryClient";
import type { Survey } from "../models/survey";
const handlerCreateSurvey = async (survey: IFormSurvey) => {
    const response = await axios.post("/api/surveys", {
        title: survey.title,
        subject: survey.subject,
        recipients: survey.recipients,
        body: survey.questions,
    });
    return response.data;
};
export const useCreateSurvey = () => {
    const { showSuccess } = useToastContext();
    return useMutation({
        mutationFn: handlerCreateSurvey,
        onSuccess: () => {
            // Handle success, e.g., show a success message or update state
            queryClient.invalidateQueries({ queryKey: ["surveys"] });
            showSuccess(
                "Survey Created Successfully!",
                "Your survey has been sent to all recipients.",
                5000
            );
        },
    });
};
const handleFetchSurveys = async ({
    signal,
    page,
    limit,
    sort,
}: {
    signal: AbortSignal;
    page: number;
    limit: number;
    sort: string;
}) => {
    const response = await axios.get("/api/surveys", {
        params: { page, limit, sort },
        signal,
    });
    return response.data;
};
export const useFetchSurveys = ({
    page,
    limit,
    sort,
}: {
    page: number;
    limit: number;
    sort: string;
}) => {
    return useQuery({
        queryKey: ["surveys", { page, limit, sort }],
        queryFn: ({ signal }) =>
            handleFetchSurveys({
                signal,
                page,
                limit,
                sort,
            }),
    });
};
const handleFetchSurveysAll = async (): Promise<Survey[]> => {
    const response = await axios.get("/api/surveys");
    return response.data.surveys;
};
export const useFetchSurveysAll = () => {
    return useQuery({
        queryKey: ["surveys"],
        queryFn: () => handleFetchSurveysAll(),
    });
};
