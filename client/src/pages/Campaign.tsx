export default function Campaign() {
    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col justify-between mb-6 space-y-4 md:flex-row md:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Campaigns
                    </h1>
                    <p className="text-gray-600">
                        Manage all your feedback campaigns in one place
                    </p>
                </div>
                <div className="flex space-x-3">
                    <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        <i className="fas fa-filter mr-2" /> Filter
                    </button>
                    <button
                        id="newCampaignBtn"
                        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        <i className="fas fa-plus mr-2" /> New Campaign
                    </button>
                </div>
            </div>
            {/* Campaign status tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <a
                        href="#"
                        className="border-primary text-primary whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                    >
                        All Campaigns
                    </a>
                    <a
                        href="#"
                        className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                    >
                        Active
                    </a>
                    <a
                        href="#"
                        className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                    >
                        Drafts
                    </a>
                    <a
                        href="#"
                        className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                    >
                        Scheduled
                    </a>
                    <a
                        href="#"
                        className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                    >
                        Completed
                    </a>
                </nav>
            </div>
            {/* Recent campaigns and quick actions */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Recent campaigns */}
                <div className="lg:col-span-3">
                    <div className="p-5 bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium text-gray-900">
                                All Campaigns
                            </h2>
                            <div className="relative">
                                <input
                                    className="block w-full py-2 pl-10 pr-3 text-sm bg-gray-100 border border-transparent rounded-md focus:bg-white focus:border-gray-300 focus:outline-none"
                                    placeholder="Search campaigns..."
                                />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <i className="fas fa-search text-gray-400" />
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
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
                                                <span className="truncate">
                                                    NPS Survey
                                                </span>
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
                            <div className="mt-6">
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
                                                    Response rate data
                                                    visualization
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
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Campaign
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Audience
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Responses
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Last Sent
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative px-6 py-3"
                                        >
                                            <span className="sr-only">
                                                Actions
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* Quick actions */}
                                    {/* Response analytics */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
