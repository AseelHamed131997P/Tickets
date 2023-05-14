import React, { FunctionComponent } from "react";
import { IconProps } from "./types";
const USD: FunctionComponent<IconProps> = ({ color, className, ...props }) => (
  <svg width="20px" height="20px" fill="white" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5_logos</title><path d="M240,480V443.58C160.53,439,112.25,398.06,112,336h72c1.77,26.34,23.86,46.45,56,50V288L213.23,281c-61-14.18-93.64-49.39-93.64-102.08C119.59,116.81,164.08,76.08,240,70V32h32V70c77.39,6.3,119,47.74,120,106H320c-.76-24.06-15.83-43.39-48-46v92l30.82,7.28C367.61,243.46,400,277,400,332c0,64.34-43.74,105.88-128,111.32V480Zm0-264V130c-27.59,1.52-47.27,18.47-47.27,42.53C192.73,194.83,209.12,209.41,240,216Zm32,78v92c38.15-1.54,56.38-18.92,56.38-45.77C328.38,315.65,310.15,299.1,272,294Z"/></svg>




  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   xmlnsXlink="http://www.w3.org/1999/xlink"
  //   width="77"
  //   height="77"
  //   viewBox="0 0 77 77"
  // >
  //   <g id="Group_78" data-name="Group 78" transform="translate(-1039 -259)">
  //     <rect
  //       id="Rectangle_10"
  //       data-name="Rectangle 10"
  //       width="77"
  //       height="77"
  //       rx="38.5"
  //       transform="translate(1039 259)"
        
  //     />
  //     <image
  //       id="icons8-us-dollar-96"
  //       width="30"
  //       height="30"
  //       transform="translate(1063 283)"
  //       xlinkHref="data:image/png;base64,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"
  //     />
  //   </g>
  // </svg>
);
export default USD;
