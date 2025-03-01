import styled from "styled-components";
import FlightCard from "./FlightCard";
import {
  useAircraftScheduleContext,
  useCurrentAircraftContext,
  useFlightList,
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
  const { flights, status } = useFlightList();

  const { currentAircraft } = useCurrentAircraftContext();
  const { addFlightToSchedule } = useAircraftScheduleContext();

  const handleClick = (flight: Flight) => {
    if (currentAircraft) {
      console.log("currentAircraft", currentAircraft);
      console.log("flight", flight);
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
          flights &&
          Array.isArray(flights) &&
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
