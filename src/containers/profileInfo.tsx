import { general } from "data";
import { FunctionComponent, useEffect, useState } from "react";
import { Row, Col, Button, Card, Footer } from "ui/components";
import { makeStyles } from "@material-ui/core/styles";
import { styled, css, mq } from "ui/utils";
import { InputBase, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { useDispatch } from "hooks";
import { updatePassword, updateProfile } from "actions/profileInfo";
import * as yup from "yup";
import { api } from "utils";
import { Alert } from "ui/components";

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

const FieldRow = styled(Row)(
  () => css`
    display: flex;
    align-items: center;
  `
);

const ProfileBox = styled(Row)(
  () => css`
    width: 100%;

    ${mq({
      height: ["245px", "245px", "245px", "175px", "295px", "295px"],
    })};
  `
);

const PasswordTitleRow = styled(Row)(
  () => css`
    width: 100%;

    ${mq({
      height: ["10%", "10%", "10%", "8%", "15%", "15%"],
    })};
  `
);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#D9D9D9",
    margin: "auto",
  },
  Layout: {
    display: "grid",
    gridTemplateRows: " auto 1fr auto",
  },
  textField: {
    border: "1px solid #707070",
    borderRadius: "25px",
    padding: "0px 15px 0px 15px",
    minWidth: "70%",
  },
  ProfileInfo: {
    display: "grid",
    justifyItems: "center",
    gridTemplateRows: "calc(100% / 6)",
  },
  ChangePassword: {
    display: "grid",
    justifyItems: "center",
    gridTemplateRows: "calc(100% / 3)",
  },

  StyledTextField: {
    minWidth: "70%",
    "& .MuiInputBase-input": {
      padding: "0px 0 0px",
    },
  },
  ButtonRow: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  StyleRow: {
    paddingTop: "5px",
  },
}));

