import React, { FunctionComponent } from "react";
import { IconProps } from "./types";
const Warehouse: FunctionComponent<IconProps> = ({
  color,
  className,
  ...props
}) => (

  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns-xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512.016 512.016" fill="white" width="20" height="20" xml-space="preserve">
<g>
	<g>
		<path d="M511.24,70.843c-0.149-0.405-0.405-0.725-0.597-1.109c-0.405-0.747-0.853-1.472-1.408-2.112
			c-0.32-0.363-0.683-0.661-1.045-0.981c-0.597-0.512-1.259-0.96-1.963-1.323c-0.448-0.235-0.875-0.448-1.365-0.619
			c-0.277-0.107-0.512-0.299-0.811-0.363l-245.333-64c-1.749-0.448-3.627-0.448-5.376,0l-245.333,64
			c-0.32,0.107-0.555,0.277-0.832,0.384c-0.491,0.171-0.917,0.384-1.365,0.619c-0.725,0.363-1.365,0.811-1.963,1.323
			c-0.363,0.32-0.725,0.619-1.045,0.96c-0.576,0.64-1.003,1.344-1.408,2.112c-0.213,0.384-0.448,0.704-0.619,1.109
			c-0.469,1.195-0.768,2.475-0.768,3.84v426.667c0,5.888,4.779,10.667,10.667,10.667h490.667c5.888,0,10.667-4.779,10.667-10.667
			V74.683C512.008,73.317,511.709,72.037,511.24,70.843z M256.008,21.691l162.219,42.325H93.789L256.008,21.691z M128.008,490.683
			h-64v-64h64V490.683z M64.008,405.349v-42.667h42.667v42.667H64.008z M213.341,490.683h-64v-42.667h64V490.683z M490.675,490.683
			H341.341v-64h149.333V490.683z M490.675,405.349H384.008v-42.667h106.667V405.349z M490.675,341.349H373.341
			c-5.888,0-10.667,4.779-10.667,10.667v53.333h-32c-5.888,0-10.667,4.779-10.667,10.667v74.667h-85.333v-53.333
			c0-5.888-4.779-10.667-10.667-10.667h-74.667v-10.667c0-5.888-4.779-10.667-10.667-10.667h-10.667v-53.333
			c0-5.888-4.779-10.667-10.667-10.667h-64c-5.888,0-10.667,4.779-10.667,10.667v138.667H21.341V277.349h469.333V341.349z
			 M490.675,256.016H21.341v-42.667h469.333V256.016z M490.675,192.016H21.341v-42.667h469.333V192.016z M490.675,128.016H21.341
			V85.349h469.333V128.016z"/>
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
  //   width="40"
  //   height="40"
  //   viewBox="0 0 40 40"
  // >
  //   <image
  //     id="icons8-warehouse-96"
  //     width="40"
  //     height="40"
  //     xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAADq0lEQVR4nO3cT2gUZxjH8d8zkz9ukkUERQUP0ioNlGRJA17Ug8SLxSIUQt1oiwcpBVGIBNqjeNKLAVEUjxp30R4UKnjxH4J4Et2N0j9UPcYWwYPJxLjuPh7sQVpNdt55d57R/j4nD/u+88Zv5n1niAYgIiIiIiIiIqJm5PuKvfm+Yq/1OpIQ6wW4yBWKGwLIPgW+BhBAcRXQo1G1fAmAWq8vjg8nwOfDHbn29m2iGAOw7p2fEVQBHI9ytTO4/fNsqutzlPkASwaHF7+ote8SwRiAVU0O+xuCE2Gox57fKT9t5fqSymyAzi92rmmrN/YqsBtAl+M0cwqcD6GHpyvlBz7X50vmAvxrfw89TatZPSeyEaCZ/d2XjJ0TpgEc93dfMnFOmATwtL/7YnpOpBqgu3/HkApGAf3Sw7VnATn95o/6HYBcwvkUissSYnzmbulKwrma1voA/vf3/2wd3reyFM+JlgUw+UtJIbZv3gN43t+dHx89P8627JzwFiCrX3BWviHeJ2GAA0Gu//dvRPAjIIWkiwHkCaDHwzY96fuWzw8Wl9ZfyQ+A7AF0ReIJBVVt6KHZ6mfngAMN92kcdQ3uXCmv6ucUstF1jrdWURVgfGb6WRl/Xp5LPN981mzp7O5ZUlRgFIr+pNOJ4KaGwfbozsSU03iXQT0Dw8u00X5LgbUu4//x5rEPcmSmevZqgnmcdffvGFLofgi2IME3owB/BG263uWudbpoV2HkFwBbXcYCmAVwJmzo+PPJ8m+Oc3iV7yv21gMZBfAt3N8nLkWV0ldxB8UO0FMY2dQArsUd18r93Zek50QgwabpexM34oyJ/bQSrug7KEDzB66gKoKfoplnu2u/Xrj+cup+FPeaaXk5dT+q/TV5s5ZfdayjM/cQgk8ALG92vIoGtSeTF+NcM/Yd0FUYeQxg9UJrsXitb4XugZHNWsdok+fEo6hS+jTO/C4B5gB0zPORU1na331565z4fp6PzUWV0qI487oEmPflI6qUsvEzhhbx/fUHyZZDSTGAMQYwxgDGGMAYAxhrS/uCCz3GWUv7MZp3gDEGMMYAxhjAGAMYYwBjDGAs9feAhbT6OTxr7yG8A4wxgDEGMMYAxhjAGAMYYwBjDGCMAYwxgDEGMMYAxhjAGAMYYwBjDGCMAYwxgDEGMMYAxhjAGAMYYwBjmft3QQv52P6bLO8AYwxgjAGMef9VBf93/FUFHxgGMMYAxhjAGAMYYwBjDEBERERERERERJSS1x9LZ+dNqaUKAAAAAElFTkSuQmCC"
  //   />
  // </svg>
);
export default Warehouse;
