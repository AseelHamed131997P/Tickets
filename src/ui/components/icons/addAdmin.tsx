import React, { FunctionComponent } from "react";
import { IconProps } from "./types";
import { styled } from "ui/utils";

const Svg = styled.svg`
  cursor: pointer;
  position: relative;
`;

const AddAdmin: FunctionComponent<IconProps> = ({
  color,
  className,
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="60px"
    height="60px"
    viewBox="0 0 60 60"
    className={className}
    {...props}
  >
    <image
      id="icons8-add-user-male-90"
      width="60"
      height="60"
      xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAAJkElEQVR4nO2cbXBcVRnHf8/dzcvuJpQWBAR0CtaWt+y2TXkp/cAAA1IZUBhKy6YpxZeiAyI4ClMG32AsHXDooDgKM87AkGxq88GBAREUqgNjoVizSSlKQQozKu9V6e4m2ew9jx+SdEqyu7m7e3PuGvL7lnvuff5P/vfk5JxzzzkwyyyzzDLLLLPMYgMJOoFSNJ22+jOhUPgcRJer6gJRORGhFWgFhoH3Fd0nIn9EzSO5/q19Aadclvoyun1DNOpmr0H1S8DSSh5VeDqEfjPT37NnmrKriXoxWqLxq76MyJ3AkTXEGRLhK9l0qtuvxPwicKNbT1p3hNtUSAEX+hTSIFyeS6ce8SmeLwRqdCTecbyIbgcW+Bz6fVXuEHSfQ/iFzMDD7/ocv2ICM3pOW3Ju3mGHwKJplhpGdSshvTXXt/Vf06xVEicgXRkRuiyYDNCEyNUY58Xo4o7TLegVJZAaHYsn16nwUADS+43D0qG+1Ju2he3X6AUrm1R0k3XdUeaF3EBesH2joy3z1oEcZ1t3HBXOiS2+6gLbuvZr9OhgJFDUyM22Na220S3xzqOMuO/Y1CxBIVwYOfrDPb37bQlardHGKZxtU68MYbehYaVNQatGK7LCpl5ZjC6zKWe3jVbareqVQUVOsaln1WhBP2FTbwr8HvaXxXKvQ+bZ1SvLYTbFbHfv6snoVptito0uWNYriULepp7lNprAZs8m4sBblvXsofCGTb1yGPiHTT3bTcdzlvVKIojVXOzWaDVP2dQrh3HMMzb1rBo9OLD1BYW/2dQswb6hvkXP2hS0Pnsn8HvbmkX4DfzA2BS0O3uXSJ5rRo0O6hPaOMYR5/xMuusPtgTtzt7BTbY1S+AY3JusCtoUAz3Brl45ZL5NNctGO1m7emVQcjblbNfofrt6ZRCsLoq0a7RQN8u0xOijVvVsigFEE8nngGC/tCg7cgOpFYDakrTeAzAa6gy4CUkbxySxaDIEuPYulkjeq3CDTU0R7s2mUzfa1BwnsD6tqlofISoENtcSmNE5t/AkYHM57Vu5UMvvLOp9hOBGaXt68wL32JIT5R52PTBiS28igQ6Hs+GWn2LnY8Dr2Q8b77OgU5Jg5x12PZAT0Q3AdM6kjTiqX+WNB4emUWNKQkGKA4y8/dLrDce0GeA8v2OP7dT6YmagZ6ffsSsl8M1CY0gskexRWO1TvDdBrs/1dz/mU7yaqYcpSwDNLhzpEPhJzYFgu6OhM+rJZKifGn2QaCJZ7YhNUdmUW5T/Pr297pR3L1jZ1BKbe7aBc4E2VBYhegzQwuioMcvokoS9IAOOyPZM5oMdvPbEcDXJzRSjFeW63EDq51PGb0u2I3otIlcCcyrU+Q+wDXXuzw10/aWSB2eE0arcODiQurds3PjapYi5E982jspvRXRjNp1Ke7rbH1H/qNho0dty6Z4flSxfvioSyzVsVrgO/3tZBVG9L/th08apuo//70Y/lutPXUqJmbjW+NpFrpheoM2X5Eqi/a7IquF06tVSd9RLr6MK9J+hsF5DCZOjiztOd8U8y7SbDCCJkPJ8ZPGakltH6sroWLzjfK/3Osq6A7t63i9WFomvORPVZwCbC9/niTpPRhLJM4oV1o/R7RuiKnqXt5v115mBnqJLulrjaxcJzuOMdtNs0yLweNPi5GcnFtSF0fPO7DgsUsg8irfDUAohDW0sWrJ8VcQV04twhK8JVsaRIdVe5q9vPvRi0EZLJN5xxdCQeVnAY7Mhvzww0PVKsZJYrmEz1bfJeRG9mbBzLGHnWBG5haoXq0siNif/kW3YgfQ6WuKdRxmncIWqfEPgpEqedRw5NdPX/fLE62P95J1U2YUTkVuy6e6PNF2xRPIWhc3VxAMK4jjLsn1d/QDhKoNUTCTecbw4+nmUSwzuRaiEq3jLO4uZDDA2GKm6n6wheXjSxcLIQ4QbqjU6rK7ZBFwM01yjW5Z0nKIuX1DRy4BlNeuJXJ9Ld/9s4uVoW7Idhz/XEjrXnyqaWw1zLwAKpj3Xv7XP9xrdsnT1ya4butqBy4zRhT6+SnUkv61oiei1dTj2AhAIXQt8zS+jJZJIXibwLeOyQvB/0YTC3kxf73uTChasbBqbIKpT9EpOXXVDzUbHEsnPqXAXStyPtEohqs8Xuz421VnpLJxN5jY3hpdXbfThi9cfntf8FoX1Vtb8iFPU6LH55LrGUTm3KqMjp6351LDmn6q0a1YLxjF/LVqgxOuzeT4E1XjFRje3JU8UYTvw6WlIqSShglPiEBNZ6OE/Ql5Eb9NQqCu3q6uijZwleyPtaz8prnaq6h1AY/kosrAyoxesbHIcerFsMoBxQiWM1qOmelZEvptNp+72M5+xF3ZXLJEUD4Oaoysagkdj8+6mwsNZ/WIwOljcaJl687yK2+V7QuOxHTN5oDOZVs9GN8c7TwD9eg051UZ+bt1s2D8UNY2e/kN4NtrBfBuLQ/aJzMlnik97KgemelaM0+l7QmM4jHiJfcCbce0bohQy19SWUm0MS+hw4N+TS+Rd0LLTogq3xxJJ1DEP+3U+aXTJmmPFOJ0KP/Rw+zuejI6ZzNkKkRpzq4mwuPOBfZNLdC9w8hSPNypsxjibo4lk0RsqnuswFY1+X/HUdKjhHO8xpwcjUvwMJJH62elVCmXAaxt95rQm4gUtfnyaI7LddiqVYpTtHo2euq9qgeXFLmYyH+xgdAVRvbJ/yIw877VG13Luvl+cFol3HD/p6mtPDKPaG0A+XtnGnt68R6Pr4hg1EcdcWrwo9Au7qXhGRbgf6nS2vBqiiY4nQC+qOoBjjpvY9Ysk1h0nFGo5e+mxXH/qEgj+K7hviOhGajjurdigxuNgpBQFMXLrwfg1BKo7YvGrtqhItRs28wLfG5+7GBuM3M6UM3PFUeHHg+nUd8Z/nlFGM399c3RO/k/AkkDzEAZykZGz2NE7OH5pxjQdALzx4JArrAaKrsmzxHtuwb38UJNhphkNDKdTr+roWopMAPIZRC4efulXf59YMOOMBhjsT+1E5Dxg8lfz6WO/OnphLt39YrHCGWk0QC7d/aIrrLB0ZEWf67pnDPb17Ch1Q+AbOqcT9+3d+0ciyx5sbHZjwOn4X7EKim4Z/G9Th7u3u+xfz8zqdZQhtmRtQl2zCWEltf/eCjwuRm7N7u7e7eWBj43R40QTa5aMLtPSK4G5FT6+H9gmwv1ed2ON87Ez+iCnrmpsdhrOckKch2ocZCHKMQc/9ioHEH0LZC/CbmOcp4fc4RfY01vVmun/AWqtFyjtLexlAAAAAElFTkSuQmCC"
    />
  </Svg>
);

AddAdmin.defaultProps = {
  className: "",
  color: "#333",
};

export default AddAdmin;
