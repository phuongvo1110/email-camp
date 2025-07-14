import { useState, useCallback } from 'react';
import { type ToastType, type ToastProps } from '../components/Toast';

interface CreateToastOptions {
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
}

interface UseToastReturn {
    toasts: ToastProps[];
    showToast: (options: CreateToastOptions) => string;
    hideToast: (id: string) => void;
    clearAllToasts: () => void;
    showSuccess: (title: string, message?: string, duration?: number) => string;
    showError: (title: string, message?: string, duration?: number) => string;
    showWarning: (title: string, message?: string, duration?: number) => string;
    showInfo: (title: string, message?: string, duration?: number) => string;
}

export const useToast = (): UseToastReturn => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const generateId = useCallback(() => {
        return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }, []);

    const hideToast = useCallback((id: string) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    const showToast = useCallback((options: CreateToastOptions): string => {
        const id = generateId();
        const newToast: ToastProps = {
            id,
            type: options.type,
            title: options.title,
            message: options.message,
            duration: options.duration ?? 5000,
            onClose: hideToast,
        };

        setToasts((prevToasts) => [...prevToasts, newToast]);
        return id;
    }, [generateId, hideToast]);

    const clearAllToasts = useCallback(() => {
        setToasts([]);
    }, []);

    // Convenience methods for different toast types
    const showSuccess = useCallback((title: string, message?: string, duration?: number): string => {
        return showToast({ type: 'success', title, message, duration });
    }, [showToast]);

    const showError = useCallback((title: string, message?: string, duration?: number): string => {
        return showToast({ type: 'error', title, message, duration });
    }, [showToast]);

    const showWarning = useCallback((title: string, message?: string, duration?: number): string => {
        return showToast({ type: 'warning', title, message, duration });
    }, [showToast]);

    const showInfo = useCallback((title: string, message?: string, duration?: number): string => {
        return showToast({ type: 'info', title, message, duration });
    }, [showToast]);

    return {
        toasts,
        showToast,
        hideToast,
        clearAllToasts,
        showSuccess,
        showError,
        showWarning,
        showInfo,
    };
};
