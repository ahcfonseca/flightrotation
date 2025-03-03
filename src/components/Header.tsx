import styled from "styled-components";
import headerBg from "../assets/header.jpg";
import logo from "../assets/main-logo.png";

function Header() {
  return (
    <HeaderContainer>
      <Img src={logo} alt="header" />
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.header`
  height: 160px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  background-image: url(${headerBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(2, 0, 36);
    background: linear-gradient(
      90deg,
      #002538 0%,
      #002538 270px,
      rgba(0, 212, 255, 0) 100%
    );
  }
`;

const Img = styled.img`
  z-index: 1;
  width: 100%;
  max-width: 260px;
`;
