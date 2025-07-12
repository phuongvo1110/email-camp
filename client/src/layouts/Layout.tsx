import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { fetchCurrentUser } from "../stores/slices/authSlice";
import { useAppDispatch } from "../hooks/useHooks";

export default function Layout() {
    const dispatch = useAppDispatch();
    // const { user } = useAppSelector((state: RootState) => state.auth);
    useEffect(() => {
        const fetchUser = () => {
            dispatch(fetchCurrentUser());
        };
        fetchUser();
    }, [dispatch]);
    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-auto custom-scrollbar">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
