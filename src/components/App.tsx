import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import AircraftList from "./AircraftList";
import AircraftSchedule from "./AircraftSchedule";
import FlightList from "./FlightList";
import Footer from "./Footer";
import Header from "./Header";
import MainContainer from "./MainContainer";

function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <Header />
      <MainContainer>
        <AircraftList />
        <AircraftSchedule />
        <FlightList />
      </MainContainer>
      <Footer />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
