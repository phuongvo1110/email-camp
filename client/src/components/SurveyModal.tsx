import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import Question from "./Question";
import { useAppDispatch, useAppSelector } from "../hooks/useHooks";
import { useToastContext } from "../hooks/useToastContext";
import { createSurvey } from "../stores/slices/surveyModalSlice";
import type { RootState } from "../stores";
import Input from "./Input";
import Textarea from "./Textarea";
import { Button, Spinner } from "@material-tailwind/react";
// 1. Update IFormSurvey type to include subject
export type DialogRef = {
    open: () => void;
    close: () => void;
};
export interface IFormSurvey {
    title: string;
    subject: string;
    recipients: string;
    questions: string;
}

const SurveyModal = forwardRef<DialogRef>((_, ref) => {
    const dialog = useRef<HTMLDialogElement>(null);
    const {
        register: surveyRegister,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormSurvey>();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(
        (state: RootState) => state.surveyModal
    );
    const { showSuccess, showError } = useToastContext();

    // Handle survey creation response
    useEffect(() => {
        if (error) {
            showError("Survey Creation Failed", error, 6000);
        }
    }, [error, showError]);

    const onSubmit: SubmitHandler<IFormSurvey> = async (data) => {
        try {
            const result = await dispatch(createSurvey(data));
            if (createSurvey.fulfilled.match(result)) {
                showSuccess(
                    "Survey Created Successfully!",
                    "Your survey has been sent to all recipients.",
                    5000
                );
                dialog.current?.close();
                reset();
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            showError(
                "Failed to Create Survey",
                "Please check your input and try again.",
                6000
            );
        }
    };
    useImperativeHandle(
        ref,
        () => ({
            open: () => {
                dialog.current?.showModal();
            },
            close: () => {
                dialog.current?.close();
            },
        }),
        []
    );

    return createPortal(
        <dialog ref={dialog} onClose={() => reset()}>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl slide-up">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="p-6 space-y-4"
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Create Survey
                            </h2>
                            <button
                                id="closeDialogBtn"
                                className="text-gray-400 hover:text-gray-600"
                                onClick={() => dialog.current?.close()}
                                type="button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <Input
                            label="Survey Title"
                            {...surveyRegister("title", {
                                required: "Survey title is required",
                            })}
                            placeholder="Enter survey title"
                            id="surveyTitle"
                            type="text"
                            error={errors.title}
                        />
                        {/* Subject input */}
                        <Input
                            label="Subject"
                            {...surveyRegister("subject", {
                                required: "Subject is required",
                            })}
                            placeholder="Enter subject"
                            id="surveySubject"
                            type="text"
                            error={errors.subject}
                        />
                        <Textarea
                            label="Survey Recipients"
                            {...surveyRegister("recipients", {
                                required: "Recipients is required",
                            })}
                            placeholder="Enter email addresses separated by commas"
                            id="surveyRecipients"
                            error={errors.recipients}
                        />
                        {/* Questions Container */}
                        <div id="questionsContainer" className="space-y-4">
                            {/* Question template will be added here */}
                            <Question
                                type="text"
                                {...surveyRegister("questions", {
                                    required: "Question is required",
                                })}
                            />
                            {errors.questions && (
                                <span className="text-red-500 text-sm">
                                    {errors.questions.message}
                                </span>
                            )}
                        </div>
                        <div className="flex justify-end space-x-3 pt-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                {loading && <Spinner className="mr-2" />}
                                Send Survey
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>,
        document.getElementById("modal-root")!
    );
});

export default SurveyModal;
