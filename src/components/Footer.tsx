import styled from "styled-components";

const FooterContainer = styled.footer`
  border-top: 1px solid var(--white);
  padding: 20px;
  text-align: center;
  color: #a2a1a1;
`;

function Footer() {
  return (
    <FooterContainer>
      <small>Flight Rotation Inc - All Rights Reserved</small>
    </FooterContainer>
  );
}

export default Footer;
