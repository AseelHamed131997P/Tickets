import { FunctionComponent, useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Table,
  Modal,
  CustomButton,
  Icon,
  TextField,
  Footer,
  Alert,
  FlexBox,
} from "ui/components";
import Moment from "moment";
import { signup } from "actions/auth";
import { styled, css } from "ui/utils";
import { color, layout } from "styled-system";
import { api } from "utils";
import { useFormik } from "formik";
import { useDispatch } from "hooks";
import * as yup from "yup";
import { general } from "data";
import { exit } from "process";
import { ClipLoader } from "react-spinners";
import { makeStyles } from "@material-ui/core";

const Title = styled.h2(
  () => css`
    color: #0a2f5a;
    font-weight: bold;
    display: flex;
    align-items: flex-end;
    font-size: xx-large;
  `
);
const Title2 = styled.h2(
  ({ theme: { colors } }) => css`
    color: #0a2f5a;
    position: relative;
    font-size: 14px;
  `
);
const Box = styled.div`
  ${layout}
  ${color}
  background-color: #dcd6d6;
  border-radius: 25px;
  padding-top: 1px;
  padding-bottom: 1px;
  padding-right: 10px;
  padding-left: 10px;
  position: relative;
  height: 45px;
`;
const override = css`
  border-width: 4px;
`;
const useStyles = makeStyles((theme) => ({
  message: {
    fontFamily: "Zen Antique , serif",
    fontSize: "x-large",
  },
  BoxMessage: {
    height: "100%",
    width: "100%",
    paddingBottom: "50px",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const AdminsPage: FunctionComponent = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [keyVal, setKeyVal] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const [loading, setloading] = useState(false);
  type ContentType = { [key: string]: string };
  const [users, setUsers] = useState<ContentType[]>([]);
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    username: yup.string().required(general.validators.required),
    email: yup
      .string()
      .email(general.validators.email)
      .required(general.validators.required),

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
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      users.map((item, key) => {
        if (values.email.toLowerCase() === item.email) {
          formik.setErrors({ email: "email already exist" });
          exit();
        }
        return 0;
      });
      dispatch(
        signup(values)
          .then(({ data: { user } }) =>
            setUsers([
              ...users,
              {
                username: user.username,
                email: user.email.toLowerCase(),
                created_at: "",
              },
            ])
          )
          .then(() => {
            setOpen(false);
            setOpenAlert(true);
            formik.resetForm();
          })
          .catch((e) => {
            setOpenError(true);
            console.log(e);
          })
      );
    },
  });

  useEffect(() => {
    setloading(true);
    api
      .get("auth/users")
      .then(({ data }) => {
        setUsers(data.users);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, []);

  users.map((item, index) => {
    delete users[index].is_active;
    delete users[index].roles;
    delete users[index].__v;
    // delete users[index]._id;
    delete users[index].updatedAt;
    delete users[index].gender;

    return 0;
  });

  const getUsers = () => {
    let userInfo;
    let tempUsers: ContentType[] = [];

    const localUser = localStorage.getItem("user");

    if (localUser) {
      userInfo = JSON.parse(localUser);
    }

    if (userInfo.roles[0] === "ROLE_ADMIN") {
      for (var i = 0; i < users.length; i++) {
        tempUsers.push({
          "User Name": users[i].username,

          Email: users[i].email,

          "Date Created": Moment(`${users[i].created_at}`).format("DD/MM/yyyy"),
          "Change Password": users[i]._id,
        });
      }
    } else {
      for (i = 0; i < users.length; i++) {
        tempUsers.push({
          "User Name": users[i].username,

          Email: users[i].email,

          "Date Created": Moment(`${users[i].created_at}`).format("DD/MM/yyyy"),
        });
      }
    }

    return tempUsers;
  };

  const boxField = ["Name", "Email", "Date Created"];

  const sortTable = () => {
    users.sort(function (userDataA: any, userDataB: any) {
      let sortByValue = Object.keys(userDataA)[keyVal + 1];

      var nameA = userDataA[sortByValue].toUpperCase(); // ignore upper and lowercase
      var nameB = userDataB[sortByValue].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return sortByValue === "created_at" ? 1 : -1;
      }
      if (nameA > nameB) {
        return sortByValue === "created_at" ? -1 : 1;
      }
      // names must be equal
      return 0;
    });
  };
  if (!loading && users.length !== 0) {
    sortTable();
  }

  return (
    users && (
      <>
        <Col width={0.95} height={window.innerHeight - 48}>
          <Row width={1} height={".5%"}></Row>

          <Row width={1} display={"flex"} justifyContent={"space-between"}>
            <Title>Admins</Title>

            <Row height={"35px"}>
              <Box>
                <Row>
                  {boxField.map((field, key) => {
                    return (
                      <CustomButton
                        key={key}
                        border="none"
                        color={keyVal === key ? "#0A2F5A" : "#DCD6D6"}
                        fontColor={keyVal === key ? "white" : "#0A2F5A"}
                        height="40px"
                        onClick={() => {
                          setKeyVal(key);
                        }}
                        radius="25px"
                        width="150px"
                        children={field}
                      />
                    );
                  })}
                </Row>
              </Box>
              <Icon.AddAdmin onClick={handleOpen} height={"45px"} />
            </Row>
          </Row>
          {loading ? (
            <div className={classes.BoxMessage}>
              <FlexBox className={classes.message}>
                <ClipLoader css={override} color={"#0A2F5A"} size={55} />
              </FlexBox>
            </div>
          ) : (
            <Row height={"85%"}>
              {getUsers().length > 0 ? (
                <Table content={getUsers()}></Table>
              ) : (
                <div className={classes.BoxMessage}>
                  <FlexBox className={classes.message}>No Users!!!!</FlexBox>
                </div>
              )}
            </Row>
          )}
          <Row width={1} height={"2.5%"} />

          <Footer />

          <Modal open={open} height={"500px"} width={"80%"}>
            <form onSubmit={formik.handleSubmit} noValidate>
              <Col width={1} height={"100%"}>
                <Row width={1} height={"3%"} />
                <Row width={1} height={"10%"}>
                  <Col width={"93%"}>
                    <Title2>Add New Admin</Title2>
                  </Col>
                  <Col width={"7%"}>
                    <Icon.Close onClick={handleClose} height={"20px"} />
                  </Col>
                </Row>
                <Row width={1} height={"70%"}>
                  <Col width={0.1} height={"70%"} />
                  <Col width={0.9} height={"70%"}>
                    <TextField
                      label={"Name"}
                      width={"70%"}
                      height={"80px"}
                      value={formik.values.username}
                      onInput={formik.handleChange}
                      type="username"
                      name="username"
                      error={
                        formik.touched.email && Boolean(formik.errors.username)
                      }
                      helperText={
                        formik.touched.email && formik.errors.username
                      }
                    ></TextField>
                    <TextField
                      label={"Email"}
                      width={"70%"}
                      height={"80px"}
                      value={formik.values.email}
                      onInput={formik.handleChange}
                      type="email"
                      name="email"
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    ></TextField>
                    <TextField
                      label={"Password"}
                      width={"70%"}
                      height={"80px"}
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onInput={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    ></TextField>
                    <TextField
                      label={"Confirm Password"}
                      width={"70%"}
                      height={"80px"}
                      value={formik.values.confirmPassword}
                      onInput={formik.handleChange}
                      name="confirmPassword"
                      type="password"
                      error={
                        formik.touched.email &&
                        Boolean(formik.errors.confirmPassword)
                      }
                      helperText={
                        formik.touched.email && formik.errors.confirmPassword
                      }
                    ></TextField>
                  </Col>
                </Row>
                <Row width={1} height={"17%"}>
                  <Row width={0.7} />
                  <Button type="submit" width={"200px"} height={"1%"}>
                    Save
                  </Button>
                </Row>
              </Col>
            </form>
          </Modal>
        </Col>

        <Alert
          autoHideDuration={2200}
          onClose={() => {
            setOpenAlert(false);
          }}
          open={openAlert}
          message={general.alertMessage}
        />

        <Alert
          autoHideDuration={2200}
          onClose={() => {
            setOpenError(false);
          }}
          open={openError}
          message="Please try again"
          type="error"
        />
      </>
    )
  );
};

export default AdminsPage;
