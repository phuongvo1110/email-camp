import { useState } from 'react';
import type { User } from '../models/user';

interface ProfileFormData {
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    company: string;
    phone: string;
}

interface PasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface UseProfileFormReturn {
    // Profile form state
    profileData: ProfileFormData;
    setProfileData: React.Dispatch<React.SetStateAction<ProfileFormData>>;
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    
    // Password form state
    passwordData: PasswordFormData;
    setPasswordData: React.Dispatch<React.SetStateAction<PasswordFormData>>;
    
    // Form handlers
    handleProfileInputChange: (field: keyof ProfileFormData, value: string) => void;
    handlePasswordInputChange: (field: keyof PasswordFormData, value: string) => void;
    resetPasswordForm: () => void;
    
    // Validation
    validatePasswordForm: () => string | null;
}

export const useProfileForm = (user: User | null): UseProfileFormReturn => {
    // Initialize form data from user profile
    const [profileData, setProfileData] = useState<ProfileFormData>({
        firstName: user?.profile?.given_name || "",
        lastName: user?.profile?.family_name || "",
        email: user?.profile?.email || "",
        bio: "", // Not available in current model
        company: "", // Not available in current model
        phone: "", // Not available in current model
    });

    const [passwordData, setPasswordData] = useState<PasswordFormData>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleProfileInputChange = (field: keyof ProfileFormData, value: string) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };

    const handlePasswordInputChange = (field: keyof PasswordFormData, value: string) => {
        setPasswordData(prev => ({ ...prev, [field]: value }));
    };

    const resetPasswordForm = () => {
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    const validatePasswordForm = (): string | null => {
        if (!passwordData.currentPassword.trim()) {
            return "Current password is required.";
        }
        if (!passwordData.newPassword.trim()) {
            return "New password is required.";
        }
        if (passwordData.newPassword.length < 6) {
            return "New password must be at least 6 characters long.";
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            return "New password and confirmation do not match.";
        }
        return null;
    };

    return {
        profileData,
        setProfileData,
        isEditing,
        setIsEditing,
        passwordData,
        setPasswordData,
        handleProfileInputChange,
        handlePasswordInputChange,
        resetPasswordForm,
        validatePasswordForm,
    };
};
