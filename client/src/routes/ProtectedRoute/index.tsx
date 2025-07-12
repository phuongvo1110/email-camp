import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/useHooks";
import type { RootState } from "../../stores";

export default function ProtectedRoute() {
    const { user, loading } = useAppSelector((state: RootState) => state.auth);

    if (loading) {
        return <span className="loader"></span>;
    }
    return user ? <Outlet /> : <Navigate to="/auth" />;
}
