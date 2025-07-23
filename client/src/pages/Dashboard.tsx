import { useRef, useMemo } from "react";
import SurveyModal, { type DialogRef } from "../components/SurveyModal";
import RecentCampaigns from "../components/RecentCampaigns";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import { useFetchSurveysAll } from "../hooks/useSurvey";

export default function Dashboard() {
    const dialog = useRef<DialogRef>(null);

    // Fetch surveys on component mount
    const { isLoading, data: surveys } = useFetchSurveysAll();
    // Calculate dynamic stats from survey data
    const statsData = useMemo(() => {
        if (!surveys || surveys.length === 0) {
            return {
                totalContacts: 0,
                activeCampaigns: 0,
                avgResponseRate: 0,
                scheduledCampaigns: 0,
            };
        }

        // Calculate total contacts (sum of all recipients across surveys)
        const totalContacts = surveys.reduce(
            (sum, survey) => sum + survey.recipients.length,
            0
        );

        // Calculate active campaigns (surveys with responses in last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const activeCampaigns = surveys.filter(
            (survey) =>
                survey.lastResponded &&
                new Date(survey.lastResponded) > thirtyDaysAgo
        ).length;

        // Calculate average response rate
        const totalResponses = surveys.reduce(
            (sum, survey) =>
                sum +
                survey.recipients.filter((recipient) => recipient.responded)
                    .length,
            0
        );
        const avgResponseRate =
            totalContacts > 0 ? (totalResponses / totalContacts) * 100 : 0;

        // Calculate scheduled campaigns (surveys sent in last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const scheduledCampaigns = surveys.filter(
            (survey) => new Date(survey.dateSent) > sevenDaysAgo
        ).length;

        return {
            totalContacts,
            activeCampaigns,
            avgResponseRate: Number(avgResponseRate.toFixed(1)),
            scheduledCampaigns,
        };
    }, [surveys]);

    return (
        <>
            <div className="p-6">
                {/* Header */}
                <Header
                    title="Feedback Campaign Dashboard"
                    description="Create and manage your feedback collection campaigns"
                    handleClick={() => dialog?.current?.open()}
                />
                {/* Stats cards */}
                <div className="grid grid-cols-1 gap-5 mb-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        title="Total Contacts"
                        value={statsData.totalContacts.toLocaleString()}
                        icon="fas fa-users"
                        iconBgColor="bg-blue-50"
                        iconTextColor="text-blue-600"
                        changeValue={
                            isLoading
                                ? "..."
                                : `${surveys?.length ?? 0} surveys`
                        }
                        changeColor="text-blue-600"
                        changeDescription="total campaigns"
                    />
                    <StatsCard
                        title="Active Campaigns"
                        value={statsData.activeCampaigns}
                        icon="fas fa-paper-plane"
                        iconBgColor="bg-green-50"
                        iconTextColor="text-green-600"
                        changeValue={isLoading ? "..." : "+2"}
                        changeColor="text-green-600"
                        changeDescription="from last week"
                    />
                    <StatsCard
                        title="Avg. Response Rate"
                        value={
                            isLoading ? "..." : `${statsData.avgResponseRate}%`
                        }
                        icon="fas fa-chart-line"
                        iconBgColor="bg-purple-50"
                        iconTextColor="text-purple-600"
                        changeValue={
                            statsData.avgResponseRate > 30 ? "+5.2%" : "-1.2%"
                        }
                        changeColor={
                            statsData.avgResponseRate > 30
                                ? "text-green-600"
                                : "text-red-600"
                        }
                        changeDescription="from last campaign"
                    />
                    <StatsCard
                        title="Recent Campaigns"
                        value={statsData.scheduledCampaigns}
                        icon="fas fa-clock"
                        iconBgColor="bg-yellow-50"
                        iconTextColor="text-yellow-600"
                        changeValue={isLoading ? "..." : "+1"}
                        changeColor="text-green-600"
                        changeDescription="in last 7 days"
                    />
                </div>
                {/* Recent campaigns and quick actions */}
                <div className="grid grid-cols-4 gap-5">
                    {/* Recent campaigns */}
                    <RecentCampaigns />
                    {/* Response analytics */}
                    <div className="col-span-2">
                        <div className="p-5 bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-medium text-gray-900">
                                    Response Analytics
                                </h2>
                                <div className="flex space-x-2">
                                    <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                                        7 Days
                                    </button>
                                    <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                                        30 Days
                                    </button>
                                    <button className="px-3 py-1 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark">
                                        90 Days
                                    </button>
                                </div>
                            </div>
                            <div className="h-64">
                                {/* Chart placeholder */}
                                <div className="flex items-center justify-center h-full bg-gray-50 rounded-md">
                                    <div className="text-center">
                                        <i className="fas fa-chart-bar text-4xl text-gray-400 mb-2" />
                                        <p className="text-gray-500">
                                            Response rate data visualization
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-5 mt-4 sm:grid-cols-3">
                                <div className="p-3 bg-gray-50 rounded-md">
                                    <p className="text-sm font-medium text-gray-500">
                                        Avg. Open Rate
                                    </p>
                                    <p className="text-xl font-semibold text-gray-900">
                                        68.2%
                                    </p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-md">
                                    <p className="text-sm font-medium text-gray-500">
                                        Avg. Click Rate
                                    </p>
                                    <p className="text-xl font-semibold text-gray-900">
                                        24.7%
                                    </p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-md">
                                    <p className="text-sm font-medium text-gray-500">
                                        Avg. Completion
                                    </p>
                                    <p className="text-xl font-semibold text-gray-900">
                                        52.1%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SurveyModal ref={dialog} />
        </>
    );
}
