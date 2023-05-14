import { FunctionComponent } from "react";
import {
  Radio,
  FormControlLabel,
  FormControl,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  radio: {
    "&$checked": {
      color: "#0A2F5A",
    },
  },
  checked: {},
}));

interface Props {
  className?: string;
  label: string | string[];
}

const RadioButtonComponent: FunctionComponent<Props> = ({ label }) => {
  const classes = useStyles();
  return (
    <FormControl component="fieldset">
      <FormControlLabel
        value="end"
        control={
          <Radio classes={{ root: classes.radio, checked: classes.checked }} />
        }
        label={label}
      />
    </FormControl>
  );
};
export default RadioButtonComponent;
