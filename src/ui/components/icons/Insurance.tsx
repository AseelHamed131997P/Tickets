import React, { FunctionComponent } from "react";
import { IconProps } from "./types";
const Insurance: FunctionComponent<IconProps> = ({
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
    <g id="insurance" transform="translate(-34 -600)">
      <image
        id="icons8-public-safety-100_1_"
        data-name="icons8-public-safety-100 (1)"
        width="30"
        height="30"
        transform="translate(34 600)"
        xlinkHref="data:image/png;base64,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"
      />
    </g>
  </svg>
);
export default Insurance;