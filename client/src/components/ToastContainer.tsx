import React from 'react';
import { createPortal } from 'react-dom';
import Toast, { type ToastProps } from './Toast';

interface ToastContainerProps {
    toasts: ToastProps[];
    onClose: (id: string) => void;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const ToastContainer: React.FC<ToastContainerProps> = ({
    toasts,
    onClose,
    position = 'top-right',
}) => {
    const getPositionStyles = () => {
        const baseStyles = "fixed z-50 flex flex-col pointer-events-none";
        
        switch (position) {
            case 'top-right':
                return `${baseStyles} top-4 right-4 items-end`;
            case 'top-left':
                return `${baseStyles} top-4 left-4 items-start`;
            case 'bottom-right':
                return `${baseStyles} bottom-4 right-4 items-end`;
            case 'bottom-left':
                return `${baseStyles} bottom-4 left-4 items-start`;
            case 'top-center':
                return `${baseStyles} top-4 left-1/2 transform -translate-x-1/2 items-center`;
            case 'bottom-center':
                return `${baseStyles} bottom-4 left-1/2 transform -translate-x-1/2 items-center`;
            default:
                return `${baseStyles} top-4 right-4 items-end`;
        }
    };

    if (toasts.length === 0) return null;

    const toastContainer = (
        <div className={getPositionStyles()}>
            <div className="max-w-sm w-full space-y-2 pointer-events-auto">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onClose={onClose}
                    />
                ))}
            </div>
        </div>
    );

    // Create portal to render toasts at the top level of the DOM
    const portalContainer = document.getElementById('toast-root') || document.body;
    return createPortal(toastContainer, portalContainer);
};

export default ToastContainer;
