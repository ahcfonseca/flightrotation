import { createContext } from "react";
import { useCurrentAircraft } from "../lib/hooks";

type ActiveAircraftContext = {
  currentAircraft: string | null;
  handleAircraftClick: (id: string) => void;
};

export const ActiveAircraftContext =
  createContext<ActiveAircraftContext | null>(null);

interface ActiveAircraftContextProviderProps {
  children: React.ReactNode;
}

export default function ActiveAircraftContextProvider({
  children,
}: ActiveAircraftContextProviderProps) {
  const { currentAircraft, handleAircraftClick } = useCurrentAircraft();

  console.log("currentAircraft", currentAircraft);

  return (
    <ActiveAircraftContext.Provider
      value={{
        currentAircraft,
        handleAircraftClick,
      }}
    >
      {children}
    </ActiveAircraftContext.Provider>
  );
}
