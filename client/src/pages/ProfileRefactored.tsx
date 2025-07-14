import { useState } from "react";
import {
    Card,
    CardBody,
    Typography,
    Avatar,
    Tabs,
    TabsList,
    TabsPanel,
    TabsTrigger,
    Alert,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import type { RootState } from "../stores";
import { useProfileForm } from "../hooks/useProfileForm";
import { useAlert } from "../hooks/useAlert";
import { useNotificationSettings } from "../hooks/useNotificationSettings";
import GeneralTab from "../components/ProfileTabs/GeneralTab";
import SecurityTab from "../components/ProfileTabs/SecurityTab";
import NotificationsTab from "../components/ProfileTabs/NotificationsTab";
import BillingTab from "../components/ProfileTabs/BillingTab";

const Profile = () => {
    const user = useSelector((state: RootState) => state.auth?.user);
    const [activeTab, setActiveTab] = useState("general");

    // Custom hooks for form management
    const {
        profileData,
        isEditing,
        setIsEditing,
        passwordData,
        handleProfileInputChange,
        handlePasswordInputChange,
        resetPasswordForm,
        validatePasswordForm,
    } = useProfileForm(user);

    const { notifications, handleNotificationChange } = useNotificationSettings();
    
    const {
        showAlert,
        alertMessage,
        alertType,
        showSuccessAlert,
        showErrorAlert,
        hideAlert,
    } = useAlert();

    // Profile save handler
    const handleProfileSave = async () => {
        try {
            // TODO: Implement API call to update profile
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            
            showSuccessAlert("Profile updated successfully!");
            setIsEditing(false);
        } catch {
            showErrorAlert("Failed to update profile. Please try again.");
        }
    };

    // Profile edit handler
    const handleProfileEdit = () => {
        setIsEditing(true);
    };

    // Profile cancel handler  
    const handleProfileCancel = () => {
        setIsEditing(false);
        // TODO: Reset form data to original values
    };

    // Password save handler
    const handlePasswordSave = async () => {
        const validationError = validatePasswordForm();
        if (validationError) {
            showErrorAlert(validationError);
            return;
        }

        try {
            // TODO: Implement API call to change password
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            
            showSuccessAlert("Password updated successfully!");
            resetPasswordForm();
        } catch {
            showErrorAlert("Failed to change password. Please try again.");
        }
    };

    const tabsConfig = [
        { id: "general", label: "General", icon: "fas fa-user" },
        { id: "security", label: "Security", icon: "fas fa-shield-alt" },
        { id: "notifications", label: "Notifications", icon: "fas fa-bell" },
        { id: "billing", label: "Billing", icon: "fas fa-credit-card" },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "general":
                return (
                    <GeneralTab
                        profileData={profileData}
                        isEditing={isEditing}
                        onInputChange={handleProfileInputChange}
                        onSave={handleProfileSave}
                        onCancel={handleProfileCancel}
                        onEdit={handleProfileEdit}
                    />
                );
            case "security":
                return (
                    <SecurityTab
                        passwordData={passwordData}
                        onPasswordInputChange={handlePasswordInputChange}
                        onPasswordSave={handlePasswordSave}
                        onPasswordReset={resetPasswordForm}
                    />
                );
            case "notifications":
                return (
                    <NotificationsTab
                        notifications={notifications}
                        onNotificationChange={handleNotificationChange}
                    />
                );
            case "billing":
                return <BillingTab />;
            default:
                return null;
        }
    };

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
                                onClick={hideAlert}
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
                        <Typography variant="h4" className="font-bold text-gray-900">
                            Profile Settings
                        </Typography>
                        <Typography className="text-gray-600 mt-1">
                            Manage your account settings and preferences
                        </Typography>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Profile Summary Card */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardBody className="text-center">
                                <Avatar
                                    size="xxl"
                                    src={user?.profile?.picture}
                                    alt="Profile"
                                    className="mx-auto mb-4"
                                />
                                <Typography variant="h6" className="mb-1">
                                    {user?.profile?.name || "User"}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="text-gray-600 mb-4"
                                >
                                    {user?.profile?.email}
                                </Typography>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <Typography
                                        variant="small"
                                        className="text-gray-500 mb-1"
                                    >
                                        Credits Remaining
                                    </Typography>
                                    <Typography variant="h6" className="text-primary">
                                        {user?.credits || 0}
                                    </Typography>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-4">
                                {tabsConfig.map((tab) => (
                                    <TabsTrigger key={tab.id} value={tab.id}>
                                        <div className="flex items-center space-x-2">
                                            <i className={`${tab.icon} text-sm`} />
                                            <span className="hidden sm:inline">{tab.label}</span>
                                        </div>
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {tabsConfig.map((tab) => (
                                <TabsPanel key={tab.id} value={tab.id} className="mt-6">
                                    {renderTabContent()}
                                </TabsPanel>
                            ))}
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
