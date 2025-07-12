import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64 bg-white border-r border-gray-200">
                <div className="flex items-center justify-center h-16 px-4 bg-primary">
                    <div className="flex items-center">
                        <i className="fas fa-envelope-open-text text-white text-2xl mr-2" />
                        <span className="text-white font-bold text-xl">
                            Emaily
                        </span>
                    </div>
                </div>
                <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
                    <nav className="flex-1 space-y-2">
                        {[
                            {
                                to: "/dashboard",
                                icon: "fas fa-tachometer-alt",
                                label: "Dashboard",
                            },
                            {
                                to: "/campaigns",
                                icon: "fas fa-paper-plane",
                                label: "Campaigns",
                            },
                            {
                                to: "/contacts",
                                icon: "fas fa-users",
                                label: "Contacts",
                            },
                            {
                                to: "/analytics",
                                icon: "fas fa-chart-bar",
                                label: "Analytics",
                            },
                            {
                                to: "/templates",
                                icon: "fas fa-envelope",
                                label: "Templates",
                            },
                            {
                                to: "/settings",
                                icon: "fas fa-cog",
                                label: "Settings",
                            },
                        ].map(({ to, icon, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                                        isActive
                                            ? "bg-primary bg-opacity-20 text-primary"
                                            : "text-gray-600 hover:bg-gray-100"
                                    }`
                                }
                                tabIndex={0}
                            >
                                <i className={`${icon} mr-3`} />
                                {label}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="mt-auto mb-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <i className="fas fa-lightbulb text-blue-500" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-blue-800">
                                        Need help? Check our docs
                                    </p>
                                    <a
                                        href="#"
                                        className="text-xs text-blue-600 hover:underline"
                                    >
                                        Documentation →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
