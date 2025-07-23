import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ToastProvider } from "./contexts/ToastContext";
import router from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastProvider position="top-right">
                <RouterProvider router={router} />
            </ToastProvider>
        </QueryClientProvider>
    );
}

export default App;
