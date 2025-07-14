import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    Input,
    Switch,
} from "@material-tailwind/react";

interface PasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface SecurityTabProps {
    passwordData: PasswordFormData;
    onPasswordInputChange: (field: keyof PasswordFormData, value: string) => void;
    onPasswordSave: () => void;
    onPasswordReset: () => void;
}

const SecurityTab: React.FC<SecurityTabProps> = ({
    passwordData,
    onPasswordInputChange,
    onPasswordSave,
    onPasswordReset,
}) => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <Typography variant="h6">Change Password</Typography>
                </CardHeader>
                <CardBody className="space-y-4">
                    <div>
                        <Typography variant="small" className="mb-2 font-medium">
                            Current Password
                        </Typography>
                        <Input
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) =>
                                onPasswordInputChange("currentPassword", e.target.value)
                            }
                            placeholder="Enter current password"
                        />
                    </div>
                    <div>
                        <Typography variant="small" className="mb-2 font-medium">
                            New Password
                        </Typography>
                        <Input
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) =>
                                onPasswordInputChange("newPassword", e.target.value)
                            }
                            placeholder="Enter new password"
                        />
                    </div>
                    <div>
                        <Typography variant="small" className="mb-2 font-medium">
                            Confirm New Password
                        </Typography>
                        <Input
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) =>
                                onPasswordInputChange("confirmPassword", e.target.value)
                            }
                            placeholder="Confirm new password"
                        />
                    </div>
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            onClick={onPasswordReset}
                        >
                            Reset
                        </Button>
                        <Button color="primary" onClick={onPasswordSave}>
                            Update Password
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader>
                    <Typography variant="h6">Security Settings</Typography>
                </CardHeader>
                <CardBody className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Typography className="font-medium">
                                Two-Factor Authentication
                            </Typography>
                            <Typography
                                variant="small"
                                className="text-gray-600"
                            >
                                Add an extra layer of security to your account
                            </Typography>
                        </div>
                        <Switch color="primary" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <Typography className="font-medium">
                                Login Notifications
                            </Typography>
                            <Typography
                                variant="small"
                                className="text-gray-600"
                            >
                                Get notified when someone signs into your
                                account
                            </Typography>
                        </div>
                        <Switch color="primary" defaultChecked />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default SecurityTab;
