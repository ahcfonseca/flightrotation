import styled from "styled-components";
import CardWrapper from "./CardWrapper";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";

type FlightCardProps = {
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  disabled?: boolean;
  onClick: () => void;
};

function FlightCard({
  flightNumber,
  origin,
  destination,
  departureTime,
  arrivalTime,
  onClick,
  disabled,
}: FlightCardProps) {
  return (
    <CardWrapper disabled={disabled} clickable={true}>
      <FlightCardContainer onClick={onClick}>
        <FlightNumber>{flightNumber}</FlightNumber>
        <FlightInfo>
          <CardLabel>{origin}</CardLabel>
          <CardValue>{departureTime}</CardValue>
        </FlightInfo>
        <Icon>
          <DoubleArrowRightIcon />
        </Icon>
        <FlightInfo>
          <CardLabel>{destination}</CardLabel>
          <CardValue>{arrivalTime}</CardValue>
        </FlightInfo>
      </FlightCardContainer>
    </CardWrapper>
  );
}

export default FlightCard;

const FlightCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FlightNumber = styled.h3`
  font-family: var(--secondary-font);
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color-light);
  margin: 0;
  width: 100%;
  text-align: center;
`;

const CardLabel = styled.span`
  font-family: var(--primary-font);
  font-size: 14px;
  font-weight: 900;
  display: block;
  color: var(--text-color);
`;

const CardValue = styled.span`
  font-family: var(--primary-font);
  font-size: 14px;
  font-weight: 500;
  display: block;
  color: var(--text-color);
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;

  svg {
    width: 24px;
    height: 24px;
    color: var(--text-color-light);
    margin-top: -6px;
  }
`;

const FlightInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  width: 50%;
  display: flex;
  flex-direction: column;
  width: 35%;
  text-align: center;
`;
