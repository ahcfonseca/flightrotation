import styled from "styled-components";
import AircraftCard from "./AircraftCard";
import {
  useAircraftList,
  useAircraftScheduleContext,
  useCurrentAircraftContext,
} from "../lib/hooks";

function AircraftList() {
  const { aircrafts, status } = useAircraftList();
  const { currentAircraft, handleAircraftClick } = useCurrentAircraftContext();
  const { aircraftSchedule } = useAircraftScheduleContext();

  const getUtilization = (aircraftId: string) => {
    const aircraft = aircraftSchedule.find((a) => a.ident === aircraftId);
    if (!aircraft) return 0;

    const totalFlightTime = aircraft.flights.reduce(
      (acc, flight) => acc + (flight.arrivaltime - flight.departuretime),
      0
    );
    return parseFloat(((totalFlightTime / 86400) * 100).toFixed(1));
  };

  return (
    <>
      <Container>
        <SectionTitle>Aircrafts</SectionTitle>
        <ScrollableContainer>
          {status === "pending" && <p>Loading...</p>}
          {status === "error" && <p>Error fetching data</p>}
          {status === "success" &&
            aircrafts &&
            aircrafts.map((aircraft) => (
              <AircraftCard
                isActive={currentAircraft === aircraft.ident}
                key={aircraft.ident}
                id={aircraft.ident}
                type={aircraft.type}
                utilization={`${getUtilization(aircraft.ident)}%`}
                onClick={() => handleAircraftClick(aircraft.ident)}
              />
            ))}
        </ScrollableContainer>
      </Container>
    </>
  );
}

export default AircraftList;

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
