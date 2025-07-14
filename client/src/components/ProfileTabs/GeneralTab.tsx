import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    Input,
    Textarea,
} from "@material-tailwind/react";

interface ProfileFormData {
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    company: string;
    phone: string;
}

interface GeneralTabProps {
    profileData: ProfileFormData;
    isEditing: boolean;
    onInputChange: (field: keyof ProfileFormData, value: string) => void;
    onSave: () => void;
    onCancel: () => void;
    onEdit: () => void;
}

const GeneralTab: React.FC<GeneralTabProps> = ({
    profileData,
    isEditing,
    onInputChange,
    onSave,
    onCancel,
    onEdit,
}) => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <Typography variant="h6">Personal Information</Typography>
                        {!isEditing ? (
                            <Button
                                size="sm"
                                color="success"
                                variant="outline"
                                onClick={onEdit}
                            >
                                Edit Profile
                            </Button>
                        ) : (
                            <div className="space-x-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                                <Button size="sm" color="primary" onClick={onSave}>
                                    Save Changes
                                </Button>
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardBody className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Typography
                                variant="small"
                                className="mb-2 font-medium"
                            >
                                First Name
                            </Typography>
                            <Input
                                value={profileData.firstName}
                                onChange={(e) =>
                                    onInputChange("firstName", e.target.value)
                                }
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <Typography
                                variant="small"
                                className="mb-2 font-medium"
                            >
                                Last Name
                            </Typography>
                            <Input
                                value={profileData.lastName}
                                onChange={(e) =>
                                    onInputChange("lastName", e.target.value)
                                }
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div>
                        <Typography variant="small" className="mb-2 font-medium">
                            Email Address
                        </Typography>
                        <Input
                            type="email"
                            value={profileData.email}
                            onChange={(e) =>
                                onInputChange("email", e.target.value)
                            }
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Typography
                                variant="small"
                                className="mb-2 font-medium"
                            >
                                Company
                            </Typography>
                            <Input
                                value={profileData.company}
                                onChange={(e) =>
                                    onInputChange("company", e.target.value)
                                }
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <Typography
                                variant="small"
                                className="mb-2 font-medium"
                            >
                                Phone Number
                            </Typography>
                            <Input
                                value={profileData.phone}
                                onChange={(e) =>
                                    onInputChange("phone", e.target.value)
                                }
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div>
                        <Typography variant="small" className="mb-2 font-medium">
                            Bio
                        </Typography>
                        <Textarea
                            value={profileData.bio}
                            onChange={(e) =>
                                onInputChange("bio", e.target.value)
                            }
                            disabled={!isEditing}
                            rows={4}
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default GeneralTab;
