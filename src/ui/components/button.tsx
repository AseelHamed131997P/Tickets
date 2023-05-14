import React, { FunctionComponent, ButtonHTMLAttributes } from "react";
import { styled, css, mq } from "ui/utils";
import { Button as ButtonCompenent } from "@material-ui/core";

const StyledButton = styled(ButtonCompenent)<Props>(
  ({ width, height }) => css`
    padding: 3%;
    border-radius: 30px !important ;
    font-weight: bold !important;
    font-family: Segoe UI;
    ${mq({ height, width })}
  `
);

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  height?: string | string[];
  width?: string | string[];
}

const Button: FunctionComponent<Props> = ({
  children,
  className,
  height,
  width,
  ...props
}) => (
  <StyledButton
    variant="contained"
    className={className}
    height={height}
    width={width}
    {...props}
    color="primary"
  >
    {children}
  </StyledButton>
);

export default Button;