const ProfileInfo: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [password, setPassword] = useState(false);
  const dispatch = useDispatch();
  const validationSchema1 = yup.object({
    username: yup.string().required(general.validators.required),
  });
  const validationSchema2 = yup.object({
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

  const [loggedInUser, setLoggedInUser] = useState({
    username: "",
    email: "",
    gender: "",
  });

  useEffect(() => {
    api
      .get("/account/profile", {
        headers: {
          bisan_token: localStorage.getItem("bisan_token"),
          bisan_account_id: localStorage.getItem("bisan_account_id"),
        },
      })
      .then(({ data }) => {
        setLoggedInUser(data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      gender: loggedInUser.gender,
    },
    enableReinitialize: true,
    validationSchema: validationSchema1,
    onSubmit: (values) => {
      dispatch(
        updateProfile(values).then(() => {
          setOpen(true);
        })
        .catch((e) => {
          setOpenError(true)
          console.log(e)
        })

      );
    },
  });
  const formik2 = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema2,
    onSubmit: (values) => {
      dispatch(
        updatePassword(values)
          .then(() => {
            setOpen(true);
            setPassword(true);

            formik2.resetForm();
          })
          .catch((e) => {
            setOpenError(true)
            console.log(e)
          })
      );
    
    },
  });

  const classes = useStyles();
  return (
    <Col
      width={0.95}
      height={window.innerHeight - 49}
      className={classes.Layout}
    >
      <Row width={1} height={"60px"}>
        <Title>{general.ProfileInfo}</Title>
      </Row>
      <Col width={1}>
        <form
          style={{ width: "100%" }}
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <ProfileBox>
            <Card
              bgcolor={"white"}
              width={"70%"}
              height={"100%"}
              className={classes.root}
            >
              <Col
                width={"90%"}
                height={"100%"}
                className={classes.ProfileInfo}
              >
                <Row width={"100%"} height={"100%"} />
                <Row width={"100%"} height={"100%"}>
                  <FieldRow width={"30%"} height={"100%"}>
                    {" "}
                    <Title2>{general.infoFields.Name}</Title2>
                  </FieldRow>
                  <FieldRow width={"70%"} height={"70%"}>
                    <Col width={"100%"}>
                      <TextField
                        className={classes.StyledTextField}
                        id="username"
                        name="username"
                        placeholder={`${loggedInUser.username}`}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                      ></TextField>
                      {formik.errors.username && formik.touched.username && (
                        <Row style={{ color: "red" }}>
                          {formik.errors.username}
                        </Row>
                      )}
                    </Col>
                  </FieldRow>
                </Row>

                <Row width={"100%"} height={"100%"}>
                  <FieldRow width={"30%"} height={"100%"}>
                    <Title2>{general.infoFields.Gender}</Title2>
                  </FieldRow>
                  <FieldRow width={"70%"} height={"100%"}>
                    <input
                      type="radio"
                      id="Male"
                      name="gender"
                      value="male"
                      checked={formik.values.gender === "male"}
                      onChange={formik.handleChange}
                    />
                    <label
                      style={{ fontSize: "16px", margin: "1.5px 0px 0px 8px" }}
                    >
                      {" "}
                      Male
                    </label>
                    <Row width={"30%"} />
                    <input
                      type="radio"
                      id="Female"
                      name="gender"
                      value="female"
                      checked={formik.values.gender === "female"}
                      onChange={formik.handleChange}
                    />
                    <label
                      style={{ fontSize: "16px", margin: "1.5px 0px 0px 8px" }}
                    >
                      {" "}
                      Female
                    </label>
                  </FieldRow>
                </Row>

                <Row
                  width={"100%"}
                  height={"100%"}
                  className={classes.ButtonRow}
                >
                  <StyledButton type="submit" height={"40px"} width={"150px"}>
                    {general.Save}
                  </StyledButton>
                </Row>
              </Col>
            </Card>
          </ProfileBox>
        </form>
        <PasswordTitleRow>
          <Title>{general.ChangePassword}</Title>
        </PasswordTitleRow>

        <Row width={1} height={"210px"}>
          <Card
            bgcolor={"white"}
            width={"70%"}
            height={"100%"}
            className={classes.root}
          >
            <Col
              width={"90%"}
              height={"100%"}
              className={classes.ChangePassword}
            >
              <form
                style={{ width: "100%" }}
                onSubmit={formik2.handleSubmit}
                noValidate
              >
                <Row width={"100%"} height={"20%"} />
             <Col>
                <Row width={"100%"} height={"72px"}>
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
                        value={formik2.values.password}
                        onChange={formik2.handleChange}
                      ></InputBase>
                      {formik2.errors.password && formik2.touched.password && (
                        <Row style={{ color: "red" }}>
                          {formik2.errors.password}
                        </Row>
                      )}
                    </Col>
                  </Row>
                </Row>
                <Row width={"100%"} height={"70px"}>
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
                        value={formik2.values.confirmPassword}
                        onChange={formik2.handleChange}
                      ></InputBase>
                      {formik2.errors.confirmPassword &&
                        formik2.touched.confirmPassword && (
                          <Row style={{ color: "red" }}>
                            {formik2.errors.confirmPassword}
                          </Row>
                        )}
                    </Col>
                  </Row>
                </Row>
                <Row
                  width={"100%"}
                  height={"100%"}
                  className={classes.ButtonRow}
                >
                  <StyledButton type="submit" height={"40px"} width={"150px"}>
                    {general.Save}
                  </StyledButton>
                </Row>
                </Col>
              </form>
            </Col>
          </Card>
        </Row>
      </Col>
      <Alert
        autoHideDuration={2200}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        message={
          password
            ? "Password Changed Succedssfully !!"
            : "Profile Updated Successfully !!"
        }
      />

<Alert
        autoHideDuration={2200}
        onClose={() => {
          setOpenError(false);
        }}
        open={openError}
        message={general.alertError}
        type="error"
      />
      <Footer />
    </Col>
  );
};
export default ProfileInfo;
