import React from 'react';
import { useToastContext } from '../hooks/useToastContext';

const ToastDemo: React.FC = () => {
    const { showSuccess, showError, showWarning, showInfo, clearAllToasts } = useToastContext();

    const handleShowSuccess = () => {
        showSuccess(
            'Success!',
            'Your action completed successfully.',
            4000
        );
    };

    const handleShowError = () => {
        showError(
            'Error occurred',
            'Something went wrong. Please try again.',
            6000
        );
    };

    const handleShowWarning = () => {
        showWarning(
            'Warning',
            'Please check your input before proceeding.',
            5000
        );
    };

    const handleShowInfo = () => {
        showInfo(
            'Information',
            'Here is some helpful information for you.',
            4000
        );
    };

    const handleShowPersistent = () => {
        showInfo(
            'Persistent Toast',
            'This toast will stay until manually closed.',
            0 // 0 duration means it won't auto-close
        );
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Toast Demo</h2>
            <p className="text-gray-600 mb-6">
                Click the buttons below to see different types of toast notifications:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button
                    onClick={handleShowSuccess}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 font-medium"
                >
                    Show Success
                </button>
                
                <button
                    onClick={handleShowError}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 font-medium"
                >
                    Show Error
                </button>
                
                <button
                    onClick={handleShowWarning}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-200 font-medium"
                >
                    Show Warning
                </button>
                
                <button
                    onClick={handleShowInfo}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
                >
                    Show Info
                </button>
                
                <button
                    onClick={handleShowPersistent}
                    className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-200 font-medium"
                >
                    Persistent Toast
                </button>
                
                <button
                    onClick={clearAllToasts}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 font-medium"
                >
                    Clear All
                </button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h3 className="font-semibold text-gray-800 mb-2">Usage Example:</h3>
                <pre className="text-sm text-gray-600 bg-white p-2 rounded border overflow-x-auto">
{`import { useToastContext } from '../hooks/useToastContext';

const { showSuccess, showError } = useToastContext();

// Show success toast
showSuccess('Success!', 'Operation completed');

// Show error with custom duration
showError('Error', 'Something went wrong', 10000);`}
                </pre>
            </div>
        </div>
    );
};

export default ToastDemo;
