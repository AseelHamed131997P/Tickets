import React, { FunctionComponent } from "react";
import { styled, css, mq } from "ui/utils";

import { Row, Col, FlexBox } from "ui/components";

const Title1 = styled.h2(
  ({ theme: { colors } }) => css`
    color: #988d8d;
    font-weight: bold;
    font-size: 0.6vw;
    // position: relative;
    // top: 27px;
    // right: 35px;
  `
);
const Title2 = styled.h2(
  ({ theme: { colors } }) => css`
    color: #0a2f5a;
    font-weight: bold;
    font-size: 1vw;
    font-family: "Zen Antique , serif";
    position: relative;
    // top: 27px;
    // right: 15px;
  `
);

const ItemBox = styled(Row)(
  () => css`
    width: 100%;

    border: 1px solid grey;
    border-bottom: 5px solid #0a2f5a;
    box-shadow: 4px 4px 12px rgb(133, 129);
    border-radius: 10px 10px 0px 0px;

    ${mq({
      height: ["60px", "60px", "60px", "60px", "80px", "80px"],
    })};
  `
);

const Circle = styled(FlexBox)(
  () => css`
    border-radius: 25px;
    position: relative;
    margin-top: -25px;

    background-color: #0a2f5a;

    ${mq({
      width: ["40px", "40px", "40px", "40px", "50px", "50px"],
      height: ["40px", "40px", "40px", "40px", "50px", "50px"],
    })};
  `
);

interface Props {
  iconComponent: React.ReactNode;
  title1: string;
  title2: string;
}

const MenuItem: FunctionComponent<Props> = ({
  iconComponent,
  title1,
  title2,
}) => {
  return (
    <ItemBox>
      <Col style={{ width: "50%", textAlign: "start", paddingTop: "10px" }}>
        <Title1>{title1}</Title1>

        <Title2>{title2}</Title2>
      </Col>

      <Col style={{ width: "50%" }}>
        <Circle>{iconComponent}</Circle>
      </Col>
    </ItemBox>
  );
};

export default MenuItem;
