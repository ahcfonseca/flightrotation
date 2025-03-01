import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ActiveAircraftContextProvider from "./contexts/ActiveAircraftContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ActiveAircraftContextProvider>
        <App />
      </ActiveAircraftContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
