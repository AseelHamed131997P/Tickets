import { FunctionComponent } from "react";
import { useEffect, useState } from "react";
import { Card, Creatable } from "ui/components";
import { styled, css } from "ui/utils";

import api from "utils/api";

const Title2 = styled.h2(
  ({ theme: { colors } }) => css`
    color: #988d8d;
    font-weight: bold;
    position: relative;

    left: 2px;
    right: 25px;
    font-size: large;
  `
);
interface Props {
  className?: string;
  fieldName: string;
  height?: string | string[];
  width: string | string[];
  placeHolder?: string;
  valueIn?: any;
  type?: string;
  formikSetField?: any;
}

const DropDownFields: FunctionComponent<Props> = ({
  fieldName,
  placeHolder,
  width,
  type,
  valueIn,
  formikSetField,
  className,
}) => {
  const [suppliers, setSuppliers] = useState<OptionType[]>([
    { name: " ", code: " " },
  ]);
  const [customers, setCustomers] = useState<OptionType[]>([
    { name: " ", code: " " },
  ]);

  useEffect(() => {
    api
      .get(type === "customer" ? "/bisan/customers" : "/bisan/suppliers", {
        headers: {
          bisan_token: localStorage.getItem("bisan_token"),
          bisan_account_id: localStorage.getItem("bisan_account_id"),
        },
      })
      .then(({ data }) => {
        // console.log(data.data);
        if (
          data["message"] !==
          "No Tickets Found , please change date and try again"
        ) {
          if (type === "customer") setCustomers(data.data.rows);
          else setSuppliers(data.data.rows);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Title2>{fieldName}</Title2>
      <Card bgcolor={"white"} width={width} height={"50px"}>
        <Creatable
          users={type === "customer" ? customers : suppliers}
          type={type}
          setUsers={type === "customer" ? setCustomers : setSuppliers}
          placeHolder={placeHolder}
          formikSetField={formikSetField}
          valueIn={valueIn}
        ></Creatable>
      </Card>
    </div>
  );
};

export default DropDownFields;

interface OptionType {
  inputValue?: string;
  name: string;
  code: string;
}
