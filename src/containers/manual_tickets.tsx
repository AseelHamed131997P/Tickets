import { FunctionComponent, useEffect, useState } from "react";
import { Manual } from "ui/components";
import { general } from "data";
import { useLocation } from "react-router-dom";

const ManualTicket: FunctionComponent = () => {
  const [ticketData, setTicketData] = useState<any>({});
  const [system, setSystem] = useState<any>("ticket");
  const location = useLocation();

  useEffect(() => {
    setTicketData(location.state);
    setSystem(location.search);
  }, [location]);
let data =general.manualFields.TicketDetails;
  return (
    <Manual
      TitlePage={general.manualFields.ManualTicket}
      item={data.item}
      unit={data.unit}
      description={data.description}
      ticketData={ticketData}
      system={system}
      manualType="manual-ticket"
    ></Manual>

  //   <Manual
  //   TitlePage={general.manualFields.ManualTicket}
  //   item={general.manualFields.TicketItem}
  //   unit={general.manualFields.TCKT}
  //   description={general.manualFields.Ticket}
  //   ticketData={ticketData}
  //   system={system}
  //   manualType="manual-ticket"
  // ></Manual>
  );
};

export default ManualTicket;
