import React, { type ReactNode } from 'react';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/ToastContainer';
import { ToastContext } from './ToastContextTypes';

interface ToastProviderProps {
    children: ReactNode;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
    children,
    position = 'top-right',
}) => {
    const toastHook = useToast();

    return (
        <ToastContext.Provider value={toastHook}>
            {children}
            <ToastContainer
                toasts={toastHook.toasts}
                onClose={toastHook.hideToast}
                position={position}
            />
        </ToastContext.Provider>
    );
};
