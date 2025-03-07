import styled from "styled-components";
import CardWrapper from "./CardWrapper";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import {
  useAircraftScheduleContext,
  useCurrentAircraftContext,
} from "../lib/hooks";
import { Flight } from "../lib/types";

type ScheduleCardProps = {
  flightInfo: Flight;
};

function ScheduleCard({ flightInfo }: ScheduleCardProps) {
  const { removeFlightFromSchedule } = useAircraftScheduleContext();
  const { currentAircraft } = useCurrentAircraftContext();

  const handleClick = () => {
    if (!currentAircraft) return;

    removeFlightFromSchedule(currentAircraft, flightInfo);
  };

  return (
    <CardWrapper>
      <ScheduleCardContainer>
        <FlightNumber>{flightInfo.ident}</FlightNumber>
        <RemoveButton onClick={handleClick}>Remove</RemoveButton>
        <FlightInfo>
          <CardLabel>{flightInfo.origin}</CardLabel>
          <CardValue>{flightInfo.readable_departure}</CardValue>
        </FlightInfo>
        <Icon>
          <DoubleArrowRightIcon />
        </Icon>
        <FlightInfo className="right-aligned">
          <CardLabel>{flightInfo.destination}</CardLabel>
          <CardValue>{flightInfo.readable_arrival}</CardValue>
        </FlightInfo>
      </ScheduleCardContainer>
    </CardWrapper>
  );
}

export default ScheduleCard;

const ScheduleCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FlightNumber = styled.h3`
  font-family: var(--secondary-font);
  font-size: 18px;
  font-weight: 500;
  color: var(--text-color-light);
  margin: 0;
  width: 50%;
  text-align: left;
  margin-bottom: 8px;
`;

const RemoveButton = styled.button`
  background-color: var(--primary-color);
  color: var(--white);
  font-family: var(--primary-font);
  font-size: 12px;
  font-weight: 500;
  padding: 0px 6px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0;
  max-height: 22px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--primary-color-light);
  }
`;

const CardLabel = styled.span`
  font-family: var(--primary-font);
  font-size: 16px;
  font-weight: 900;
  display: block;
  color: var(--text-color);
`;

const CardValue = styled.span`
  font-family: var(--primary-font);
  font-size: 16px;
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
  text-align: left;

  &.right-aligned {
    text-align: right;
  }
`;
