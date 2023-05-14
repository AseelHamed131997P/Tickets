import { FunctionComponent, useEffect, useState } from "react";
import { Row, Col, ManualFields, Button, Alert } from "ui/components";
import { styled, css } from "ui/utils";
import { general } from "data";
import { useFormik } from "formik";
import * as yup from "yup";
import { AddVoucher } from "actions/voucheSettings";
import { useDispatch } from "hooks";
import { api } from "utils";

const Title = styled.h2(
  () => css`
    color: #0a2f5a;
    font-weight: bold;
    display: flex;
    align-items: flex-end;
    font-size: xx-large;
    margin: 40px 0px 20px 0px;
  `
);

const StyledButton = styled(Button)(
  () => css`
    position: relative;
    top: 10px;
    padding: 1.5rem;
    background-color: #0a2f5a;
    margin-top: 20px;
    border-radius: 5px;
  `
);

const VoucherPage: FunctionComponent = () => {
  const [openError, setOpenError] = useState(false);
  const validationSchema = yup.object({
    number: yup
      .string()
      .required(general.voucher.ErrorMessage)
      .matches(/^[0-9]+$/, general.voucher.valid)
      .length(3, general.voucher.length)
      .nullable(),
  });

  const [value, setValue] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    api
      .get("/voucher")
      .then(({ data }) => {
        setValue(data.voucherSetting.voucherCount);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);
  const formik = useFormik({
    initialValues: {
      number: value,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        AddVoucher(values)
          .then(({ data }) => {
            console.log(data.message);
          })
          .then(() => {
            setOpen(true);
            formik.resetForm();
            setValue(formik.values.number);
          })
          .catch((e) => {
            setOpenError(true)
            console.log(e)
          })
      );

      formik.resetForm();
      setValue(formik.values.number);
    },
  });

  return (
    <Col width={0.9} height={window.innerHeight - 49}>
      <Title>{general.voucher.VoucherTitle}</Title>
      <form
        style={{ width: "100%", height: "100%" }}
        onSubmit={formik.handleSubmit}
      >
        <ManualFields
          width={"40%"}
          fieldName={`${general.voucher.Label}: ${value}`}
          placeHolder={`${general.voucher.PlaceHolder}`}
          height={"50px"}
          id="number"
          name="number"
          value={
            formik.values.number === 0
              ? `${general.voucher.PlaceHolder}`
              : formik.values.number
          }
          onChange={formik.handleChange}
        ></ManualFields>

        {formik.errors.number && formik.touched.number && (
          <Row style={{ color: "red" }}>{formik.errors.number}</Row>
        )}

        <StyledButton type="submit" width={"100px"} height={"20px"}>
          {general.manualFields.save}{" "}
        </StyledButton>
      </form>
      <Alert
        autoHideDuration={2200}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        message={general.alertMessage}
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
    </Col>
  );
};
export default VoucherPage;
