import React, { FunctionComponent } from "react";
import { IconProps } from "./types";

const Return: FunctionComponent<IconProps> = ({
  color,
  className,
  ...props
}) => (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns-xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
    width="20"
    height="20"
    xml-space="preserve"
  >
    <path
      fill="#bababb"
      d="M512,464h-48c0-88.365-23.635-160-112-160H192v64h-32L0,208L160,48h32v64h128
	c106.038,0,192,85.962,192,192l0,0V464z"
    />
    <path
      fill="#8d8c8d"
      d="M320,112h-48v192h80c88.365,0,112,71.634,112,160h48V304l0,0C512,197.962,426.038,112,320,112z"
    />
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
  </svg>
);

export default Return;
