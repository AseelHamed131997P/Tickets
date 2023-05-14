import React, { FunctionComponent } from "react";
import { IconProps } from "./types";

const Arrow: FunctionComponent<IconProps> = ({
  color,
  className,
  ...props
}) => (
  <svg viewBox="0 0 8 14" width="8" className={className} {...props}>
    <path
      d="m10.5585938-.68359375-5.0384522 5 5.0384522 5-1.2695313 1.25000005-6.34765625-6.25000005 6.34765625-6.25z"
      fill={color}
      fillRule="evenodd"
      transform="matrix(-1 0 0 -1 10.503906 11.128906)"
    />
  </svg>
);

Arrow.defaultProps = {
  className: "",
  color: "#333",
};

export default Arrow;
