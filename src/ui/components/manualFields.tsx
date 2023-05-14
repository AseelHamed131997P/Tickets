import { FunctionComponent } from "react";
import { TextField, Card } from "ui/components";
import { makeStyles } from "@material-ui/core/styles";
import { styled, css } from "ui/utils";

const Title2 = styled.h2(
  ({ theme: { colors } }) => css`
    color: #988d8d;
    font-weight: bold;
    position: relative;
    left: 2px;
    right: 25px;
    font-size: large;
  `
);
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#D9D9D9",
    margin: "auto",
  },
  manualField: {
    // margin: "auto",
    // paddingLeft: "20px",
    // marginTop: "15px",
  },
  textField: {
    "& .MuiInput-underline:before": {
      borderBottomColor: "#fff8", // Semi-transparent underline
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "#fff", // Solid underline on hover
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#fff", // Solid underline on focus
    },
    // "& .MuiInputBase-input ": {
    //   color: "#988d8d",
    // },
    position: "relative",
    top: "10px",
  },
  textArea: {
    position: "relative",
    top: "10px",
    paddingBottom: "15px",
    border: "none",
    outline: "none",
    fontFamily: "Zen Antique , serif",
  },
}));

interface Props {
  className?: string;
  fieldName: string;
  height?: string | string[];
  width: string | string[];
  placeHolder?: string;
  box?: string;
  id?: any;
  name?: any;
  value?: any;
  onChange?: any;
}

const ManualFields: FunctionComponent<Props> = ({
  fieldName,
  placeHolder,
  width,
  height,
  box,
  id,
  name,
  value,
  onChange,

  ...props
}) => {
  const classes = useStyles();
  return (
    <div className={classes.manualField}>
      <Title2>{fieldName}</Title2>

      <Card bgcolor={"white"} width={width} height={height}>
        {box ? (
          <textarea
            className={classes.textArea}
            placeholder={placeHolder}
            style={{ height: "100%", width: "90%", fontSize: "17px" }}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
          />
        ) : (
          <TextField
            className={classes.textField}
            placeholder={placeHolder}
            height={height}
            width={"90%"}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            {...props}
          ></TextField>
        )}
      </Card>
    </div>
  );
};

export default ManualFields;
