import styled from "styled-components";

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
`;

function DateSelector() {
  return <Container>4th March 2025</Container>;
}

export default DateSelector;
