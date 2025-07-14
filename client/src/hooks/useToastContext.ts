import { useContext } from 'react';
import { ToastContext, type ToastContextType } from '../contexts/ToastContextTypes';

export function useToastContext(): ToastContextType {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToastContext must be used within a ToastProvider');
    }
    return context;
}
