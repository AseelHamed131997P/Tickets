import { FunctionComponent, useState, ChangeEvent } from "react";
import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
  Paper,
} from "@material-ui/core";
import { Icon, Row, Col, Modal, Button } from "ui/components";

import { useDispatch } from "hooks";
import { changePassword } from "actions/profileInfo";
import { Alert } from "ui/components";
import { general } from "data";

import { styled, css, mq } from "ui/utils";
import { InputBase } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";

const Title2 = styled.h2(
  ({ theme: { colors } }) => css`
    color: #0a2f5a;

    // position: relative;
    font-size: larger;
    display: flex;
    justify-content: flex-start;
  `
);
const StyledButton = styled(Button)(
  () => css`
    padding: 0rem;
  `
);

const Title = styled.h2(
  () => css`
    color: #0a2f5a;
    font-weight: bold;
    display: flex;
    align-items: flex-end;

    ${mq({
      fontSize: ["large", "large", "large", "large", "x-large", "x-large"],
    })};
  `
);

type ContentType = { [key: string]: string };

interface Props {
  className?: string;
  content: ContentType[];
}

const useStyles = makeStyles((theme) =>
  createStyles({
    StyleTitle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "start",
      height: "40px",
    },
    table: {
      minWidth: "400px",
      height: "100%",

      "& .MuiTableRow-root": {
        verticalAlign: "unset",
      },
      "& .MuiTableCell-root": {
        padding: "12px",
      },
    },
    tableContainer: {
      borderRadius: "15px",
      margin: "10px 10px",
    },

    tableHeaderCell: {
      fontWeight: "bold",
      borderBottom: 0,
      backgroundColor: " #0a2f5a",
    },
    tableCell: {
      borderBottom: 0,
      width: "20%",
      textAlign: "center",
    },
    MuiTableFooterRoot: {
      display: "flex",
      alignItems: "flex-end",
      width: "100%",
    },
    PaginationToolbar: {
      width: "100%",
      display: "flex",
      justifyItems: "flex-end",
    },

    textField: {
      border: "1px solid #707070",
      borderRadius: "25px",
      padding: "0px 15px 0px 15px",
      minWidth: "70%",
    },
    ButtonRow: {
      justifyContent: "flex-end",
      alignItems: "center",
    },

    StyleRow: {
      paddingTop: "5px",
    },
    resetButt: {
      display: "flex",
      fontFamily: "'Lobster', cursive",
      fontSize: "18px",
      border: "1px solid #0a2f5a",
      height: "35px",
      width: "95px",
      alignItems: "center",
      justifyContent: "center",
      margin: "auto ",
      borderRadius: "30px",
      backgroundColor: "#0a2f5a",
      color: "white",
      cursor: "pointer",
    },
  })
);

const TableComponent: FunctionComponent<Props> = ({ className, content }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [userId, setUserId] = useState("");
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };
  const resetPassword = (IdValue: any) => {
    console.log(IdValue);

    setUserId(IdValue);

    setOpen(true);
  };

  const validationSchema = yup.object({
    password: yup
      .string()
      .min(6, general.validators.passLength)
      .required(general.validators.required)
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
        "password must contain at least a number or letter, and at least a special character"
      ),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required(general.validators.required),
  });

  const formik = useFormik({
    initialValues: {
      userId: userId,
      password: "",
      confirmPassword: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);

      dispatch(
        changePassword(values)
          .then(({ data }) => {
            setOpenAlert(true);
            console.log(data);

            setOpen(false);
            formik.resetForm();
          })
          .catch((e) => console.log(e))
      );
    },
  });

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getstyle = (val: any) => {
    if (val % 2 !== 0) {
      return { backgroundColor: " #e6e6e6" };
    } else {
      return { backgroundColor: " #cccccc" };
    }
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          {content
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <React.Fragment key={index}>
                {index === 0 && (
                  <TableHead className={classes.tableHeaderCell}>
                    <TableRow>
                      {Object.keys(item).map((key) => (
                        <TableCell
                          key={key}
                          className={classes.tableCell}
                          style={{ color: "white" }}
                        >
                          {key}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                )}
                <TableBody>
                  <TableRow key={index}>
                    {Object.keys(item).map((key) => (
                      <TableCell
                        key={key}
                        className={classes.tableCell}
                        component="th"
                        scope="row"
                        style={getstyle(index)}
                      >
                        {key === "Change Password" ? (
                          <span
                            className={classes.resetButt}
                            onClick={() => resetPassword(item[key])}
                          >
                            <Icon.ResetPassword />
                            &nbsp; Reset
                          </span>
                        ) : (
                          item[key]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </React.Fragment>
            ))}
          <TableFooter>
            <TableRow className={classes.MuiTableFooterRoot}>
              <TablePagination
                rowsPerPageOptions={[10]}
                count={content.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className={classes.PaginationToolbar}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <Modal open={open} height={"270px"} width={"80%"}>
        <form
          style={{ width: "100%", height: "100%" }}
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <Col>
            <Row className={classes.StyleTitle}>
              <Title>{general.ChangePassword}</Title>
            </Row>

            <Row width={"100%"} height={"60px"}>
              <Row width={"30%"} height={"100%"} className={classes.StyleRow}>
                {" "}
                <Title2>{general.infoFields.NewPassword}</Title2>
              </Row>
              <Row width={"70%"} height={"100%"}>
                <Col width={"100%"}>
                  <InputBase
                    className={classes.textField}
                    id="password"
                    name="password"
                    type="password"
                    placeholder={"Please Enter Your Password ..."}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  ></InputBase>
                  {formik.errors.password && formik.touched.password && (
                    <Row style={{ color: "red" }}>{formik.errors.password}</Row>
                  )}
                </Col>
              </Row>
            </Row>
            {/* <Row width={"100%"} height={"20px"} /> */}
            <Row width={"100%"} height={"60px"}>
              <Row width={"30%"} height={"100%"} className={classes.StyleRow}>
                {" "}
                <Title2>{general.infoFields.ConfirmPassword}</Title2>
              </Row>
              <Row width={"70%"} height={"100%"}>
                <Col width={"100%"}>
                  <InputBase
                    className={classes.textField}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder={"Please Enter Your Password ..."}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                  ></InputBase>
                  {formik.errors.confirmPassword &&
                    formik.touched.confirmPassword && (
                      <Row style={{ color: "red" }}>
                        {formik.errors.confirmPassword}
                      </Row>
                    )}
                </Col>
              </Row>
            </Row>
            <Row width={"100%"} height={"10px"} />
            <Row width={"100%"} height={"100%"} className={classes.ButtonRow}>
              <StyledButton
                onClick={handleClose}
                height={"40px"}
                width={"150px"}
              >
                Cancel
              </StyledButton>
              &nbsp;&nbsp;
              <StyledButton type="submit" height={"40px"} width={"150px"}>
                {general.Save}
              </StyledButton>
            </Row>
          </Col>
        </form>
      </Modal>

      <Alert
        autoHideDuration={2000}
        onClose={() => {
          setOpenAlert(false);
        }}
        open={openAlert}
        message={general.alertMessageForResetPass}
      />
    </>
  );
};

export default TableComponent;
