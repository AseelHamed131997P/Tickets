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
  t: {
    //  backgroundColor:"grey",
  },
}));

interface Props {
  className?: string;
  user: any;
}

const Airport: FunctionComponent<Props> = ({ user, ...props }) => {
  const classes = useStyles();
  return (
    <>
      <Row className={classes.t} width={"100%"} height={"80px"}>
        <Row width={"50%"} height={"80px"}>
          <Col>
            {" "}
            <Icon.Departure />
          </Col>
          <Col width={"100%"}>
            <Row className={classes.ticket} height={"30px"}>
              Departures: {user.time.departTime} {user.time.departDay}
            </Row>
            <Row className={classes.ticket} height={"30px"}>
              {user.from}
            </Row>
          </Col>
        </Row>

        <Row width={"50%"} height={"80px"}>
          <Col>
            <Icon.Arrival />
          </Col>
          <Col width={"100%"}>
            <Row className={classes.ticket} height={"30px"}>
              Arrival: {user.time.arriveTime} {user.time.arriveDay}
            </Row>
            <Row className={classes.ticket} height={"30px"}>
              {user.to}
            </Row>
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default Airport;
