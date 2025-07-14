import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ToastProvider } from "./contexts/ToastContext";
import router from "./routes";

function App() {
    return (
        <ToastProvider position="top-right">
            <RouterProvider router={router} />
        </ToastProvider>
    );
}

export default App;
