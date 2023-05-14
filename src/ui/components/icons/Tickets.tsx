import React, { FunctionComponent } from "react";
import { IconProps } from "./types";
const Tickets: FunctionComponent<IconProps> = ({
  color,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="20"
    height="20"
    viewBox="0 0 30 30"
    className={className}
    {...props}
  >
    <image
      id="icons8-ticket-100_1_"
      data-name="icons8-ticket-100 (1)"
      fill={color}
      width="30"
      height="30"
      xlinkHref="data:image/png;base64,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"
    />
  </svg>
);
export default Tickets;