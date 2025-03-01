import styled from "styled-components";
import FlightCard from "./FlightCard";
import {
  useAircraftScheduleContext,
  useCurrentAircraftContext,
  useFlightList,
} from "../lib/hooks";
import { Flight } from "../lib/types";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  height: 100%;
  background-color: var(--background-color-light);
  border-radius: 4px;
  border: 1px solid var(--border-color);
  width: 30%;
`;

const ScrollableContainer = styled.div`
  overflow-y: auto;
  max-height: 480px;
  gap: 8px;
  padding-top: 0;
  padding-right: 8px;
  width: calc(100% + 8px);
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 8px;
    margin-left: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`;

const SectionTitle = styled.h2`
  font-family: var(--secondary-font);
  font-size: 18px;
  font-weight: 500;
  color: var(--text-color);
  margin: 0 0 8px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
`;

function FlightList() {
  const { flights, status } = useFlightList();

  const { currentAircraft } = useCurrentAircraftContext();
  const { aircraftSchedule, addFlightToSchedule } =
    useAircraftScheduleContext();

  const handleClick = (flight: Flight) => {
    if (currentAircraft) {
      addFlightToSchedule(currentAircraft, flight);
      flights && flights?.splice(flights?.indexOf(flight), 1);
    }
  };

  useEffect(() => {
    // check the last destination of the schedule for the current aircraft
    // and filter out the flights that doesn't have the same origin
    if (currentAircraft && aircraftSchedule) {
      const currentSchedule = aircraftSchedule.find(
        (schedule) => schedule.ident === currentAircraft
      );

      if (currentSchedule) {
        const lastDestination =
          currentSchedule.flights[currentSchedule.flights.length - 1]
            .destination;

        // filter out the flights that doesn't have the same origin as the last destination
        flights?.filter((flight) => flight.origin === lastDestination);
      }
    }
  }, [currentAircraft, aircraftSchedule, flights]);

  return (
    <Container>
      <SectionTitle>Flights</SectionTitle>
      <ScrollableContainer>
        {status === "pending" && <p>Loading...</p>}
        {status === "error" && <p>Something went wrong</p>}
        {status === "success" &&
          flights &&
          flights.map((flight) => (
            <FlightCard
              key={flight.ident}
              flightNumber={flight.ident}
              origin={flight.origin}
              destination={flight.destination}
              departureTime={flight.readable_departure}
              arrivalTime={flight.readable_arrival}
              onAddFlight={() => handleClick(flight)}
            />
          ))}
      </ScrollableContainer>
    </Container>
  );
}

export default FlightList;
