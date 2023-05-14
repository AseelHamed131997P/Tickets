import {
  FunctionComponent,
  ReactChild,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";
import {
  Row,
  Col,
  ManualBox,
  Footer,
  ManualFieldsBox,
  ManualFields,
} from "ui/components";
import * as yup from "yup";
import { general } from "data";
import { styled, css, mq } from "ui/utils";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "hooks";
import { useFormik } from "formik";
import { AddInvoiceAndPurchaseInvoice } from "actions/bisan";
import { Alert } from "ui/components";
import { useHistory } from "react-router-dom";

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

const StyledTitle = styled(Row)(
  () => css`
    width: 100%;

    ${mq({
      height: ["40px", "40px", "40px", "40px", "50px", "60px"],
    })};
  `
);

const useStyles = makeStyles((theme) =>
  createStyles({
    Layout2: {
      display: "grid",
      gridTemplateRows: " auto 1fr ",
    },
    Layout: {
      display: "grid",
      gridTemplateRows: " auto 1fr auto",
    },
    LayoutManualFields: {
      paddingTop: "30px",
      display: "grid",
      gridTemplateRows: " calc(offseHeight / 5)",
    },
  })
);

interface Props {
  TitlePage: string;
  item: string;
  unit: string;
  description: string;
  ticketData?: any;
  system?: any;
  manualType: string;
}

const Manual: FunctionComponent<Props> = ({
  TitlePage,
  item,
  unit,
  description,
  ticketData,
  system,
  manualType,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  let history = useHistory();

  let comment = "";
  let purchase = "";
  let ticketsData = "";
  let type = manualType;
  if (system === "?system-ticket") {
    let commentData = ticketData.route;

    let dataCountry: any = [];
    for (let key in commentData) {
      if (commentData.hasOwnProperty(key)) {
        dataCountry = [
          ...dataCountry,
          commentData[key].from + " - " + commentData[key].to,
        ];
      }
    }

    let textRoutes = "";

    let textPassengers = "";
    dataCountry.map(
      (
        data:
          | boolean
          | ReactChild
          | ReactFragment
          | ReactPortal
          | null
          | undefined
      ) => {
        return (textRoutes += data + `\n`);
      }
    );

    ticketData.passengers.map(
      (
        data:
          | boolean
          | ReactChild
          | ReactFragment
          | ReactPortal
          | null
          | undefined,
        index: any
      ) => {
        return (textPassengers +=
          "For:" +
          " " +
          data +
          `\n` +
          `\t` +
          " " +
          ticketData.ticketsNumbers[index] +
          `\n` +
          `\n`);
      }
    );

    let len = commentData.length;

    comment =
      "FLY TICKET: " +
      `\n` +
      textRoutes +
      `\n` +
      textPassengers +
      "TRAVEL DATE: " +
      commentData[0].time.departDay +
      "-" +
      commentData[0].time.year +
      " , " +
      commentData[len - 1].time.arriveDay +
      "-" +
      commentData[0].time.year;

    ticketsData = ticketData;
    type = "system-ticket";
    if (ticketData.cost) {
      purchase = ticketData.cost.slice(3);
    }
  }

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

    passengerName: yup.string().when("isSecondButton", {
      is: "true",
      then: yup.string().required("Field is required"),
    }),

    BNR: yup.string().when("isSecondButton", {
      is: "true",
      then: yup.string().required("Field is required"),
    }),

    comment: yup.string().required(general.validators.required),
  });
  const formik = useFormik({
    initialValues: {
      isSecondButton: "",
      passengerName: "",
      BNR: "",
      supplier: null,
      customer: null,
      purchase: purchase,
      quantity: "1",
      sale: "",
      comment: comment,
      item: item,
      type: type,
      ticketData: ticketsData,
      setOpen,
      setOpenError,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (formik.values.isSecondButton === "false") {
        dispatch(AddInvoiceAndPurchaseInvoice(values));
      } else {
        history.push({
          pathname: "/manual-tickets/voucher",
          state: {
            passengersName: formik.values.passengerName,
            BNR: formik.values.BNR,
            comment: formik.values.comment,
            supplier: formik.values.supplier,
            sale: formik.values.sale,
            purchase: formik.values.purchase,
          },
        });
      }

      formik.resetForm();
    },
  });

  return (
    <Col
      width={0.95}
      height={window.innerHeight - 49}
      className={classes.Layout}
    >
      {type === "manual-ticket" ? (
        <StyledTitle>
          <Title>{TitlePage}</Title>
        </StyledTitle>
      ) : (
        <Row width={1} height={"60px"}>
          <Title>
            {type === "system-ticket" ? "System Ticket" : TitlePage}
          </Title>
        </Row>
      )}
      <form
        id="forms"
        onSubmit={formik.handleSubmit}
        style={{ width: "100%", height: "calc(window.innerHeight - 159 )" }}
        noValidate
      >
        <Row width={1} display="flex" height={"100%"}>
          <ManualFieldsBox
            formikValues={formik.values}
            handleChange={formik.handleChange}
            formikErrors={formik.errors}
            formikTouched={formik.touched}
            formikSetField={formik.setFieldValue}
          />
          <Line></Line>
          <Col width={0.6} className={classes.Layout2}>
            {manualType === "manual-ticket" && type !== "system-ticket" ? (
              <StyledManualFields>
                <ManualFields
                  width={"100%"}
                  fieldName={general.manualFields.passengerName}
                  placeHolder={general.manualFields.passengerName}
                  height={"50px"}
                  id="passengerName"
                  name="passengerName"
                  value={formik.values.passengerName}
                  onChange={formik.handleChange}
                ></ManualFields>

                <ManualFields
                  width={"100%"}
                  fieldName={general.manualFields.BNR}
                  placeHolder={general.manualFields.BNR}
                  height={"50px"}
                  id="BNR"
                  name="BNR"
                  value={formik.values.BNR}
                  onChange={formik.handleChange}
                ></ManualFields>

                {formik.errors.passengerName && formik.touched.passengerName ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.passengerName}
                  </div>
                ) : null}
                {formik.errors.BNR && formik.touched.BNR && (
                  <div style={{ color: "red" }}>{formik.errors.BNR}</div>
                )}
              </StyledManualFields>
            ) : null}

            <MenuRow>
              <ManualBox
                id="comment"
                name="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
                formikErrors={formik.errors.comment}
                formikTouched={formik.touched.comment}
                spaceValue={type === "manual-ticket" ? "0px" : "22px"}
                unit={unit}
                item={item}
                description={description}
                ticketStatus={
                  system === "?system-ticket" ? ticketData.ticketStatus : ""
                }
                formikSetFieldValue={formik.setFieldValue}
                manualType={manualType}
                type={type}
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

export default Manual;
