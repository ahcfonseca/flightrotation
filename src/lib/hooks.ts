import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { Aircraft, Flight } from "./types";

type AircraftsApiResponse = {
  aircrafts: Aircraft[];
};

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

  return { status, aircrafts: data, error } as const;
};

type FlightsApiReponse = {
  flights: Flight[];
};

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
