import React, { FunctionComponent } from "react";
import { IconProps } from "./types";
const Transportation: FunctionComponent<IconProps> = ({
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
      id="icons8-public-transportation-100_1_"
      data-name="icons8-public-transportation-100 (1)"
      width="30"
      height="30"
      xlinkHref="data:image/png;base64,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"
    />
  </svg>
);
export default Transportation;
