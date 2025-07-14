import { useState } from 'react';

interface NotificationSettings {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    marketingEmails: boolean;
}

interface UseNotificationSettingsReturn {
    notifications: NotificationSettings;
    handleNotificationChange: (key: keyof NotificationSettings) => void;
}

export const useNotificationSettings = (): UseNotificationSettingsReturn => {
    const [notifications, setNotifications] = useState<NotificationSettings>({
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        marketingEmails: false,
    });

    const handleNotificationChange = (key: keyof NotificationSettings) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return {
        notifications,
        handleNotificationChange,
    };
};
