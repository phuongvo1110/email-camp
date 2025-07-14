import { createContext } from 'react';
import { type ToastType } from '../components/Toast';

export interface ToastContextType {
    showToast: (options: {
        type: ToastType;
        title: string;
        message?: string;
        duration?: number;
    }) => string;
    hideToast: (id: string) => void;
    clearAllToasts: () => void;
    showSuccess: (title: string, message?: string, duration?: number) => string;
    showError: (title: string, message?: string, duration?: number) => string;
    showWarning: (title: string, message?: string, duration?: number) => string;
    showInfo: (title: string, message?: string, duration?: number) => string;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
