import { FunctionComponent } from "react";
import { Col, Menu, ManualFields, Button } from "ui/components";
import { general } from "data";
import { styled, css } from "ui/utils";

const StyledButton = styled(Button)(
  () => css`
    position: relative;
    top: 10px;
    padding: 1.5rem;
    background-color: #0a2f5a;
  `
);

interface Props {
  spaceValue?: string;
  id?: string;
  name?: string;
  value?: any;
  onChange?: any;
  unit: string;
  item: string;
  formikErrors?: any;
  formikTouched?: any;
  description: string;
  ticketStatus?: string;
  manualType?: string;
  type?: string;
  formikSetFieldValue?: any;
  returnType?: any;
}

const ManualBox: FunctionComponent<Props> = ({
  spaceValue,
  id,
  name,
  value,
  onChange,
  unit,
  item,
  description,
  ticketStatus,
  formikErrors,
  formikTouched,
  manualType,
  type,
  formikSetFieldValue,
  returnType,
}) => {
  return (
    <Col paddingTop={spaceValue ? { spaceValue } : "0px"}>
      <Menu unit={unit} item={item} description={description} />
      <ManualFields
        width={"100%"}
        height={"140px"}
        fieldName={general.manualFields.comment}
        placeHolder={general.manualFields.leave}
        box={"textarea"}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      ></ManualFields>
      {formikErrors && formikTouched && (
        <div style={{ color: "red" }}>{formikErrors}</div>
      )}
      <Col
        height={"60px"}
        width={1}
        style={{ display: "flex", justifyContent: "center", columnGap: "10px" }}
      >
        {
          <StyledButton
            type="submit"
            height={"40px"}
            width={"150px"}
            onClick={() =>
              formikSetFieldValue 
                ? formikSetFieldValue("isSecondButton", "false")
                : null
            }
          >
            {ticketStatus && ticketStatus === "Posted"
              ? "resend"
              : general.manualFields.bisan}
          </StyledButton>
        }
        {manualType === "manual-ticket" && type !== "system-ticket" ? (
          <StyledButton
            type="submit"
            height={"40px"}
            width={"150px"}
            onClick={() => formikSetFieldValue("isSecondButton", "true")}
          >
            {general.manualFields.voucher}{" "}
          </StyledButton>
        ) : null}
      </Col>
    </Col>
  );
};

export default ManualBox;
