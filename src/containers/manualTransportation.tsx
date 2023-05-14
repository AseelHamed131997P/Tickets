import { FunctionComponent } from "react";
import { Manual } from "ui/components";
import { general } from "data";

const ManualTransportation: FunctionComponent = () => {
  let data =general.manualFields.TransportationDetails;

  return (
    <Manual
      TitlePage={general.manualFields.manualTransp}
      item={data.item}
      unit={data.unit}
      description={data.description}
      manualType="manual-transportation"
    ></Manual>
  );
};

export default ManualTransportation;
