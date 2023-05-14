import { FunctionComponent, useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  DatePickers,
  TicketSample,
  FlexBox,
  Footer,
} from "ui/components";
import { api } from "utils";
import { makeStyles } from "@material-ui/core/styles";
import { styled, css } from "ui/utils";
import { Icon } from "ui/components";
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment";

const Title = styled.h2(
  () => css`
    color: #0a2f5a;
    font-weight: bold;
    display: flex;
    align-items: flex-end;
    font-size: xx-large;
  `
);
const override = css`
  border-width: 4px;
`;

const useStyles = makeStyles((theme) => ({
  Layout: {
    display: "grid",
    gridTemplateRows: " auto 1fr auto",
  },
  Header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  message: {
    fontFamily: "Zen Antique , serif",
    fontSize: "x-large",
  },
  BoxMessage: {
    height: "100%",
    paddingBottom: "50px",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  styleColorTicket: {
    backgroundColor: "#0a2f5a",
    color: "white",

    "&:hover": {
      backgroundColor: "#0a2f5a",
    },
  },
  styleColorDel: {
    backgroundColor: "#fff176",
    color: "black",
    "&:hover": {
      backgroundColor: "#fff176",
    },
  },
}));

const TicketsPage: FunctionComponent = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [tickets, setTickets] = useState<ContentType[]>([]);
  type ContentType = { [key: string]: ContentType[] };
  const [selectedDateFrom, handleDateFromChange] = useState<Date | null>(
    localStorage.getItem("dateFrom")
      ? moment(localStorage.getItem("dateFrom"))?.toDate()
      : new Date()
  );

  const onValueFromChange = (newValue: Date | null) => {
    handleDateFromChange(newValue);
    localStorage.setItem("dateFrom", `${newValue}`);
  };
  const [selectedDateTo, handleDateToChange] = useState<Date | null>(
    localStorage.getItem("dateTo")
      ? moment(localStorage.getItem("dateTo"))?.toDate()
      : new Date()
  );

  const onValueToChange = (newValue: Date | null) => {
    handleDateToChange(newValue);
    localStorage.setItem("dateTo", `${newValue}`);
  };
  const value1 = selectedDateFrom?.getTime();
  const value2 = selectedDateTo?.getTime();
  const timestampFrom = (value1! / 1000).toString().split(".")[0];
  const timestampTo = (value2! / 1000).toString().split(".")[0];
  const [id, setId] = useState<string | ContentType[]>("");
  useEffect(() => {
    if (id !== "") {
      api
        .delete("/tickets/" + id)

        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  useEffect(() => {
    setLoading(true);

    setTickets([]);
    api
      .get(
        deleted
          ? "/tickets/deleted/from=" + timestampFrom + "&to=" + timestampTo
          : "/tickets/from=" + timestampFrom + "&to=" + timestampTo
      )
      .then(({ data }) => {
        if (
          data["message"] !==
          "No Tickets Found , please change date and try again"
        ) {
          setTickets(data.tickets);
          console.log(tickets);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [timestampFrom, timestampTo, deleted, id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Col width={1} height={window.innerHeight - 48} className={classes.Layout}>
      <Col>
        <Row width={1} height={"8%"} />
        <Row width={1} height={"50px"} className={classes.Header}>
          <Title>Tickets : {tickets.length}</Title>

          <Col>
            <Row width={1} height={"10%"} />
            <Button
              height={"45px"}
              width={"130px"}
              className={
                deleted ? classes.styleColorDel : classes.styleColorTicket
              }
              onClick={() => {
                setDeleted(!deleted);
              }}
            >
              {deleted ? (
                <>
                  <Icon.TicketButton /> &nbsp;Tickets{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Icon.Delete /> &nbsp;Deleted{" "}
                </>
              )}
            </Button>
          </Col>
        </Row>

        <Row width={1} height={"10%"} />

        <Row width={"100%"}>
          <DatePickers
            labelName={"Date From:"}
            selectedDate={selectedDateFrom}
            onValueChange={onValueFromChange}
            width={"50%"}
            page="ticket"
          />

          <DatePickers
            labelName={"Date To:"}
            selectedDate={selectedDateTo}
            onValueChange={onValueToChange}
            width={"50%"}
            page="ticket"
          />
        </Row>

        <Row width={1} height={"100px"} />
      </Col>

      <Col>
        {loading === true ? (
          <div className={classes.BoxMessage}>
            <FlexBox className={classes.message}>
              <ClipLoader css={override} color={"#0A2F5A"} size={55} />
            </FlexBox>
          </div>
        ) : (
          <>
            {tickets.length > 0 ? (
              tickets.map((ticket, key) => {
                return (
                  <TicketSample
                    key={key}
                    airlineName={ticket.airlineName}
                    airLineKey={ticket.airLineKey}
                    vYear={ticket.year}
                    voucherDone={ticket.voucherDone}
                    bnr={ticket.bnr}
                    file={ticket.file}
                    cost={ticket.cost}
                    ticketDate={ticket.ticketDate}
                    routes={ticket.route}
                    passengers={ticket.passengers}
                    ticketsNumbers={ticket.ticketsNumbers}
                    ticketNumber={ticket.ticketNumber}
                    isDeleted={ticket.deleted}
                    ticketID={ticket._id}
                    ticketStatus={ticket.status}
                    onDeleteTicket={() => {
                      setId(ticket._id);
                    }}
                  />
                );
              })
            ) : (
              <div className={classes.BoxMessage}>
                <FlexBox className={classes.message}>
                  No tickets found !!!!
                </FlexBox>
              </div>
            )}
          </>
        )}
      </Col>
      <Footer />
    </Col>
  );
};
export default TicketsPage;
