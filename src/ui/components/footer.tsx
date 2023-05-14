import { FunctionComponent } from "react";
import { styled, css } from "ui/utils";
import { Row } from "ui/components";
import { general } from "data";

const StyledFooter = styled.div`
  width: 100%;
  display: grid;
  justify-items: center;
  grid-template-columns: 25% 25% 25% 25%;
`;

const FooterRow = styled(Row)(
  () => css`
    display: flex;
    align-items: center;
    height: 50px;
    margin-bottom: -22px;
  `
);
const Title = styled.h2(
  `
    color: #0a2f5a;

    position: relative;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
  `
);

interface Props {
  className?: string;
}

const Footer: FunctionComponent<Props> = () => {
  return (
    <FooterRow width={1}>
      <StyledFooter>
        {Object.values(general.footer).map((value, index) => (
          <Title key={index}>{value}</Title>
        ))}
      </StyledFooter>
    </FooterRow>
  );
};

export default Footer;
