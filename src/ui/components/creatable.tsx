import * as React from "react";
import {
  Button,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  TextField,
  makeStyles,
} from "@material-ui/core";

import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

import { Col } from "./grid";
import { useDispatch } from "hooks";
import { useFormik } from "formik";
import { AddCustomers, AddSuppliers } from "actions/bisan";
import * as yup from "yup";
import { general } from "data";
import { FunctionComponent, useState } from "react";
import { Alert } from ".";

const filter = createFilterOptions<OptionType>();
interface Props {
  users?: any;
  type?: string;
  setUsers?: any;
  placeHolder?: string;
  formikSetField?: any;
  valueIn: any;
}

const FreeSoloCreateOptionDialog: FunctionComponent<Props> = ({
  users,
  type,
  setUsers,
  placeHolder,
  formikSetField,
  valueIn,
}) => {
  const [open, toggleOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleClose = () => {
    toggleOpen(false);
  };
  const useStyles = makeStyles((theme) => ({
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

      position: "relative",
      top: "10px",
    },
  }));

  const classes = useStyles();

  const dispatch = useDispatch();
  const validationSchema = yup.object({
    userName: yup.string().required(general.validators.required),
    userEmail: yup
      .string()
      .required(general.validators.required)
      .email(general.validators.email),
    userMobile: yup
      .string()
      .required(general.validators.required)
      .trim()
      .matches(
        /^059+[0-9]{7}$|^056+[0-9]{7}$|^052+[0-9]{7}$|^058+[0-9]{7}$|^054+[0-9]{7}$/,
        general.validators.mobileNumber
      ),

    userPhone: yup
      .string()
      .required(general.validators.required)
      .trim()
      .matches(/^02+[0-9]{7}$/, general.validators.phoneNumber),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      userEmail: "",
      userMobile: "",
      userPhone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("aseeeel");
      console.log(values);
      if (type === "customer") {
        dispatch(
          AddCustomers(values)
            .then(({ data }) => {
              setUsers([
                ...users,
                {
                  name: data.record.cusContactAR,
                  code: data.code,
                },
              ]);
              handleClose();
            })
            .then(() => {
              setOpenAlert(true);
            })
            .catch((error) => {
              console.log("error", error);
              handleClose();
            })
        );
      } else {
        dispatch(
          AddSuppliers(values)
            .then(({ data }) => {
              setUsers([
                ...users,
                {
                  name: data.record.supContactAR,
                  code: data.code,
                },
              ]);
              handleClose();
              return Promise.resolve();
            })
            .then(() => {
              setOpenAlert(true);
            })
            .catch((error) => {
              console.log("error", error);
              handleClose();
            })
        );
      }
    },
  });

  return (
    <React.Fragment>
      <Autocomplete
        style={{ padding: "0px 10px", position: "relative", top: "-9px" }}
        value={valueIn}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setTimeout(() => {
              toggleOpen(true);
            });
            formik.setFieldValue("userName", newValue);
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            formik.setFieldValue("userName", newValue.inputValue);
          } else {
            if (type === "customer") {
              formikSetField("customer", newValue);
            } else {
              formikSetField("supplier", newValue);
            }
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
              email: " r@ngn.ps ",
              phoneNumber: " ",
            });
          }

          return filtered;
        }}
        fullWidth
        id="free-solo-dialog-demo"
        options={users}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option, props) => <div {...props}>{option.name}</div>}
        renderInput={(params) => (
          <TextField
            className={classes.textField}
            {...params}
            placeholder={placeHolder}
          />
        )}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>
            {type ? "Add a new customer" : "Add a new supplier"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {type
                ? "Did you miss any customer in our list? Please, add it!"
                : "Did you miss any supplier in our list? Please, add it!"}
            </DialogContentText>
            <Col width={"200px"} style={{ alignContent: "center" }}>
              <TextField
                margin="dense"
                id="userName"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                label={type ? "Customer Name" : "Supplier Name"}
                type="text"
                variant="standard"
                error={
                  formik.touched.userName && Boolean(formik.errors.userName)
                }
                helperText={formik.touched.userName && formik.errors.userName}
              />
              <TextField
                margin="dense"
                id="userPhone"
                name="userPhone"
                value={formik.values.userPhone}
                onChange={formik.handleChange}
                label={type ? "Customer Phone" : "Supplier Phone"}
                type="text"
                variant="standard"
                error={
                  formik.touched.userPhone && Boolean(formik.errors.userPhone)
                }
                helperText={formik.touched.userPhone && formik.errors.userPhone}
              />
              <TextField
                margin="dense"
                id="userMobile"
                name="userMobile"
                value={formik.values.userMobile}
                onChange={formik.handleChange}
                label={type ? "Customer Mobile" : "Supplier Mobile"}
                type="text"
                variant="standard"
                error={
                  formik.touched.userMobile && Boolean(formik.errors.userMobile)
                }
                helperText={
                  formik.touched.userMobile && formik.errors.userMobile
                }
              />
              <TextField
                margin="dense"
                name="userEmail"
                id="E-mail"
                value={formik.values.userEmail}
                onChange={formik.handleChange}
                label={type ? "Customer E-mail" : "Supplier E-mail"}
                type="text"
                variant="standard"
                error={
                  formik.touched.userEmail && Boolean(formik.errors.userEmail)
                }
                helperText={formik.touched.userEmail && formik.errors.userEmail}
              />
            </Col>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Alert
        autoHideDuration={2000}
        onClose={() => {
          setOpenAlert(false);
        }}
        open={openAlert}
        message={general.alertMessage}
      />
    </React.Fragment>
  );
};
export default FreeSoloCreateOptionDialog;

interface OptionType {
  inputValue?: string;
  name: string;
  email: string;
  phoneNumber: string;
}
