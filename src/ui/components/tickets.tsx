import { FunctionComponent, useEffect, useState } from "react";
import { styled, css } from "ui/utils";
import {
  Row,
  Col,
  FlexBox,
  Button,
  Airport,
  PassengersTicket,
} from "ui/components";

import { Icon } from "ui/components";

import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";

import api from "utils/api";

const Container = styled(FlexBox)(
  () => css`
    width: "100%";
  `
);

const StyleRow = styled(Row)(
  () => css`
    background-color: white;
    box-shadow: 0px 0px 10px 0.1px rgb(0 0 0 / 10%);
    margin-bottom: 50px;
  `
);

const Line = styled.div(
  () => css`
    background-color: #e3e3e3;
    width: 0.4%;
  `
);

const Circle = styled.div(
  () => css`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: #fafafa;
  `
);

const AirPortRow = styled(Col)(
  () => css`
    overflow: auto;

    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #005580;
      border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #005580;
    }
  `
);

const TicketRow = styled(FlexBox)(
  () => css`
    justify-content: space-between;
    width: 100%;
    height: 40px;
  `
);

const Time = styled(FlexBox)(
  () => css`
    position: relative;
    left: 2%;
    font-size: 1.4vw;
    color: #00284d;
  `
);

const TitleHeader = styled(FlexBox)(
  () => css`
    font-size: 2vw;
  `
);

const StyledTicketButton = styled(Button)(
  () => css`
    font-size: 0.8vw;
    margin: 1.5px;
    border-radius: 10px !important ;
  `
);

const StyledCloseButton = styled.button(
  () => css`
    font-size: 0.9vw;
    width: 22px;
    height: 22px;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    border-radius: 15px !important ;
    background-color: white;
    color: red;
    border: 2px solid red;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  `
);

const AirNumber = styled(FlexBox)(
  () => css`
    height: 230px;
    font-size: 2vw;
  `
);

const useStyles = makeStyles((theme) => ({
  ticket: {
    color: "#999a9b",

    fontSize: "1vw",
    fontWeight: "bold",
  },
  Passenger: {
    //  backgroundColor:"grey",
    dispaly: "flex",
    flexWrap: "wrap",
  },
  AirPortRow: {
    // backgroundColor:"#999a9b",
    paddingTop: "15px",
  },
  CloseRow: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: "35px",
  },

  arc: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "1px solid",
    backgroundColor: "white",
  },

  StyleButtSaved: {
    // background: "#24c6dc", /* fallback for old browsers */
    // background: "-webkit-linear-gradient( to bottom,#24c6dc, #514a9d"), /* Chrome 10-25, Safari 5.1-6 */
    background: "linear-gradient( to bottom,#24c6dc, #514a9d)",
  },
  StyleButtPosted: {
    background: "linear-gradient( to bottom,#76ee8a, #2a7734)",
  },
}));
type ContentType = { [key: string]: string | ContentType[] };

interface Props {
  className?: string;
  height?: string | string[];
  width?: string | string[];
  airlineName: string | ContentType[];
  ticketDate: string | ContentType[];
  file: string | ContentType[];
  cost: string | ContentType[];
  routes: any[];
  passengers: ContentType[];
  ticketsNumbers: any[];
  ticketNumber?: string | ContentType[];
  isDeleted: ContentType[];
  ticketID: string | ContentType[];
  onDeleteTicket: () => void;
  bnr?: string | ContentType[];
  airLineKey?: string | ContentType[];
  vYear?: string | ContentType[];
  ticketStatus: string | ContentType[];
  voucherDone: ContentType[];
}

