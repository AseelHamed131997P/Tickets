import React, { FunctionComponent } from "react";
import { IconProps } from "./types";

const Dolar: FunctionComponent<IconProps> = ({
  color,
  className,
  ...props
}) => (
  <svg
    width="25px"
    height="25px"
    viewBox="0 0 24 24"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="dolarIconTitle"
    stroke="#005580"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    color="#005580"
  >
    {" "}
    <title id="dolarIconTitle">Dolar</title>{" "}
    <path d="M12 4L12 6M12 18L12 20M15.5 8C15.1666667 6.66666667 14 6 12 6 9 6 8.5 7.95652174 8.5 9 8.5 13.140327 15.5 10.9649412 15.5 15 15.5 16.0434783 15 18 12 18 10 18 8.83333333 17.3333333 8.5 16" />{" "}
  </svg>
);

export default Dolar;