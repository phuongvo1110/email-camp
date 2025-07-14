import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Switch,
} from "@material-tailwind/react";

interface NotificationSettings {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    marketingEmails: boolean;
}

interface NotificationsTabProps {
    notifications: NotificationSettings;
    onNotificationChange: (key: keyof NotificationSettings) => void;
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({
    notifications,
    onNotificationChange,
}) => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <Typography variant="h6">
                        Notification Preferences
                    </Typography>
                </CardHeader>
                <CardBody className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Typography className="font-medium">
                                Email Notifications
                            </Typography>
                            <Typography
                                variant="small"
                                className="text-gray-600"
                            >
                                Receive notifications via email
                            </Typography>
                        </div>
                        <Switch
                            color="primary"
                            checked={notifications.emailNotifications}
                            onChange={() =>
                                onNotificationChange("emailNotifications")
                            }
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <Typography className="font-medium">
                                SMS Notifications
                            </Typography>
                            <Typography
                                variant="small"
                                className="text-gray-600"
                            >
                                Receive notifications via SMS
                            </Typography>
                        </div>
                        <Switch
                            color="primary"
                            checked={notifications.smsNotifications}
                            onChange={() =>
                                onNotificationChange("smsNotifications")
                            }
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <Typography className="font-medium">
                                Push Notifications
                            </Typography>
                            <Typography
                                variant="small"
                                className="text-gray-600"
                            >
                                Receive push notifications in your browser
                            </Typography>
                        </div>
                        <Switch
                            color="primary"
                            checked={notifications.pushNotifications}
                            onChange={() =>
                                onNotificationChange("pushNotifications")
                            }
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <Typography className="font-medium">
                                Marketing Emails
                            </Typography>
                            <Typography
                                variant="small"
                                className="text-gray-600"
                            >
                                Receive updates about new features and offers
                            </Typography>
                        </div>
                        <Switch
                            color="primary"
                            checked={notifications.marketingEmails}
                            onChange={() =>
                                onNotificationChange("marketingEmails")
                            }
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default NotificationsTab;
