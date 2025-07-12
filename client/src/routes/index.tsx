import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Dashboard from "../pages/Dashboard";
import AuthLayout from "../layouts/AuthLayout";
import Campaign from "../pages/Campaign";
import ProtectedRoute from "./ProtectedRoute";
import Landing from "../pages/Landing";
import Success from "../pages/Success";
import PricingPlans from "../pages/PricingPlans";

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
]);
export default router;