const Tickets: FunctionComponent<Props> = ({
  airlineName,
  ticketDate,
  file,
  cost,
  routes,
  passengers,
  ticketsNumbers,
  ticketNumber,
  isDeleted,
  onDeleteTicket,
  bnr,
  airLineKey,
  ticketStatus,
  ticketID,
  voucherDone,
}) => {
  const Cstyle1: React.CSSProperties = {
    position: "relative",
    left: "100%",
    top: "-5%",
  };
  const Cstyle2: React.CSSProperties = {
    position: "relative",
    left: "100%",
    top: "0%",
  };
  const classes = useStyles();
  let PassengerNumber = 0;

  let voucherYear = new Date().getFullYear();
  let flightRoute = routes;

  let vFinalData: any[] = [];
  for (let key in flightRoute) {
    if (flightRoute.hasOwnProperty(key)) {
      let data = {
        route: flightRoute[key].from + " -> " + flightRoute[key].to,
        flightNo: flightRoute[key].time.flightNumber,
        airLineCode: flightRoute[key].time.airLineCode,
        Date:
          flightRoute[key].time.departDay +
          " - " +
          flightRoute[key].time.arriveDay,

        Time:
          flightRoute[key].time.departTime +
          "-" +
          flightRoute[key].time.arriveTime,
      };

      vFinalData.push(data);
    }
  }

  const [voucherNumber, setVoucherNumber] = useState<number | null>(null);
  const [voucherDate, setVoucherDate] = useState(Date());

  useEffect(() => {
    api
      .get(voucherDone ? "/voucher/" + ticketNumber : "/voucher")
      .then(({ data }) => {
        if (voucherDone) {
          setVoucherNumber(data.voucher.voucherId);
          setVoucherDate(data.voucher.created_at);
        } else {
          setVoucherNumber(data.voucherSetting.voucherCount + 1);
          setVoucherDate(Date());
        }
      })

      .catch((err) => {
        console.log(err);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const voucherData: { [key: string]: any } = {
    bnr,
    airLineKey,
    ticketStatus,
    voucherYear,
    passengers,
    vFinalData,
    voucherDate,
    voucherDone,
    cost,
    voucherNumber,
    ticketNumber,
    file,
    routes,
  };

  const ticketData = {
    ticketID,
    file,
    ticketsNumbers,
    ticketNumber,
    route: routes,
    passengers,
    ticketStatus,
    cost,
  };

  let history = useHistory();

  return (
    <Container>
      <StyleRow width={"80%"} height={"300px"}>
        <Col width={"79.6%"}>
          <Circle style={Cstyle1}></Circle>
          <Col width={"100%"} height={"255px"}>
            <TicketRow>
              <TitleHeader>{airlineName}</TitleHeader>
              <FlexBox>
                <Icon.Clock />
                <Time> {ticketDate.toString().split("T")[0]}</Time>
              </FlexBox>
            </TicketRow>
            <AirPortRow
              className={classes.AirPortRow}
              width={"100%"}
              height={"175px"}
            >
              {routes &&
                routes.map((route, key) => {
                  return <Airport user={route} key={key} />;
                })}
              <Row className={classes.Passenger} width={"100%"}>
                {passengers &&
                  passengers.map((Passenger, index) => {
                    PassengerNumber = index + 1;
                    return (
                      <PassengersTicket
                        key={index}
                        passengers={Passenger}
                        PassengerNumber={PassengerNumber}
                        ticketsNumbers={ticketsNumbers[index]}
                      />
                    );
                  })}
              </Row>
            </AirPortRow>
            <TicketRow>
              <FlexBox>
                <Icon.Dolar />
                <div className={classes.ticket}>
                  {" "}
                  Cost: {cost === undefined ? `No cost` : cost}
                </div>
              </FlexBox>
              <FlexBox>
                {!isDeleted && (
                  <>
                    <StyledTicketButton
                      height={"30px"}
                      width={"10vw"}
                      className={
                        voucherDone
                          ? classes.StyleButtPosted
                          : classes.StyleButtSaved
                      }
                      onClick={() =>
                        history.push({
                          pathname: "/voucher",
                          state: voucherData,
                        })
                      }
                    >
                      Voucher
                    </StyledTicketButton>
                    <StyledTicketButton
                      height={"30px"}
                      width={"10vw"}
                      className={
                        ticketStatus === "Posted"
                          ? classes.StyleButtPosted
                          : classes.StyleButtSaved
                      }
                      onClick={() =>
                        history.push({
                          pathname: "/manual-tickets",
                          search: "system-ticket",
                          state: ticketData,
                        })
                      }
                    >
                      Bisan
                    </StyledTicketButton>
                  </>
                )}
              </FlexBox>
            </TicketRow>
          </Col>
          <Circle style={Cstyle2}></Circle>
        </Col>
        <Line></Line>
        <Col width={"20%"}>
          <Row className={classes.CloseRow}>
            {!isDeleted && (
              <StyledCloseButton onClick={onDeleteTicket}>X</StyledCloseButton>
            )}
          </Row>
          <AirNumber>{file}</AirNumber>
        </Col>
      </StyleRow>
    </Container>
  );
};

export default Tickets;
