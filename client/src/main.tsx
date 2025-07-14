import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";
import store from "./stores/index.ts";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import vi from "javascript-time-ago/locale/vi";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(vi);
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
