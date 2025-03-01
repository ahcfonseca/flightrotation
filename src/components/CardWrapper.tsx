import styled from "styled-components";

const Card = styled.div<{ $clickable?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 500;
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
  background-color: var(--white);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.$clickable ? "#f5f5f5" : "var(--white)"};
    box-shadow: ${(props) =>
      props.$clickable
        ? "0 2px 4px rgba(0, 0, 0, 0.2)"
        : "0 2px 4px rgba(0, 0, 0, 0.1)"};
  }
`;

type CardProps = {
  children: React.ReactNode;
  clickable?: boolean;
};

function CardWrapper({ children, clickable }: CardProps) {
  return <Card $clickable={clickable}>{children}</Card>;
}

export default CardWrapper;
