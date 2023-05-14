import { FunctionComponent } from "react";
import { Row, Col, Button, Card, Flex } from "ui/components";
import { useDispatch, useSelector } from "hooks";
import { styled, mq } from "ui/utils";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField } from "@material-ui/core";
import { login as t, general } from "data";
import { login } from "actions/auth";
import sky from "images/sky.png";
import plane from "images/plane.svg";
import logo from "images/rahhal_Logo.png";

const StyledButton = styled(Button)`
  top: 7%;

  ${mq({
    padding: [
      "0.5rem 3rem !important",
      "0.5rem 1.5rem !important",
      "0.5rem 3rem !important",
    ],
  })};
`;
const StyledCard = styled(Card)`
  padding-bottom: 0.5rem;
  color: black;
  position: relative;
  height: 600px;

  form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;
const Sky = styled.div`
  background: url(${sky}) no-repeat center center;
  background-position: 50% 10%;
  width: 100%;
`;
const Plane = styled.img`
  height: 50%;
  position: absolute;
  top: 30%;
  z-index: 9;

  ${mq({
    width: ["unset", "50%", "40%"],
    display: ["none", "block"],
    right: ["unset", "17%", "30%"],
  })};
`;
const Logo = styled.img`
  width: 300px;
  position: absolute;
  top: 0;
  z-index: 9;
`;

const validationSchema = yup.object({
  email: yup
    .string()
    .email(general.validators.email)
    .required(general.validators.required),
  password: yup
    .string()
    .min(6, general.validators.passLength)
    .required(general.validators.required),
});

const Login: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  return (
    <Row width={"100%"}>
      <Col
        width={[1, "50%", "45%"]}
        height={["100vh"]}
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor="#F5F5F5"
      >
        <StyledCard bgcolor={"white"} width="100%">
          <form onSubmit={formik.handleSubmit} noValidate>
            <Logo src={logo} alt="rahhal logo" />
            <Col mt="1rem" width={1}>
              <TextField
                id="email"
                name="email"
                label="Email"
                placeholder={t.emailPlaceholder}
                value={formik.values.email}
                onChange={formik.handleChange}
                type="email"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Col>
            <Col mt="0.5rem" mb="1rem" width={1}>
              <TextField
                id="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Col>
            <Col width={1}>
              <StyledButton type="submit">{t.submit}</StyledButton>
            </Col>
            {message?<Col style={{color:"red",marginTop:"10px"}}> &nbsp;{message}</Col>: ""}
          </form>
        </StyledCard>
      </Col>
      <Flex
        display={["none", "flex"]}
        width={["0", "50%", "55%"]}
        alignContent="center"
      >
        <Sky />
        <Plane src={plane} alt="plane" />
      </Flex>
    </Row>
  );
};

export default Login;
