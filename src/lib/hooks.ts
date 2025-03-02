import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { Aircraft, Flight, AircraftSchedule } from "./types";
import { useContext, useState } from "react";
import { ActiveAircraftContext } from "../contexts/ActiveAircraftContextProvider";
import { AircraftScheduleContext } from "../contexts/AircraftScheduleContextProvider";
import { AvailableFlightsContext } from "../contexts/AvailableFlightsContextProvider";

// ######################################### Get Aircrafts #########################################

type AircraftsApiResponse = Aircraft[];

const fetchAircraftList = async (): Promise<AircraftsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/aircrafts`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data = await response.json();
  return data;
};

export const useAircraftList = () => {
  const { status, data, error } = useQuery({
    queryKey: ["aircrafts"],
    queryFn: fetchAircraftList,
  });

  return { status, aircrafts: data, error };
};

// ######################################### Get Flights #########################################

type FlightsApiReponse = Flight[];

const fetchFlightList = async (): Promise<FlightsApiReponse> => {
  const response = await fetch(`${BASE_API_URL}/flights`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data = await response.json();
  return data;
};

export const useFlightList = () => {
  const { status, data, error } = useQuery({
    queryKey: ["flights"],
    queryFn: fetchFlightList,
  });

  return { status, flights: data, error } as const;
};

// ############################## Active Aircraft ##########################################
export const useCurrentAircraft = () => {
  const [currentAircraft, setCurrentAircraft] = useState<string | null>(null);

  const handleAircraftClick = (id: string) => {
    console.log("id", id);
    setCurrentAircraft(id);
  };

  return { currentAircraft, handleAircraftClick };
};

export function useCurrentAircraftContext() {
  const context = useContext(ActiveAircraftContext);

  if (!context) {
    throw new Error(
      "useActiveAircraftContext must be used within a useActiveAircraftContextProvider"
    );
  }

  return context;
}

// ######################################### Aircraft Schedule #########################################

export const useAircraftSchedule = () => {
  const [aircraftSchedule, setAircraftSchedule] = useState<AircraftSchedule[]>(
    []
  );

  return { aircraftSchedule, setAircraftSchedule };
};

export function useAircraftScheduleContext() {
  const context = useContext(AircraftScheduleContext);

  if (!context) {
    throw new Error(
      "useAircraftScheduleContext must be used within a AircraftScheduleContextProvider"
    );
  }

  return context;
}

// ######################################### Available Flights #########################################

export const useAvailableFlights = () => {
  const { flights, status } = useFlightList();

  return {
    flights,
    status,
  };
};

export function useAvailableFlightsContext() {
  const context = useContext(AvailableFlightsContext);

  if (!context) {
    throw new Error(
      "useAvailableFlightsCon must be used within a AvailableAircraftContextProvider"
    );
  }

  return context;
}
