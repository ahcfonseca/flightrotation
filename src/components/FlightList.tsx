import styled from "styled-components";
import FlightCard from "./FlightCard";
import { useFlightList } from "../lib/hooks";

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
            />
          ))}
      </ScrollableContainer>
    </Container>
  );
}

export default FlightList;
