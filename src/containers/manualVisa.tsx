import { FunctionComponent } from "react";
import { Manual } from "ui/components";
import { general } from "data";

const ManualVisa: FunctionComponent = () => {
  let data =general.manualFields.VisaDetails;

  return (
    <Manual
      TitlePage={general.manualFields.manualVisa}
      item={data.item}
      unit={data.unit}
      description={data.description}
      manualType="manual-visa"
    ></Manual>
  );
};

export default ManualVisa;
