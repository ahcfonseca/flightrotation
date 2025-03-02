import { createContext } from "react";
import { useAircraftSchedule, useAvailableFlightsContext } from "../lib/hooks";
import { AircraftSchedule, Flight } from "../lib/types";

type AircraftScheduleContext = {
  aircraftSchedule: AircraftSchedule[];
  addFlightToSchedule: (id: string, flight: Flight) => void;
  removeFlightFromSchedule: (id: string, flight: Flight) => void;
};

export const AircraftScheduleContext =
  createContext<AircraftScheduleContext | null>(null);

interface AircraftScheduleContextProviderProps {
  children: React.ReactNode;
}

export default function AircraftScheduleContextProvider({
  children,
}: AircraftScheduleContextProviderProps) {
  const { aircraftSchedule, setAircraftSchedule } = useAircraftSchedule();
  const { removeFlightFromList, revertFlight } = useAvailableFlightsContext();

  const isFlightOverlapping = (
    existingFlights: Flight[],
    newFlight: Flight
  ) => {
    return existingFlights.some((f) => {
      const adjustedArrivalTime = f.arrivaltime + 1200; // 20 minutes for turnaround time
      const overlap =
        (newFlight.departuretime >= f.departuretime &&
          newFlight.departuretime <= adjustedArrivalTime) ||
        (newFlight.arrivaltime >= f.departuretime &&
          newFlight.arrivaltime <= adjustedArrivalTime);
      if (overlap) {
        alert("Flight overlaps with another flight for this aircraft");
        return true;
      }
      return false;
    });
  };

  const updateAircraftSchedule = (updatedAircraft: AircraftSchedule) => {
    const updatedSchedule = aircraftSchedule.map((aircraft) =>
      aircraft.ident === updatedAircraft.ident ? updatedAircraft : aircraft
    );
    setAircraftSchedule(updatedSchedule);
  };

  const addFlightToSchedule = (id: string, flight: Flight) => {
    const existingAircraft = aircraftSchedule.find(
      (aircraft) => aircraft.ident === id
    );

    if (existingAircraft?.flights.some((f) => f.ident === flight.ident)) {
      return;
    }

    if (
      existingAircraft &&
      isFlightOverlapping(existingAircraft.flights, flight)
    ) {
      return;
    }

    if (existingAircraft) {
      const updatedAircraft = {
        ...existingAircraft,
        flights: [...existingAircraft.flights, flight],
      };
      updateAircraftSchedule(updatedAircraft);
    } else {
      const newAircraft = {
        ident: id,
        flights: [flight],
      };
      setAircraftSchedule([...aircraftSchedule, newAircraft]);
    }

    removeFlightFromList(flight.ident);
  };

  const removeFlightFromSchedule = (id: string, flightToDelete: Flight) => {
    const currentAircraft = aircraftSchedule.find(
      (aircraft) => aircraft.ident === id
    );

    if (!currentAircraft) return;

    const updatedFlights = currentAircraft.flights.filter(
      (flight) => flight.ident !== flightToDelete.ident
    );

    const updatedAircraft = {
      ...currentAircraft,
      flights: updatedFlights,
    };

    updateAircraftSchedule(updatedAircraft);
    revertFlight(flightToDelete);
  };

  return (
    <AircraftScheduleContext.Provider
      value={{
        aircraftSchedule,
        addFlightToSchedule,
        removeFlightFromSchedule,
      }}
    >
      {children}
    </AircraftScheduleContext.Provider>
  );
}
