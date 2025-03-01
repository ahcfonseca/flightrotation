import styled from "styled-components";
import { Flight } from "../lib/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 8px 24px;
  background-color: var(--white);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-family: var(--primary-font);
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 8px;
  width: 100%;
`;

const BarContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  border: 1px solid #ccc;
  position: relative;
`;

const UtilizedSection = styled.div`
  background-color: #00b894;
  height: 100%;
`;

const OperationalSection = styled.div`
  background-color: #9104cd;
  height: 100%;
`;

const NonUsedSection = styled.div`
  background: repeating-linear-gradient(
    45deg,
    #d7d8e4,
    #d7d8e4,
    10px,
    #c5c6d2 10px,
    #c5c6d2 20px
  );
  height: 100%;
`;

const TimeIndicatorContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: -20px;
  left: 0;
`;

const TimeIndicator = styled.div`
  font-family: var(--primary-font);
  font-size: 12px;
  color: #000;
`;

type UtilizationBarProps = {
  utilization: Flight[];
};

const UtilizationBar = ({ utilization }: UtilizationBarProps) => {
  const totalSecondsInDay = 24 * 60 * 60;
  // sort the flights by time
  utilization.sort((a, b) => a.departuretime - b.departuretime);

  const calculateSections = () => {
    const sections = [];
    let lastEndTime = 0;

    utilization.forEach((flight) => {
      const { departuretime, arrivaltime } = flight;
      const operationalTime = 20 * 60;

      // Non-used time before the flight
      if (departuretime > lastEndTime) {
        sections.push({
          type: "non-used",
          duration: departuretime - lastEndTime,
        });
      }

      // Utilized time
      sections.push({
        type: "utilized",
        duration: arrivaltime - departuretime,
      });

      // Operational time
      sections.push({
        type: "operational",
        duration: operationalTime,
      });

      lastEndTime = arrivaltime + operationalTime;
    });

    // Non-used time after the last flight
    if (lastEndTime < totalSecondsInDay) {
      sections.push({
        type: "non-used",
        duration: totalSecondsInDay - lastEndTime,
      });
    }

    return sections;
  };

  const sections = calculateSections();

  return (
    <Container>
      <Title>Utilization in 24h</Title>
      <BarContainer>
        {sections.map((section, index) => {
          const width = (section.duration / totalSecondsInDay) * 100 + "%";
          if (section.type === "utilized") {
            return <UtilizedSection key={index} style={{ width }} />;
          } else if (section.type === "operational") {
            return <OperationalSection key={index} style={{ width }} />;
          } else {
            return <NonUsedSection key={index} style={{ width }} />;
          }
        })}
        <TimeIndicatorContainer>
          <TimeIndicator>00:00</TimeIndicator>
          <TimeIndicator>12:00</TimeIndicator>
          <TimeIndicator>24:00</TimeIndicator>
        </TimeIndicatorContainer>
      </BarContainer>
    </Container>
  );
};

export default UtilizationBar;
