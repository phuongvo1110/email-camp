import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Dashboard from "../pages/Dashboard";
import AuthLayout from "../layouts/AuthLayout";
import Campaign from "../pages/Campaign";
import ProtectedRoute from "./ProtectedRoute";
import Landing from "../pages/Landing";
import Success from "../pages/Success";
import PricingPlans from "../pages/PricingPlans";
import Thanks from "../pages/Thanks";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/",
                        element: <Landing />,
                    },
                    {
                        path: "dashboard",
                        element: <Dashboard />,
                    },
                    {
                        path: "campaigns",
                        element: <Campaign />,
                    },
                    {
                        path: "pricingplans",
                        element: <PricingPlans />,
                    },
                    { path: "profile", element: <Profile /> },
                ],
            },
        ],
    },
    {
        path: "/auth",
        element: <AuthLayout />,
    },
    {
        path: "/success",
        element: <Success />,
    },
    {
        path: "/thanks",
        element: <Thanks />,
    },
]);
export default router;
