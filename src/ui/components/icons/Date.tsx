import React, { FunctionComponent } from "react";
import { IconProps } from "./types";
const Date: FunctionComponent<IconProps> = ({ color, className, ...props }) => (

  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns-xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512 512"  fill="white" width="20" height="20" xml-space="preserve">
<g>
	<g>
		<path d="M403.2,38.4V0h-38.4v38.4h-89.6V0h-38.4v38.4h-89.6V0h-38.4v38.4H32V512h448V38.4H403.2z M275.2,76.8h89.6v38.4h-89.6
			V76.8z M147.2,76.8h89.6v38.4h-89.6V76.8z M70.4,76.8h38.4v38.4H70.4V76.8z M441.6,473.6H70.4v-38.4h371.2V473.6z M441.6,396.8
			H70.4V153.6h371.2V396.8z M441.6,115.2h-38.4V76.8h38.4V115.2z"/>
	</g>
</g>
<g>
	<g>
		<path d="M309.965,280.978c-2.697-6.472-6.472-12.018-11.325-16.64s-10.595-8.241-17.217-10.862
			c-6.628-2.618-13.867-3.93-21.725-3.93c-4.47,0-8.052,0.426-10.747,1.271c-2.696,0.849-4.506,1.814-5.43,2.889l4.622-27.964
			h54.772V192h-81.582c-3.546,18.337-6.701,34.746-9.475,49.226c-1.235,6.164-2.427,12.214-3.583,18.143
			c-1.155,5.933-2.159,11.288-3.004,16.063c-0.849,4.777-1.582,8.667-2.197,11.671c-0.617,3.004-0.925,4.586-0.925,4.737h32.125
			c2.156-3.387,5.006-6.008,8.552-7.858c3.543-1.85,7.396-2.774,11.556-2.774c6.472,0,11.707,2.003,15.715,6.008
			c4.004,4.009,6.008,9.325,6.008,15.946c0,6.934-2.159,12.48-6.472,16.64c-4.314,4.161-10.09,6.243-17.331,6.243
			c-6.163,0-12.212-1.619-18.143-4.854c-5.933-3.236-11.132-7.547-15.601-12.942l-20.568,22.88
			c4.929,8.627,12.169,15.329,21.724,20.108c9.551,4.773,20.338,7.164,32.357,7.164c9.088,0,17.408-1.35,24.959-4.045
			c7.547-2.697,14.058-6.51,19.529-11.441c5.467-4.933,9.742-10.826,12.827-17.679c3.081-6.854,4.622-14.445,4.622-22.765
			C314.008,294.614,312.657,287.45,309.965,280.978z"/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   xmlnsXlink="http://www.w3.org/1999/xlink"
  //   width="77"
  //   height="77"
  //   viewBox="0 0 77 77"
  // >
  //   <g id="Group_79" data-name="Group 79" transform="translate(-1352 -259)">
  //     <rect
  //       id="Rectangle_10"
  //       data-name="Rectangle 10"
  //       width="77"
  //       height="77"
  //       rx="38.5"
  //       transform="translate(1352 259)"
  //       fill="#fff"
  //     />
  //     <image
  //       id="icons8-planner-100"
  //       width="30"
  //       height="30"
  //       transform="translate(1376 283)"
  //       xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAD7klEQVR4nO2dT2sTQRiHf7NR2yRapYiKVm/izbR4qAriSfDWkyK1Xjz4AargRWxLEargV/AgVqyeRQ9eRMTmFOLNo0i1QhGszR9pO6+HRk030TTZ2eyb7O+BHmZ29p138zAzmw7ZNQiBnsHRownBjADnDLCr+pgAPzyYFxaJ8VL+4UIY/QclyvyN64CVi5kH0N+g6ZJg26A2KVHn77kMBgAJwQwaXwwA7PWwdt91/0GJOn/nQgQ410Tb8677D0rU+W9zHdA/5xbzjzdNi6nMqFQVd7vuPyhR5+98hJBgUIgyKEQZddeQ9NBYRtbtFAxOAtgfZgK+ObnjaD5/swiRrEl4E4Xco7z/aM0ISQ+NZcTatzAYQcgy4okcgMGIWPs2PTSW8R+tESLrdgpAui25xZu0WDvpr6xdQzamKdIeTvsr6q0hm6Yp/314I5qdU5uNHzZh5++Lv89/nHdZyqAQZVCIMpz/LwvAMoC+34UGc/L3EPoPSqT5Ox8hBubl1ttiy23bRdT5OxdikRgHsLSFpkvi2XHX/Qcl6vydCynlHy7AsxkDzGFj+PtZNsAcPJsp5p58dt1/UKLOP4w1BJVEL4URux1EmT/vspRBIcqgEGVQiDIoRBkN77I6fUev0+AIUQaFKINClNFwDdG2o9fpNFqTOUKUQSHKoBBlUIgyKEQZFKIMClEGhSiDQpRBIcqgEGVQiDIoRBkUogwKUQaFKINClEEhyqAQZVCIMihEGRSiDApRBoUog0KUQSHKoBBlhPIrXG30D1/uK5XtbQNzEcAAWn+AtEDwSTw8TfaY6W/Z2Xo/mw5E14+Q/uHLfeWf8sbAXAdwGMGe5m1gcMQIbpTL8nrvsau7Gp/SHF0vpFS2tyE4HkLowUJv6ZbroF0vpDJNhRNbjPOHC8RhDTlUXSimVlN496zUUqRTF5Kp4vbin7LBQLDUaun6EQL/NbYqo/65zj+/OAjpKChEGRSiDApRBoUog0KUQSHKoBBlUIgyKEQZFKIMClEGhSgjDkLsptKJa6mWI9Wea+u2C0Ac9kMWsLF1CwBIra0UkBltLdLair/mU8tZ/YOuHyFiMBdabOCJ65hdLyTZY6YBqXlfoANy6XLvHddBu17It+zscqqcPCOQewA+Agjy2FsB8FGAu6ly79mlDw9+uMnyL3FYQ1D54G5W/pzQ+j7w/+n6EdJpUIgyKEQZFKIMClEGhSiDQpRBIcqgEGXU+6b+FVXvVOcbdkLli7+idoQI5tuSCgGArL+iRohJeBMACm1JJ94UjedN+isT/orVxfdfdxzMPIfIAcDsAbCzLenFBrMI4JXxvCuF3KMwtgUIIYTElF/SSg3nIXxl7wAAAABJRU5ErkJggg=="
  //     />
  //   </g>
  // </svg>
);
export default Date;
