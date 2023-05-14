import { FunctionComponent, useEffect, useState } from "react";
import {
  Row,
  Col,
  ManualFieldsBox,
  ManualBox,
  Footer,
  DatePickers,
  Alert,
} from "ui/components";
import { general } from "data";

import { styled, css, mq } from "ui/utils";

import { createStyles, makeStyles } from "@material-ui/core/styles";

import { useFormik } from "formik";
import * as yup from "yup";
import { AddInvoiceAndPurchaseInvoiceForHotel } from "actions/bisan";
import { useDispatch } from "hooks";

const Line = styled.div(
  () => css`
    width: 2px;
    background-color: #70707070;

    height: 360px;
    position: relative;
    left: -5%;
    align-self: center;
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

const useStyles = makeStyles((theme) =>
  createStyles({
    LayoutHotel: {
      display: "grid",
      gridTemplateRows: " auto 1fr auto",
    },

    Layout: {
      display: "grid",
      gridTemplateRows: " auto 1fr ",
    },
  })
);

const ManualHotel: FunctionComponent = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [selectedDateFrom, handleDateFromChange] = useState<Date | null>(
    new Date()
  );
  let DateFrom = selectedDateFrom?.toISOString();
  const onValueFromChange = (newValue: Date | null) => {
    handleDateFromChange(newValue);
  };
  const [selectedDateTo, handleDateToChange] = useState<Date | null>(
    new Date()
  );
  let DateTo = selectedDateTo?.toISOString();
  const onValueToChange = (newValue: Date | null) => {
    handleDateToChange(newValue);
  };
  let data =general.manualFields.HotelDetails;

  useEffect(() => {
    let isMounted = true;
    someAsyncOperation();
    return () => {
      isMounted = false;
    };

    function someAsyncOperation() {
      setTimeout(() => {
        if (isMounted) {
          formik.setFieldValue("checkIn", selectedDateFrom?.toISOString());
          formik.setFieldValue("checkOut", selectedDateTo?.toISOString());
        } else console.log("aborted setState on unmounted component");
      }, 4000);
    }
  }, [selectedDateFrom, selectedDateTo]); // eslint-disable-line react-hooks/exhaustive-deps

  const dispatch = useDispatch();
  const validationSchema = yup.object({
    supplier: yup.object().required(general.validators.required).nullable(),

    customer: yup.object().required(general.validators.required).nullable(),
    purchase: yup
      .string()
      .trim()
      .matches(/^[0-9.]+$/, general.validators.number)
      .required(general.validators.required),

    quantity: yup
      .string()
      .trim()
      .matches(/^[0-9]+$/, general.validators.number)
      .required(general.validators.required),

    sale: yup
      .string()
      .trim()
      .matches(/^[0-9.]+$/, general.validators.number)
      .required(general.validators.required),

    comment: yup.string().required(general.validators.required),
    checkIn: yup.string(),
    checkOut: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      supplier: null,
      customer: null,
      purchase: "",
      quantity: "1",
      sale: "",
      comment: "",
      checkIn: DateFrom,
      checkOut: DateTo,
      item: "000000003",
      setOpen,
      setOpenError,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("iam in hotel page");
      console.log(values);
      dispatch(AddInvoiceAndPurchaseInvoiceForHotel(values));

      handleDateFromChange(new Date());
      handleDateToChange(new Date());
      formik.resetForm();
    },
  }); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Col
      width={0.95}
      height={window.innerHeight - 49}
      className={classes.LayoutHotel}
    >
      <StyledTitle>
        <Title>{data.description}</Title>
      </StyledTitle>
      <form
        id="forms"
        style={{ width: "100%" }}
        onSubmit={formik.handleSubmit}
        noValidate
      >
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
              <DatePickers
                labelName={general.manualFields.checkIn}
                selectedDate={selectedDateFrom}
                onValueChange={onValueFromChange}
                width={"100%"}
              />

              <DatePickers
                labelName={general.manualFields.checkOut}
                selectedDate={selectedDateTo}
                onValueChange={onValueToChange}
                width={"100%"}
              />
            </StyledManualFields>

            <MenuRow>
              <ManualBox
                id="comment"
                name="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
                formikErrors={formik.errors.comment}
                formikTouched={formik.touched.comment}
                unit={data.unit}
                item={data.item}
                description={data.description}
              />
            </MenuRow>
          </Col>
        </Row>
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

export default ManualHotel;
