import React, { FunctionComponent } from "react";
import { IconProps } from "./types";
const Hotels: FunctionComponent<IconProps> = ({
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
      id="icons8-building-100"
      width="30"
      height="30"
      xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAACR0lEQVR4nO3ZwWoTURSA4XMnMZvGnSvxDexGfQtxHagmuJG2UvBhFJHgNlqYrfoabnwEFRdduzE2cSGFEkE9M5nmb/p/uwzMvYWfk+nklmioruvByXy+H8syjhK7EbHTdK0t8T2ifCrLmN0Y9F6PRqMfTRYpTW56cXx8s1os30fEnSb3b7/lx/5i8eBgMvmWvbPK3lDX9cAY/1Lu/qx676bT6bXsnekgJ/P5fhjjf9ybD4dPsjf109v8fmac+xwfqtP+wdPHo6/ptbbI89nsVq9U04i4f3atRJlExKvMOukJiRK3z388jcXhVY8REfFsPP4SVTlcubybXScfJGL4xx+iiIg42tv7vHLpenaNJkHUIYPAGATGIDAGgcm/hyS9fPN22cW6R48e/vVnn03t25YTAmMQGIPAdP4MWdX0O7jtM2FT+2Y5ITAGgTEIjEFgDAJjEBiDwFz4e8hF/1+/6X2znBAYg8AYBKbzZ0jX5we0fdtyQmAMAmMQGM/U17xvW04IjEFgDALjmXrH+2Y5ITAGgTEIjEFgDAJjEBiDwHimDuOEwBgExiAwnqnDOCEwBoExCIxn6mvety0nBMYgMAaB8Uy9432znBAYg8AYBMYgMAaBMQiMQWA8U4dxQmAMAmMQGM/UYZwQGIPAGATGM/U179uWEwJjEBiDwHim3vG+WU4IjEFgDAJjEBiDwBgExiAwV+ZM/bJwQmAMAmMQmK09U7+snBAYg8AYBMYgMAaBMQiMQWDS7wj+FpWTfQ9zQmAMAmMQmF/9tpxSU9C1DwAAAABJRU5ErkJggg=="
    />
  </svg>
);
export default Hotels;
