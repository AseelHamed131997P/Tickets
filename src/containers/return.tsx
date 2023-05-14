import { FunctionComponent, useState } from "react";
import {
  Row,
  Col,
  ManualFieldsBox,
  ManualBox,
  Footer,
  Alert,
} from "ui/components";
import { general } from "data";

import { styled, css, mq } from "ui/utils";

import { createStyles, makeStyles } from "@material-ui/core/styles";

import { useFormik } from "formik";
import * as yup from "yup";
import { AddReturnsToBisan } from "actions/bisan";
import { useDispatch } from "hooks";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

const Line = styled.div(
  () => css`
    width: 2px;
    background-color: #70707070;

    height: 400px;
    position: relative;
    left: -5%;
    align-self: center;
    ${mq({
      height: ["400px", "400px", "400px", "400px", "500px", "600px"],
    })};
  `
);
const Title = styled.h2(
  () => css`
    color: #0a2f5a;
    font-weight: bold;
    display: flex;
    align-items: flex-end;
    font-size: xx-large;
  `
);

const StyledTitle = styled(Row)(
  () => css`
    width: 100%;

    ${mq({
      height: ["40px", "40px", "40px", "40px", "50px", "60px"],
    })};
  `
);

const MenuRow = styled(Row)(
  () => css`
    width: 100%;
    display: flex;
    justify-content: center;
    ${mq({
      paddingTop: ["35px", "35px", "35px", "35px", "50px", "90px"],
    })};
  `
);

const StyledManualFields = styled(Col)(
  () => css`
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    column-gap: 15px;

    ${mq({
      paddingTop: ["1px", "1px", "1px", "1px", "30px", "30px"],
    })};
  `
);

const AddEmpityRow = styled(Row)(
  () => css`
    width: 100%;

    ${mq({
      height: ["0px", "0px", "15px", "15px", "15px", "50px"],
    })};
  `
);

const useStyles = makeStyles((theme) =>
  createStyles({
    LayoutReturn: {
      display: "grid",
      gridTemplateRows: " auto 1fr auto",
    },

    Layout: {
      display: "grid",
      gridTemplateRows: " auto 1fr ",
    },
  })
);

const Return: FunctionComponent = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [returnType, setReturnType] = useState("Sale");
  const [itemType, setItemType] = useState("Ticket");
  const handleChangeReturn = (event: any) => {
    setReturnType(event.target.value);
    formik.resetForm();
  };

  const handleChangeItem = (event: any) => {
    setItemType(event.target.value);
  };

  const dispatch = useDispatch();
  let menuDetails;
  let data = general.manualFields;
  if (itemType === "Ticket") {
    menuDetails = data.TicketDetails;
  } else if (itemType === "Visa") {
    menuDetails = data.VisaDetails;
  } else if (itemType === "Transportation") {
    menuDetails = data.TransportationDetails;
  } else if (itemType === "Insurance") {
    menuDetails = data.InsuranceDetails;
  } else {
    menuDetails = data.HotelDetails;
  }
  const validationSchema = yup.object({
    customer: yup.object().required(general.validators.required).nullable(),
    supplier: yup.object().required(general.validators.required).nullable(),

    quantity: yup
      .string()
      .trim()
      .matches(/^[0-9]+$/, general.validators.number)
      .required(general.validators.required),

    purchase: yup
      .string()
      .trim()
      .matches(/^[0-9.]+$/, general.validators.number)
      .required(general.validators.required),

    sale: yup
      .string()
      .trim()
      .matches(/^[0-9.]+$/, general.validators.number)
      .required(general.validators.required),

    comment: yup.string().required(general.validators.required),
  });

  const formik = useFormik({
    initialValues: {
      supplier: null,
      customer: null,
      purchase: "",
      quantity: "1",
      sale: "",
      comment: "",
      setOpen,
      setOpenError,
    },
    validationSchema,
    onSubmit: (values) => {
      // console.log("iam in return page");
      // console.log(values);
      dispatch(AddReturnsToBisan(values, itemType));
      formik.resetForm();
    },
  }); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Col
      width={0.95}
      height={window.innerHeight - 49}
      className={classes.LayoutReturn}
    >
      <StyledTitle>
        <Title>{general.manualFields.Returns}</Title>
      </StyledTitle>
      <form
        id="forms"
        style={{ width: "100%" }}
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <Col width={1} height={"100%"}>
          <AddEmpityRow width={"100%"} />
          <Row width={1} height={"100%"} display="flex">
            <ManualFieldsBox
              formikValues={formik.values}
              handleChange={formik.handleChange}
              formikErrors={formik.errors}
              formikTouched={formik.touched}
              formikSetField={formik.setFieldValue}
            />
            <Line></Line>

            <Col width={0.6} className={classes.Layout}>
              <StyledManualFields>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Item Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={itemType}
                      label="itemType"
                      onChange={handleChangeItem}
                      style={{ backgroundColor: "#FAFAFA" }}
                    >
                      <MenuItem value={"Ticket"}>Ticket</MenuItem>
                      <MenuItem value={"Visa"}>Visa</MenuItem>
                      <MenuItem value={"Transportation"}>
                        Transportation
                      </MenuItem>
                      <MenuItem value={"Insurance"}>Insurance</MenuItem>
                      <MenuItem value={"Hotel"}>Hotel</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </StyledManualFields>

              <MenuRow>
                <ManualBox
                  id="comment"
                  name="comment"
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                  formikErrors={formik.errors.comment}
                  formikTouched={formik.touched.comment}
                  unit={menuDetails.unit}
                  item={menuDetails.item}
                  description={menuDetails.description}
                />
              </MenuRow>
            </Col>
          </Row>
        </Col>
      </form>

      <Footer />
      <Alert
        autoHideDuration={2200}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        message={general.alertSendMessage}
      />

      <Alert
        autoHideDuration={2200}
        onClose={() => {
          setOpenError(false);
        }}
        open={openError}
        message={general.alertErrorMessage}
        type="error"
      />
    </Col>
  );
};

export default Return;
