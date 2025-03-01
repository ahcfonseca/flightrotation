import CardWrapper from "./CardWrapper";
import styled from "styled-components";

const AircraftCardContainer = styled.div`
  width: 100%;
`;

const CardLabel = styled.span`
  font-family: var(--primary-font);
  font-size: 14px;
  font-weight: 400;
  display: block;
  color: var(--text-color);
`;

const AircraftInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const AircraftID = styled.span`
  font-family: var(--primary-font);
  font-weight: bold;
  width: 40%;
  display: inline-block;
`;

const AircraftType = styled.span`
  font-family: var(--primary-font);
  color: #555;
  width: 40%;
  display: inline-block;
`;

const AircraftUtilization = styled.div`
  font-family: var(--secondary-font);
  color: var(--text-color-light);
`;

type AircraftCardProps = {
  id: string;
  type: string;
  utilization: string;
  onClick?: () => void;
};

function AircraftCard({ id, type, utilization, onClick }: AircraftCardProps) {
  return (
    <CardWrapper clickable={true}>
      <AircraftCardContainer onClick={onClick}>
        <AircraftInfo>
          <AircraftID>
            <CardLabel>Aircraft ID</CardLabel>
            {id}
          </AircraftID>
          <AircraftType>
            <CardLabel>Type</CardLabel>
            {type}
          </AircraftType>
        </AircraftInfo>
        <AircraftUtilization>
          <CardLabel>Utilization</CardLabel>
          {utilization}
        </AircraftUtilization>
      </AircraftCardContainer>
    </CardWrapper>
  );
}

export default AircraftCard;
