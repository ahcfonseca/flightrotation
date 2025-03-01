import { createContext } from "react";
import { useAircraftSchedule } from "../lib/hooks";
import { AircraftSchedule, Flight } from "../lib/types";

type AircraftScheduleContext = {
  aircraftSchedule: AircraftSchedule[];
  addFlightToSchedule: (id: string, flight: Flight) => void;
};

export const AircraftScheduleContext =
  createContext<AircraftScheduleContext | null>(null);

interface AircraftScheduleContextProviderProps {
  children: React.ReactNode;
}

export default function AircraftScheduleContextProvider({
  children,
}: AircraftScheduleContextProviderProps) {
  const { aircraftSchedule, addFlightToSchedule } = useAircraftSchedule();

  console.log("aircraftSchedule", aircraftSchedule);

  return (
    <AircraftScheduleContext.Provider
      value={{
        aircraftSchedule,
        addFlightToSchedule,
      }}
    >
      {children}
    </AircraftScheduleContext.Provider>
  );
}
