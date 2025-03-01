import styled from "styled-components";

const Card = styled.div<{ $clickable?: boolean; $isActive?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 500;
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
  background-color: ${(props) =>
    props.$isActive ? "#cacce7" : "var(--white)"};
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.$isActive
        ? "#cacce7"
        : props.$clickable
        ? "#f5f5f5"
        : "var(--white)"};
    box-shadow: ${(props) =>
      props.$clickable
        ? "0 2px 4px rgba(0, 0, 0, 0.2)"
        : "0 2px 4px rgba(0, 0, 0, 0.1)"};
  }
`;

type CardProps = {
  children: React.ReactNode;
  clickable?: boolean;
  isActive?: boolean;
};

function CardWrapper({ children, clickable, isActive }: CardProps) {
  return (
    <Card $clickable={clickable} $isActive={isActive}>
      {children}
    </Card>
  );
}

export default CardWrapper;
