import { FunctionComponent } from "react";
import { styled } from "ui/utils";
import Snackbar, { SnackbarProps } from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/styles";

const StyledAlert = styled(Snackbar)`
  width: 5%;
  height: 10%;

  border-radius: 15px !important;
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;

  margin: 0 10% 1% 35%;
`;

interface Props extends SnackbarProps {
  className?: string;
  type?:string;
}

const SnackbarAlert: FunctionComponent<Props> = ({
  children,
  className,
  type,
  ...props
}) => {
  const useStyles = makeStyles(() => ({
    alert: {
      "& .MuiSnackbarContent-root": {
        backgroundColor: "#0a2f5a",
      },
    },
    errorAlert: {
      "& .MuiSnackbarContent-root": {
        backgroundColor: " #b30000",
      },
    },
  }));
  const classes = useStyles();

  return (
    <StyledAlert className={type === "error"? classes.errorAlert: classes.alert}  {...props}>
      {children}
    </StyledAlert>
  );
};

export default SnackbarAlert;
