import styled from "styled-components";
import FlightCard from "./FlightCard";
import {
  useAircraftScheduleContext,
  useAvailableFlightsContext,
  useCurrentAircraftContext,
} from "../lib/hooks";
import { Flight } from "../lib/types";

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
  const { availableFlights, status } = useAvailableFlightsContext();
  const { currentAircraft } = useCurrentAircraftContext();
  const { addFlightToSchedule, aircraftSchedule } =
    useAircraftScheduleContext();

  // here we sort the flights by departure time
  availableFlights?.sort((a, b) => {
    const dateA = new Date(a.departuretime);
    const dateB = new Date(b.departuretime);
    return dateA.getTime() - dateB.getTime();
  });

  const checkAvailability = (flight: Flight) => {
    if (aircraftSchedule.length === 0) return true;

    const lastAircraft = aircraftSchedule[aircraftSchedule.length - 1];
    if (lastAircraft.flights.length === 0) return true;

    const lastFlightDestination =
      lastAircraft.flights[lastAircraft.flights.length - 1].destination;

    return lastFlightDestination === flight.origin;
  };

  const handleClick = (flight: Flight) => {
    if (currentAircraft) {
      addFlightToSchedule(currentAircraft, flight);
    }
  };

  return (
    <Container>
      <SectionTitle>Flights</SectionTitle>
      <ScrollableContainer>
        {status === "pending" && <p>Loading...</p>}
        {status === "error" && <p>Something went wrong</p>}
        {status === "success" &&
          availableFlights &&
          availableFlights.map((flight) => (
            <FlightCard
              key={flight.ident}
              flightNumber={flight.ident}
              origin={flight.origin}
              destination={flight.destination}
              departureTime={flight.readable_departure}
              arrivalTime={flight.readable_arrival}
              onClick={() => handleClick(flight)}
              disabled={!checkAvailability(flight)}
            />
          ))}
      </ScrollableContainer>
    </Container>
  );
}

export default FlightList;
