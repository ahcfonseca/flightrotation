import { createContext, useEffect, useState } from "react";
import { useAvailableFlights } from "../lib/hooks";
import { Flight } from "../lib/types";

type AvailableFlightsContext = {
  availableFlights: Flight[] | null;
  revertFlight: (flight: Flight) => void;
  removeFlightFromList: (flightId: string) => void;
  status: string;
};

export const AvailableFlightsContext =
  createContext<AvailableFlightsContext | null>(null);

interface AvailableFlightsContextProviderProps {
  children: React.ReactNode;
}

export default function AvailableFlightsContextProvider({
  children,
}: AvailableFlightsContextProviderProps) {
  const { flights, status } = useAvailableFlights();

  const [availableFlights, setAvailableFlights] = useState<Flight[] | null>(
    null
  );

  useEffect(() => {
    if (flights) {
      setAvailableFlights(flights);
    }
  }, [flights]);

  const revertFlight = (flight: Flight) => {
    if (availableFlights) {
      setAvailableFlights([...availableFlights, flight]);
    }
  };

  const removeFlightFromList = (flightId: string) => {
    if (availableFlights) {
      setAvailableFlights(
        availableFlights.filter((flight) => flight.ident !== flightId)
      );
    }
  };

  return (
    <AvailableFlightsContext.Provider
      value={{
        availableFlights,
        revertFlight,
        removeFlightFromList,
        status,
      }}
    >
      {children}
    </AvailableFlightsContext.Provider>
  );
}
