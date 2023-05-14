import React, { FunctionComponent } from "react";
import { styled } from "ui/utils";

const StyledButton = styled.button`
  &:hover {
    border: 2px solid transparent;
    color: indigo;
    transform: scale(1.05);
    will-change: transform;
  }
  margin: 2px;
  font-size: x-large;

  a:active {
    color: yellow;
    background-color: blue;
    will-change: transform;
  }
  span:hover + div {
    display: block;
  }
`;
interface Props {
  border: string;
  color: string;
  fontColor: string;
  children?: React.ReactNode;
  height: string;
  onClick: () => void;
  radius: string;
  width: string;
}

const Button: FunctionComponent<Props> = ({
  border,
  color,
  children,
  height,
  onClick,
  radius,
  width,
  fontColor,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      style={{
        backgroundColor: color,
        border,
        borderRadius: radius,
        height,
        width,
        color: fontColor,
      }}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
