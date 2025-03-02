import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ActiveAircraftContextProvider from "./contexts/ActiveAircraftContextProvider.tsx";
import AircraftScheduleContextProvider from "./contexts/AircraftScheduleContextProvider.tsx";
import AvailableFlightsContextProvider from "./contexts/AvailableFlightsContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ActiveAircraftContextProvider>
        <AvailableFlightsContextProvider>
          <AircraftScheduleContextProvider>
            <App />
          </AircraftScheduleContextProvider>
        </AvailableFlightsContextProvider>
      </ActiveAircraftContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
