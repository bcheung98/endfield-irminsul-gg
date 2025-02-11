import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import store from "./rtk/store.ts";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </HelmetProvider>
);
