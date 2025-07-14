import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/useHooks";
import type { RootState } from "../../stores";

export default function ProtectedRoute() {
    const { user, loading } = useAppSelector((state: RootState) => state.auth);

    if (loading) {
        return <div className="w-full h-full flex items-center justify-center"><span className="loader"></span></div>;
    }
    return user ? <Outlet /> : <Navigate to="/auth" />;
}
