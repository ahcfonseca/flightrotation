import styled from "styled-components";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  text-align: center;
  color: var(--white);
  font-size: 26px;
  font-weight: 600;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
    margin: 0 16px;
    cursor: pointer;
  }
`;

function DateSelector() {
  const handleClick = () => {
    alert(
      "We can't go back to the future yet! Or to the past for that matter, but we're working on it :)"
    );
  };
  return (
    <Container>
      <ChevronLeftIcon onClick={handleClick} />
      4th March 2025
      <ChevronRightIcon onClick={handleClick} />
    </Container>
  );
}

export default DateSelector;
