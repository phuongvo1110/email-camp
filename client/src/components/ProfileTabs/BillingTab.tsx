import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";

const BillingTab: React.FC = () => {
    return (
        <div className="space-y-6">
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
};

export default BillingTab;
