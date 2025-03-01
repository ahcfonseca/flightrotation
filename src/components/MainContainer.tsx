import styled from "styled-components";
import DateSelector from "./DateSelector";

const Container = styled.main`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: column;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 980px;
  display: flex;
  flex-wrap: nowrap;
  margin: 0 auto 20px;
  flex-grow: 1;
  gap: 24px;
  padding: 0 24px;
`;

type MainContainerProps = {
  children: React.ReactNode;
};

function MainContainer({ children }: MainContainerProps) {
  return (
    <Container>
      <DateSelector />
      <InnerContainer>{children}</InnerContainer>
    </Container>
  );
}

export default MainContainer;
