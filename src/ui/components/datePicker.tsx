import { FunctionComponent } from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "ui/components";

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "#ffff",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#ffff",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#ffff",
    },
    "& .MuiFormControl-root": {
      height: "200px",
    },
    "& .MuiPickersModal-dialog": {
      backgroundColor: "red ",
    },
    "& .MuiIconButton-root": {
      color: "#0A2F5A",
    },
  },
  styleCard: {
    alignItems: "flex-start",
    margin: "0px",
    "& .css-ibbncp": {
      alignItems: "flex-start",
    },
  },
  StyleticketLabel: {
    paddingLeft: "6%",
    color: "#0A2F5A",
    fontWeight: "bold",
    fontSize: "15px",
  },
  StylehotelLabel: {
    paddingLeft: "0%",
    color: " #988d8d",
    fontWeight: "bold",
    fontSize: "large",
  },
  datePicker: {
    "& .MuiPickersToolbar-toolbar": {
      backgroundColor: "#0A2F5A",
    },
    "& .MuiPickersDay-daySelected": {
      backgroundColor: "#0A2F5A",
    },
  },
  StyleDateTicket: {
    justifyContent: "center",
  },
  StyleDateHotel: {
    justifyContent: "flex-start",
  },

  styleCol: {
    padding: "0rem 0.75rem",
  },
}));

interface Props {
  labelName?: string | string[];
  onValueChange: (newValue: Date | null) => void;
  selectedDate: Date | null;
  width: string;
  page?: string;
}

const DatePickers: FunctionComponent<Props> = ({
  labelName,
  selectedDate,
  onValueChange,
  width,
  page,
}) => {
  const classes = useStyles();

  return (
    <div style={{ width: width }} className={page && classes.styleCol}>
      <label
        className={page ? classes.StyleticketLabel : classes.StylehotelLabel}
      >
        {labelName}
      </label>
      <div
        style={{ display: "flex", alignItems: "center" }}
        className={page ? classes.StyleDateTicket : classes.StyleDateHotel}
      >
        <Card
          bgcolor={"white"}
          width={"90%"}
          height={"50px"}
          className={classes.styleCard}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.root}
              format="dd/MM/yyyy"
              value={selectedDate}
              InputAdornmentProps={{ position: "end" }}
              onChange={onValueChange}
              DialogProps={{ className: classes.datePicker }}
            />
          </MuiPickersUtilsProvider>
        </Card>
      </div>
    </div>
  );
};

export default DatePickers;
