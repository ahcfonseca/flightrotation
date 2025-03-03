import styled, { css } from "styled-components";

type CardProps = {
  children: React.ReactNode;
  clickable?: boolean;
  isActive?: boolean;
  disabled?: boolean;
};

function CardWrapper({ children, clickable, isActive, disabled }: CardProps) {
  return (
    <Card $clickable={clickable} $disabled={disabled} $isActive={isActive}>
      {children}
    </Card>
  );
}

export default CardWrapper;

const clickableStyles = css`
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const activeStyles = css`
  background-color: #cacce7;
`;

const disabledStyles = css`
  cursor: not-allowed;
  opacity: 0.5;
  pointer-events: none;
`;

const Card = styled.div<{
  $clickable?: boolean;
  $isActive?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  padding: 8px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 500;
  background-color: var(--white);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s, box-shadow 0.2s;

  ${(props) => props.$clickable && clickableStyles}
  ${(props) => props.$isActive && activeStyles}
  ${(props) => props.$disabled && disabledStyles}
`;
