import React, { useEffect, useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
    onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
    id,
    type,
    title,
    message,
    duration = 5000,
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        // Trigger entrance animation
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = useCallback(() => {
        setIsLeaving(true);
        setTimeout(() => {
            onClose(id);
        }, 300); // Animation duration
    }, [id, onClose]);

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                handleClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, handleClose]);

    const getToastStyles = () => {
        const baseStyles = "relative flex items-start p-4 mb-3 rounded-lg shadow-lg border-l-4 bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out transform";
        
        const typeStyles = {
            success: "border-green-500 text-green-800 dark:text-green-400",
            error: "border-red-500 text-red-800 dark:text-red-400",
            warning: "border-yellow-500 text-yellow-800 dark:text-yellow-400",
            info: "border-blue-500 text-blue-800 dark:text-blue-400",
        };

        const animationStyles = isLeaving
            ? "translate-x-full opacity-0 scale-95"
            : isVisible
            ? "translate-x-0 opacity-100 scale-100"
            : "translate-x-full opacity-0 scale-95";

        return `${baseStyles} ${typeStyles[type]} ${animationStyles}`;
    };

    const getIcon = () => {
        const iconStyles = "flex-shrink-0 w-5 h-5 mr-3 mt-0.5";
        
        switch (type) {
            case 'success':
                return (
                    <svg className={`${iconStyles} text-green-500`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                );
            case 'error':
                return (
                    <svg className={`${iconStyles} text-red-500`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg className={`${iconStyles} text-yellow-500`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                );
            case 'info':
                return (
                    <svg className={`${iconStyles} text-blue-500`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                );
            default:
                return null;
        }
    };

    const getProgressBarColor = () => {
        switch (type) {
            case 'success': return 'bg-green-500';
            case 'error': return 'bg-red-500';
            case 'warning': return 'bg-yellow-500';
            case 'info': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className={getToastStyles()}>
            {getIcon()}
            <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{title}</div>
                {message && (
                    <div className="mt-1 text-sm opacity-80">{message}</div>
                )}
                {duration > 0 && (
                    <div className="absolute bottom-0 left-0 h-1 bg-gray-200 dark:bg-gray-700 w-full rounded-b-lg overflow-hidden">
                        <div 
                            className={`h-full ${getProgressBarColor()} animate-shrink`}
                            style={{ 
                                animation: `shrink ${duration}ms linear forwards` 
                            }}
                        />
                    </div>
                )}
            </div>
            <button
                onClick={handleClose}
                className="flex-shrink-0 ml-3 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Close toast"
            >
                <svg className="w-4 h-4 opacity-60 hover:opacity-100" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};

export default Toast;
