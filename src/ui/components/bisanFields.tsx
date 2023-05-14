import { FunctionComponent } from "react";
import { Row, Col, TextField, Card } from "ui/components";
import { makeStyles } from "@material-ui/core/styles";
import { styled, css, mq } from "ui/utils";

const Title2 = styled.h2(
  ({ theme: { colors } }) => css`
    font-weight: bold;

    ${mq({
      fontSize: ["small", "small", "small", "small", "large", "large"],
    })};
  `
);

const LabelBox = styled.div(
  ({ theme: { colors } }) => css`
    width: 70%;
    height: 70%;

    border-bottom: 3px solid #246593;

    //    background: #076585; /* fallback for old browsers */
    // background: -webkit-linear-gradient(to right, #076585, #fff); /* Chrome 10-25, Safari 5.1-6 */
    // background: linear-gradient(to right, #076585, #fff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  `
);
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#D9D9D9",
    margin: "auto",
  },
  textField: {
    width: "90%",
    height: "100%",
    display: "grid",
    alignItems: "center",

    "& .MuiInput-underline:before": {
      borderBottomColor: "#fff8", // Semi-transparent underline
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "#fff", // Solid underline on hover
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#fff", // Solid underline on focus
    },
  },
  StyleLabel: {
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
  },
}));

interface Props {
  className?: string;
  onChange?: any;
  fieldName: string;
  height?: string | string[];
  width?: string | string[];
  value?: any;
  name?: string;
  type?: string;
  id?: any;
}

const BisanFields: FunctionComponent<Props> = ({
  fieldName,
  value,
  onChange,
  id,
  name,
  type,
}) => {
  const classes = useStyles();
  return (
    <Row width={1} height={"12.5%"}>
      <Col width={"30%"} height={"100%"} className={classes.StyleLabel}>
        <LabelBox className={classes.StyleLabel}>
          <Title2>{fieldName}</Title2>
        </LabelBox>
      </Col>
      <Col
        width={"60%"}
        height={"100%"}
        style={{ display: "grid", alignItems: "center" }}
      >
        <Card bgcolor={"white"} width={"100%"} height={"80%"}>
          <TextField
            className={classes.textField}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            type={type}
          ></TextField>
        </Card>
      </Col>
    </Row>
  );
};

export default BisanFields;
