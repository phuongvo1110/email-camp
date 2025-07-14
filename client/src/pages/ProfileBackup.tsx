import { useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    Input,
    Textarea,
    Avatar,
    Switch,
    Tabs,
    TabsList,
    TabsPanel,
    TabsTrigger,
    Alert,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import type { RootState } from "../stores";

interface ProfileFormData {
    name: string;
    given_name: string;
    family_name: string;
    email: string;
    bio?: string;
    company?: string;
    website?: string;
}

interface NotificationSettings {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    marketingEmails: boolean;
}

const Profile = () => {
    const user = useSelector((state: RootState) => state.auth?.user);

    const [activeTab, setActiveTab] = useState("general");
    const [isEditing, setIsEditing] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"success" | "error">("success");

    // Initialize form data from user profile
    const [profileData, setProfileData] = useState<ProfileFormData>({
        name: user?.profile?.name || "",
        given_name: user?.profile?.given_name || "",
        family_name: user?.profile?.family_name || "",
        email: user?.profile?.email || "",
        bio: "",
        company: "",
        website: "",
    });

    const [notifications, setNotifications] = useState<NotificationSettings>({
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        marketingEmails: false,
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleInputChange = (field: keyof ProfileFormData, value: string) => {
        setProfileData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleNotificationChange = (field: keyof NotificationSettings) => {
        setNotifications((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handlePasswordChange = (field: string, value: string) => {
        setPasswordData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSaveProfile = async () => {
        try {
            // Here you would typically dispatch an action to update the profile
            // dispatch(updateProfile(profileData));

            setAlertMessage("Profile updated successfully!");
            setAlertType("success");
            setShowAlert(true);
            setIsEditing(false);

            setTimeout(() => setShowAlert(false), 3000);
        } catch {
            setAlertMessage("Failed to update profile. Please try again.");
            setAlertType("error");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setAlertMessage("New passwords don't match!");
            setAlertType("error");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }

        try {
            // Here you would typically dispatch an action to change password
            // dispatch(changePassword(passwordData));

            setAlertMessage("Password changed successfully!");
            setAlertType("success");
            setShowAlert(true);
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            setTimeout(() => setShowAlert(false), 3000);
        } catch {
            setAlertMessage("Failed to change password. Please try again.");
            setAlertType("error");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    const renderGeneralTab = () => (
        <div className="space-y-6">
            <div className="flex items-center space-x-6">
                <Avatar
                    src={user?.profile?.picture || "/api/placeholder/100/100"}
                    alt="Profile"
                    size="xl"
                    className="ring-4 ring-blue-50"
                />
                <div>
                    <Typography variant="h6" className="mb-2">
                        Profile Picture
                    </Typography>
                    <div className="flex space-x-2">
                        <Button size="sm" color="primary">
                            Change Photo
                        </Button>
                        <Button size="sm" variant="outline" color="error">
                            Remove
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Typography className="mb-2 font-medium">
                        First Name
                    </Typography>
                    <Input
                        value={profileData.given_name}
                        onChange={(e) =>
                            handleInputChange("given_name", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full"
                    />
                </div>
                <div>
                    <Typography className="mb-2 font-medium">
                        Last Name
                    </Typography>
                    <Input
                        value={profileData.family_name}
                        onChange={(e) =>
                            handleInputChange("family_name", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full"
                    />
                </div>
                <div className="md:col-span-2">
                    <Typography className="mb-2 font-medium">
                        Full Name
                    </Typography>
                    <Input
                        value={profileData.name}
                        onChange={(e) =>
                            handleInputChange("name", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full"
                    />
                </div>
                <div className="md:col-span-2">
                    <Typography className="mb-2 font-medium">
                        Email Address
                    </Typography>
                    <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                            handleInputChange("email", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full"
                    />
                </div>
                <div className="md:col-span-2">
                    <Typography className="mb-2 font-medium">
                        Company
                    </Typography>
                    <Input
                        value={profileData.company || ""}
                        onChange={(e) =>
                            handleInputChange("company", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full"
                        placeholder="Your company name"
                    />
                </div>
                <div className="md:col-span-2">
                    <Typography className="mb-2 font-medium">
                        Website
                    </Typography>
                    <Input
                        value={profileData.website || ""}
                        onChange={(e) =>
                            handleInputChange("website", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full"
                        placeholder="https://your-website.com"
                    />
                </div>
                <div className="md:col-span-2">
                    <Typography className="mb-2 font-medium">Bio</Typography>
                    <Textarea
                        value={profileData.bio || ""}
                        onChange={(e) =>
                            handleInputChange("bio", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full"
                        rows={4}
                        placeholder="Tell us about yourself..."
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                {isEditing ? (
                    <>
                        <Button
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                        <Button color="primary" onClick={handleSaveProfile}>
                            Save Changes
                        </Button>
                    </>
                ) : (
                    <Button color="primary" onClick={() => setIsEditing(true)}>
                        Edit Profile
                    </Button>
                )}
            </div>
        </div>
    );

    const renderSecurityTab = () => (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <Typography variant="h6">Change Password</Typography>
                </CardHeader>
                <CardBody className="space-y-4">
                    <div>
                        <Typography className="mb-2 font-medium">
                            Current Password
                        </Typography>
                        <Input
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) =>
                                handlePasswordChange(
                                    "currentPassword",
                                    e.target.value
                                )
                            }
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Typography className="mb-2 font-medium">
                            New Password
                        </Typography>
                        <Input
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) =>
                                handlePasswordChange(
                                    "newPassword",
                                    e.target.value
                                )
                            }
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Typography className="mb-2 font-medium">
                            Confirm New Password
                        </Typography>
                        <Input
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) =>
                                handlePasswordChange(
                                    "confirmPassword",
                                    e.target.value
                                )
                            }
                            className="w-full"
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button
                            color="primary"
                            onClick={handleChangePassword}
                            disabled={
                                !passwordData.currentPassword ||
                                !passwordData.newPassword ||
                                !passwordData.confirmPassword
                            }
                        >
                            Change Password
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader>
                    <Typography variant="h6">Account Security</Typography>
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

    const renderNotificationsTab = () => (
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
                                handleNotificationChange("emailNotifications")
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
                                handleNotificationChange("smsNotifications")
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
                                handleNotificationChange("pushNotifications")
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
                                handleNotificationChange("marketingEmails")
                            }
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    );

    const renderBillingTab = () => (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <Typography variant="h6">Current Plan</Typography>
                </CardHeader>
                <CardBody>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <Typography className="font-medium text-lg">
                                Free Plan
                            </Typography>
                            <Typography
                                variant="small"
                                className="text-gray-600"
                            >
                                {user?.credits || 0} credits remaining
                            </Typography>
                        </div>
                        <Button color="primary" size="sm">
                            Upgrade Plan
                        </Button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <Typography variant="small" className="text-gray-600">
                            Your current plan includes {user?.credits || 0}{" "}
                            email credits. Upgrade to get more credits and
                            access to premium features.
                        </Typography>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader>
                    <Typography variant="h6">Billing History</Typography>
                </CardHeader>
                <CardBody>
                    <div className="text-center py-8">
                        <Typography className="text-gray-600">
                            No billing history available.
                        </Typography>
                        <Typography
                            variant="small"
                            className="text-gray-500 mt-2"
                        >
                            When you upgrade your plan, your billing history
                            will appear here.
                        </Typography>
                    </div>
                </CardBody>
            </Card>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto">
                {showAlert && (
                    <Alert
                        color={alertType === "success" ? "success" : "error"}
                        className="mb-6"
                        open={showAlert}
                    >
                        <div className="flex items-center justify-between">
                            <span>{alertMessage}</span>
                            <button
                                onClick={() => setShowAlert(false)}
                                className="ml-4 p-1 rounded-full hover:bg-black/10 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </Alert>
                )}

                <div className="mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Profile Settings
                        </h1>
                        <p className="text-gray-600">
                            Manage your account settings and preferences
                        </p>
                    </div>
                </div>

                <Card>
                    <CardBody>
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="general">
                                    General
                                </TabsTrigger>
                                <TabsTrigger value="security">
                                    Security
                                </TabsTrigger>
                                <TabsTrigger value="notifications">
                                    Notifications
                                </TabsTrigger>
                                <TabsTrigger value="billing">
                                    Billing
                                </TabsTrigger>
                            </TabsList>

                            <div className="mt-6">
                                <TabsPanel value="general">
                                    {renderGeneralTab()}
                                </TabsPanel>
                                <TabsPanel value="security">
                                    {renderSecurityTab()}
                                </TabsPanel>
                                <TabsPanel value="notifications">
                                    {renderNotificationsTab()}
                                </TabsPanel>
                                <TabsPanel value="billing">
                                    {renderBillingTab()}
                                </TabsPanel>
                            </div>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
