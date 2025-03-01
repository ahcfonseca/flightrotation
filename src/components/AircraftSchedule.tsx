import styled from "styled-components";
import UtilizationBar from "./UtilizationBar";
import ScheduleCard from "./ScheduleCard";
import {
  useAircraftScheduleContext,
  useCurrentAircraftContext,
} from "../lib/hooks";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  height: 100%;
  background-color: var(--background-color-light);
  border-radius: 4px;
  border: 1px solid var(--border-color);
  width: 40%;
`;

const ScrollableContainer = styled.div`
  overflow-y: auto;
  max-height: 360px;
  gap: 8px;
  padding-top: 0;
  padding-right: 8px;
  width: calc(100% + 8px);
  display: flex;
  flex-direction: column;
  margin-top: 8px;

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

const EmptyState = styled.p`
  font-family: var(--primary-font);
  font-size: 16px;
  color: var(--text-color-light);
  text-align: center;
  font-weight: 900;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function AircraftSchedule() {
  const { currentAircraft } = useCurrentAircraftContext();
  const { aircraftSchedule } = useAircraftScheduleContext();

  const utilizationData = aircraftSchedule
    .filter((aircraft) => aircraft.ident === currentAircraft)
    .flatMap((aircraft) => aircraft.flights);

  return (
    <>
      <Container>
        <SectionTitle>Rotation {currentAircraft}</SectionTitle>
        {!currentAircraft && (
          <EmptyState>Select an aircraft in the left panel.</EmptyState>
        )}

        {currentAircraft && aircraftSchedule && utilizationData && (
          <>
            <UtilizationBar utilization={utilizationData} />
            <ScrollableContainer>
              {utilizationData.map((flight) => (
                <ScheduleCard
                  key={flight.ident}
                  flightNumber={flight.ident}
                  arrivalTime={flight.readable_arrival}
                  departureTime={flight.readable_departure}
                  origin={flight.origin}
                  destination={flight.destination}
                />
              ))}
            </ScrollableContainer>
          </>
        )}
      </Container>
    </>
  );
}

export default AircraftSchedule;
