import styled from "styled-components";
import UtilizationBar from "./UtilizationBar";
import ScheduleCard from "./ScheduleCard";

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

function AircraftSchedule() {
  const utilizationData = [
    {
      ident: "AS1001",
      departure: 21600,
      arrival: 26100,
      readable_departure: "06:00",
      readable_arrival: "07:15",
      origin: "LFSB",
      destination: "LFMN",
    },
    {
      ident: "AS1057",
      departure: 36900,
      arrival: 43500,
      readable_departure: "10:15",
      readable_arrival: "12:05",
      origin: "LFSB",
      destination: "LEPA",
    },
  ];

  return (
    <Container>
      <SectionTitle>Rotation 456454</SectionTitle>
      <UtilizationBar utilization={utilizationData} />
      <ScrollableContainer>
        <ScheduleCard
          flightNumber="AA 456"
          origin="LAX"
          destination="JFK"
          departureTime="13:00"
          arrivalTime="16:00"
        />
        <ScheduleCard
          flightNumber="AA 456"
          origin="LAX"
          destination="JFK"
          departureTime="13:00"
          arrivalTime="16:00"
        />
        <ScheduleCard
          flightNumber="AA 456"
          origin="LAX"
          destination="JFK"
          departureTime="13:00"
          arrivalTime="16:00"
        />
      </ScrollableContainer>
    </Container>
  );
}

export default AircraftSchedule;
