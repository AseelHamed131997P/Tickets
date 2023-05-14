import { general } from "data";
import { FunctionComponent, useState } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  BisanFields,
  Footer,
  Alert,
} from "ui/components";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import { styled, css } from "ui/utils";
import { useDispatch } from "hooks";
import { useFormik } from "formik";
import { BisanConfig } from "actions/bisan";

const Title = styled.h2(
  () => css`
    color: #0a2f5a;
    font-weight: bold;
    display: flex;
    align-items: flex-end;
    font-size: xx-large;
  `
);

const useStyles = makeStyles((theme) => ({
  LayoutBisan: {
    display: "grid",
    gridTemplateRows: " auto 1fr auto",
  },
  root: {
    backgroundColor: "#D9D9D9",
    height: " 80%",
  },
  Fields: {
    width: "100%",
    height: "calc(100% / 5)",
  },
  LayoutCard: {
    width: "100%",
    height: "100%",
    display: "grid",
    justifyItems: "center",
    alignItems: "center",
  },

  LayoutButton: {
    width: "100%",
    height: "12.5%",
    display: "grid",
    justifyItems: "flex-end",
    alignItems: "center",
  },
}));

const validationSchema = yup.object({
  accountId: yup.string().required(general.validators.required),
  appId: yup.string().required(general.validators.required),
  appSecret: yup.string().required(general.validators.required),
  username: yup.string().required(general.validators.required),
  password: yup.string().required(general.validators.required),
});

const SettingsPage: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      accountId: "",
      appId: "",
      appSecret: "",
      username: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (
        window.confirm("Are you sure you want to replace the Bisan config?")
      ) {
        dispatch(BisanConfig(values));
      }
    },
  });
  return (
    <Col
      width={0.95}
      height={window.innerHeight - 48}
      className={classes.LayoutBisan}
    >
      <Row width={1} height={"60px"}>
        <Title>{general.Bisan}</Title>
      </Row>

      <Col className={classes.LayoutCard}>
        <Card bgcolor={"#EAEFF2"} width={"70%"} className={classes.root}>
          <form
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            onSubmit={formik.handleSubmit}
          >
            <BisanFields
              id="accountId"
              name="accountId"
              fieldName={general.CodeAccount}
              value={formik.values.accountId}
              onChange={formik.handleChange}
            ></BisanFields>
            {formik.errors.accountId && formik.touched.accountId && (
              <Row
                width={"85%"}
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {formik.errors.accountId}
              </Row>
            )}
            <BisanFields
              id="appId"
              name="appId"
              fieldName={general.AppId}
              value={formik.values.appId}
              onChange={formik.handleChange}
            ></BisanFields>
            {formik.errors.appId && formik.touched.appId && (
              <Row
                width={"85%"}
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {formik.errors.appId}
              </Row>
            )}
            <BisanFields
              id="appSecret"
              name="appSecret"
              fieldName={general.AppSecret}
              value={formik.values.appSecret}
              onChange={formik.handleChange}
            ></BisanFields>
            {formik.errors.appSecret && formik.touched.appSecret && (
              <Row
                width={"85%"}
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {formik.errors.appSecret}
              </Row>
            )}
            <BisanFields
              id="username"
              name="username"
              fieldName={general.UserName}
              value={formik.values.username}
              onChange={formik.handleChange}
            ></BisanFields>
            {formik.errors.username && formik.touched.username && (
              <Row
                width={"85%"}
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {formik.errors.username}
              </Row>
            )}
            <BisanFields
              id="password"
              name="password"
              type="password"
              fieldName={general.Password}
              value={formik.values.password}
              onChange={formik.handleChange}
            ></BisanFields>
            {formik.errors.password && formik.touched.password && (
              <Row
                width={"85%"}
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {formik.errors.password}
              </Row>
            )}

            <Col
              className={classes.LayoutButton}
              style={{ paddingRight: "11%" }}
            >
              <Button height={"40px"} width={"130px"} type="submit">
                {general.Save}
              </Button>
            </Col>
          </form>
        </Card>
      </Col>

      <Footer />
      <Alert
        autoHideDuration={2200}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        message={general.alertMessage}
      />
    </Col>
  );
};
export default SettingsPage;
