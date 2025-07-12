export default function Dashboard() {
    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col justify-between mb-6 space-y-4 md:flex-row md:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Feedback Campaign Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Create and manage your feedback collection campaigns
                    </p>
                </div>
                <button
                    id="newCampaignBtn"
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    <i className="fas fa-plus mr-2" /> New Campaign
                </button>
            </div>
            {/* Stats cards */}
            <div className="grid grid-cols-1 gap-5 mb-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="p-5 bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm font-medium text-gray-500 truncate">
                                Total Contacts
                            </div>
                            <div className="mt-1 text-3xl font-semibold text-gray-900">
                                12,548
                            </div>
                        </div>
                        <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                            <i className="fas fa-users" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="text-sm font-medium text-green-600">
                            +12.5%
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                            from last month
                        </span>
                    </div>
                </div>
                <div className="p-5 bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm font-medium text-gray-500 truncate">
                                Active Campaigns
                            </div>
                            <div className="mt-1 text-3xl font-semibold text-gray-900">
                                8
                            </div>
                        </div>
                        <div className="p-3 rounded-full bg-green-50 text-green-600">
                            <i className="fas fa-paper-plane" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="text-sm font-medium text-green-600">
                            +2
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                            from last week
                        </span>
                    </div>
                </div>
                <div className="p-5 bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm font-medium text-gray-500 truncate">
                                Avg. Response Rate
                            </div>
                            <div className="mt-1 text-3xl font-semibold text-gray-900">
                                32.4%
                            </div>
                        </div>
                        <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                            <i className="fas fa-chart-line" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="text-sm font-medium text-red-600">
                            -1.2%
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                            from last campaign
                        </span>
                    </div>
                </div>
                <div className="p-5 bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm font-medium text-gray-500 truncate">
                                Scheduled
                            </div>
                            <div className="mt-1 text-3xl font-semibold text-gray-900">
                                3
                            </div>
                        </div>
                        <div className="p-3 rounded-full bg-yellow-50 text-yellow-600">
                            <i className="fas fa-clock" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="text-sm font-medium text-green-600">
                            +1
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                            new scheduled
                        </span>
                    </div>
                </div>
            </div>
            {/* Recent campaigns and quick actions */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Recent campaigns */}
                <div className="lg:col-span-2">
                    <div className="p-5 bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium text-gray-900">
                                Recent Campaigns
                            </h2>
                            <a
                                href="#"
                                className="text-sm font-medium text-primary hover:text-primary-dark"
                            >
                                View all
                            </a>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                                <div className="flex-shrink-0 p-2 mt-1 mr-3 rounded-full bg-green-100 text-green-600">
                                    <i className="fas fa-check-circle" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        Product Satisfaction Survey
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Sent to 2,450 contacts
                                    </p>
                                    <div className="mt-1">
                                        <div className="flex items-center text-xs text-gray-500">
                                            <span>42% response rate</span>
                                            <span className="mx-1">•</span>
                                            <span>2 days ago</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <button className="p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none">
                                        <i className="fas fa-ellipsis-v" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                                <div className="flex-shrink-0 p-2 mt-1 mr-3 rounded-full bg-blue-100 text-blue-600">
                                    <i className="fas fa-spinner fa-pulse" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        Customer Support Feedback
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Sending to 5,200 contacts
                                    </p>
                                    <div className="mt-1">
                                        <div className="flex items-center text-xs text-gray-500">
                                            <span>In progress (35%)</span>
                                            <span className="mx-1">•</span>
                                            <span>1 hour ago</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <button className="p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none">
                                        <i className="fas fa-ellipsis-v" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                                <div className="flex-shrink-0 p-2 mt-1 mr-3 rounded-full bg-yellow-100 text-yellow-600">
                                    <i className="fas fa-clock" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        Website Experience Survey
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Scheduled for 1,800 contacts
                                    </p>
                                    <div className="mt-1">
                                        <div className="flex items-center text-xs text-gray-500">
                                            <span>Scheduled for May 15</span>
                                            <span className="mx-1">•</span>
                                            <span>Tomorrow at 10:00 AM</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <button className="p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none">
                                        <i className="fas fa-ellipsis-v" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Quick actions */}
                <div>
                    <div className="p-5 bg-white rounded-lg shadow">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">
                            Quick Actions
                        </h2>
                        <div className="space-y-3">
                            <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-left text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 focus:outline-none">
                                <i className="fas fa-upload mr-3 text-gray-500" />
                                Import Contacts
                            </button>
                            <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-left text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 focus:outline-none">
                                <i className="fas fa-file-alt mr-3 text-gray-500" />
                                Use Template
                            </button>
                            <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-left text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 focus:outline-none">
                                <i className="fas fa-filter mr-3 text-gray-500" />
                                Segment Audience
                            </button>
                            <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-left text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 focus:outline-none">
                                <i className="fas fa-chart-pie mr-3 text-gray-500" />
                                View Reports
                            </button>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                                Recent Templates
                            </h3>
                            <div className="space-y-2">
                                <a
                                    href="#"
                                    className="group flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-50"
                                >
                                    <span className="truncate">NPS Survey</span>
                                    <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 group-hover:bg-green-200">
                                        <i className="fas fa-star mr-1 text-xs" />{" "}
                                        4.8
                                    </span>
                                </a>
                                <a
                                    href="#"
                                    className="group flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-50"
                                >
                                    <span className="truncate">
                                        Product Feedback
                                    </span>
                                    <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 group-hover:bg-blue-200">
                                        Popular
                                    </span>
                                </a>
                                <a
                                    href="#"
                                    className="group flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-50"
                                >
                                    <span className="truncate">
                                        Customer Satisfaction
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Response analytics */}
            <div className="mt-6 mb-3">
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
    );
}
