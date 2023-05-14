import { FunctionComponent } from "react";
import { Row, Col, DropDownFields, ManualFields } from "ui/components";
import { styled, css, mq } from "ui/utils";
import { general } from "data";

const LayoutManualFields = styled(Col)(
  () => css`
    width: 40%;
    display: grid;
    grid-template-rows: calc(offsetHeight / 6);

    ${mq({
      paddingTop: ["5px", "5px", "5px", "5px", "30px", "30px"],
    })};
  `
);

const StyledRow = styled(Row)(
  () => css`
    width: 75%;

    ${mq({
      height: ["20px", "20px", "20px", "20px", "100px", "110px"],
    })};
  `
);



interface Props {
  formikValues?: any;
  handleChange?: any;
  formikErrors?: any;
  formikTouched?: any;
  formikSetField?: any;
}

const ManualFieldsBox: FunctionComponent<Props> = ({
  formikValues,
  handleChange,
  formikErrors,
  formikTouched,
  formikSetField,
}) => {
  return (
    <LayoutManualFields>
     
          <DropDownFields
            width={"75%"}
            placeHolder={general.manualFields.selectSupplier}
            fieldName={general.manualFields.supplier}
            height={"50px"}
            formikSetField={formikSetField}
            valueIn={formikValues.supplier}
          ></DropDownFields>

          {formikErrors.supplier && formikTouched.supplier && (
            <div style={{ color: "red" }}>{formikErrors.supplier}</div>
          )}
      
      
    
          <DropDownFields
            width={"75%"}
            placeHolder={general.manualFields.selectCustomer}
            fieldName={general.manualFields.customer}
            height={"50px"}
            type="customer"
            formikSetField={formikSetField}
            valueIn={formikValues.customer}
          ></DropDownFields>

          {formikErrors.customer && formikTouched.customer && (
            <div style={{ color: "red" }}>{formikErrors.customer}</div>
          )}
      

      
          <ManualFields
            width={"75%"}
            fieldName={general.manualFields.purchase}
            placeHolder={general.manualFields.purchase}
            height={"50px"}
            id="purchase"
            name="purchase"
            value={formikValues.purchase}
            onChange={handleChange}
          ></ManualFields>
          {formikErrors.purchase && formikTouched.purchase && (
            <div style={{ color: "red" }}>{formikErrors.purchase}</div>
          )}
       

      <ManualFields
        width={"75%"}
        fieldName={general.manualFields.quantity}
        placeHolder={"1"}
        height={"50px"}
        id="quantity"
        name="quantity"
        value={formikValues.quantity}
        onChange={handleChange}
      ></ManualFields>
      {formikErrors.quantity && formikTouched.quantity && (
        <div style={{ color: "red" }}>{formikErrors.quantity}</div>
      )}

     
          <ManualFields
            width={"75%"}
            fieldName={general.manualFields.sale}
            placeHolder={general.manualFields.sale}
            height={"50px"}
            id="sale"
            name="sale"
            value={formikValues.sale}
            onChange={handleChange}
          ></ManualFields>
          {formikErrors.sale && formikTouched.sale && (
            <div style={{ color: "red" }}>{formikErrors.sale}</div>
          )}
      
      <StyledRow />
    </LayoutManualFields>
  );
};

export default ManualFieldsBox;
