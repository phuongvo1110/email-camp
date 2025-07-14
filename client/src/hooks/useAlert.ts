import { useState } from 'react';

interface UseAlertReturn {
    showAlert: boolean;
    alertMessage: string;
    alertType: "success" | "error";
    showSuccessAlert: (message: string, duration?: number) => void;
    showErrorAlert: (message: string, duration?: number) => void;
    hideAlert: () => void;
}

export const useAlert = (): UseAlertReturn => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"success" | "error">("success");

    const showSuccessAlert = (message: string, duration: number = 3000) => {
        setAlertMessage(message);
        setAlertType("success");
        setShowAlert(true);
        if (duration > 0) {
            setTimeout(() => setShowAlert(false), duration);
        }
    };

    const showErrorAlert = (message: string, duration: number = 3000) => {
        setAlertMessage(message);
        setAlertType("error");
        setShowAlert(true);
        if (duration > 0) {
            setTimeout(() => setShowAlert(false), duration);
        }
    };

    const hideAlert = () => {
        setShowAlert(false);
    };

    return {
        showAlert,
        alertMessage,
        alertType,
        showSuccessAlert,
        showErrorAlert,
        hideAlert,
    };
};
