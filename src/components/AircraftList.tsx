import styled from "styled-components";
import AircraftCard from "./AircraftCard";
import { useAircraftList } from "../lib/hooks";

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

function AircraftList() {
  const { aircrafts, status } = useAircraftList();

  console.log(aircrafts);
  console.log(status);

  const handleAircraftClick = (id: string) => () => {
    console.log(`Aircraft ${id} clicked`);
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
            Array.isArray(aircrafts) &&
            aircrafts.map((aircraft) => (
              <AircraftCard
                key={aircraft.ident}
                id={aircraft.ident}
                type={aircraft.type}
                utilization="0%"
                onClick={handleAircraftClick(aircraft.ident)}
              />
            ))}
        </ScrollableContainer>
      </Container>
    </>
  );
}

export default AircraftList;
