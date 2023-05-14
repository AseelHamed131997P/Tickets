import { FunctionComponent } from "react";
import { styled, css, mq } from "ui/utils";
import { Card as CardComponent } from "@material-ui/core";

const StyledCard = styled(CardComponent)<Props>(
  ({ width, height, theme: { colors }, bgcolor }) => css`
    background-color: ${bgcolor};
    border-radius: 15px !important;
    box-shadow: 4px 4px 12px rgb(133, 129) !important;
    display: flex !important;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    ${mq({ height, width })};
  `
);

interface Props {
  className?: string;
  height?: string | string[];
  width: string | string[];
  bgcolor: string | string[];
}

const Card: FunctionComponent<Props> = ({
  children,
  className,
  height,
  width,
  bgcolor,
}) => (
  <StyledCard
    className={className}
    height={height}
    width={width}
    bgcolor={bgcolor}
  >
    {children}
  </StyledCard>
);

export default Card;
