import { FunctionComponent } from "react";
import { Manual } from "ui/components";
import { general } from "data";

const ManualInsurance: FunctionComponent = () => {
  let data =general.manualFields.InsuranceDetails;

  return (
    <Manual
      TitlePage={general.manualFields.manualInsurance}
      item={data.item}
      unit={data.unit}
      description={data.description}
      manualType="manual-insurance"
    ></Manual>
  );
};

export default ManualInsurance;
