import { FunctionComponent } from "react";
import { Row, Col } from "ui/components";
import { makeStyles } from "@material-ui/core/styles";
import { Icon } from "ui/components";

const useStyles = makeStyles((theme) => ({
  ticket: {
    color: "#999a9b",

    fontSize: "1vw",
    fontWeight: "bold",
  },
}));
type ContentType = { [key: string]: string | ContentType[] };
interface Props {
  className?: string;

  passengers: ContentType;
  ticketsNumbers: string;
  PassengerNumber: any;
}

const PassengersTicket: FunctionComponent<Props> = ({
  passengers,

  PassengerNumber,
  ticketsNumbers,
}) => {
  const classes = useStyles();
  return (
    <>
      <Row width={"50%"} height={"80px"}>
        <Col>
          <Icon.Passenger />
        </Col>
        <Col width={"100%"}>
          <Row className={classes.ticket} height={"26px"}>
            Passenger {PassengerNumber}:
          </Row>
          <Row className={classes.ticket}>{passengers}</Row>
          <Row className={classes.ticket} height={"26px"}>
            {ticketsNumbers}
          </Row>
        </Col>
      </Row>
      <Row height={"10px"}></Row>
    </>
  );
};

export default PassengersTicket;
