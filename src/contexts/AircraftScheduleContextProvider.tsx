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

  const addFlightToSchedule = (id: string, flight: Flight) => {
    // here we check if the aircraft is already in the schedule and update it
    // otherwise we add a new aircraft to the schedule
    const existingAircraft = aircraftSchedule.find(
      (aircraft) => aircraft.ident === id
    );

    // validate if the flight is already in the schedule
    if (existingAircraft?.flights.some((f) => f.ident === flight.ident)) {
      return;
    }

    if (
      existingAircraft?.flights.some((f) => {
        const adjustedArrivalTime = f.arrivaltime + 1200; // here we add 20 minutes for turnaround time
        const overlap =
          (flight.departuretime >= f.departuretime &&
            flight.departuretime <= adjustedArrivalTime) ||
          (flight.arrivaltime >= f.departuretime &&
            flight.arrivaltime <= adjustedArrivalTime);
        if (overlap) {
          alert("Flight overlaps with another flight for this aircraft");
          return true;
        }
        return false;
      })
    ) {
      return;
    }

    if (existingAircraft) {
      const updatedAircraft = {
        ...existingAircraft,
        flights: [...existingAircraft.flights, flight],
      };

      const updatedSchedule = aircraftSchedule.map((aircraft) =>
        aircraft.ident === id ? updatedAircraft : aircraft
      );

      setAircraftSchedule(updatedSchedule);
      removeFlightFromList(flight.ident);
    } else {
      const newAircraft = {
        ident: id,
        flights: [flight],
      };

      setAircraftSchedule([...aircraftSchedule, newAircraft]);
      removeFlightFromList(flight.ident);
    }
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

    const updatedSchedule = aircraftSchedule.map((aircraft) =>
      aircraft.ident === id ? updatedAircraft : aircraft
    );

    setAircraftSchedule(updatedSchedule);
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
