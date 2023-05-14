import { FunctionComponent } from "react";
import { Row, Col } from "ui/components";
import { makeStyles } from "@material-ui/core/styles";
import { styled, css } from "ui/utils";

import plane from "images/plane1.png";

const StyleReport = styled(Row)(
  () => css`
    width: 100%;
    border-radius: 15px;
    // padding: 10px 0px 10px 0px;
    margin: auto;
  `
);

const Title = styled.h2(
  () => css`
    color: #0a2f5a;
    font-weight: bold;

    font-size: 1.5vw;
  `
);

const Field = styled(Row)(
  () => css`
    /* font-size: 1.2vw; */
    font-size: 16px;
    font-weight: bold;
    font-family: "Zen Antique", serif;
  `
);

const Data = styled(Row)(
  () => css`
    font-family: "Zen Antique", serif;
  `
);

const useStyles = makeStyles((theme) => ({
  Styleremove: {
    "& .css-1ui8tgf": {
      paddingLeft: "-.75",
      paddingRight: "-.75",
    },
  },

  StyleCol: {
    display: "grid",
    gridAutoFlow: "row",
    "& .css-14wj5ls": {
      paddingLeft: "0",
      paddingRight: "0",
    },
    "& .css-3rqrcm": {
      paddingLeft: "0",
      paddingRight: "0",
    },

    "& .css-45jj8t": {
      paddingLeft: "0",
      paddingRight: "0",
    },

    "& .css-1ji3pnt": {
      paddingLeft: "0",
      paddingRight: "0",
    },
    "& .css-1muqwjk": {
      paddingLeft: "0",
      paddingRight: "0",
    },

    " & .css-9n8w2s": {
      paddingLeft: "0",
      paddingRight: "0",
    },
    " &  .css-1baseyd": {
      paddingLeft: "0",
      // paddingRight: "0",
    },

    // gap: "20px",
  },

  StyleComment: {
    " & .css-104a5bf": {
      paddingLeft: "0",
      paddingRight: "0",
    },
  },

  StyleText: {
    " & .css-176mv3i": {
      paddingLeft: "0",
      paddingRight: "0",
    },
  },

  StyleBackground: {
    backgroundImage: `url(${plane})`,
    backgroundPosition: "top left",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
  },
  animate: {
    fontSize: "11px",
    fontWeight: "bold",
    "&:hover": {
      fontSize: "15px",
      transition: "all .2s ease-out",
    },
  },

  redCircle: {
    border: "1px solid red",

    backgroundColor: "red",
  },
  greenCircle: {
    border: "1px solid green",

    backgroundColor: "green",
  },
}));

interface Props {
  indexValue: number;
  supplierName: string;
  customerName: string;
  comment: string;
  savedby: string;
  savedat: any;
  type: string;
  quantity: string;
  sale: string;
  net: string;
  purchaseStatus: any;
  saleStatus: any;
  className: any;
}

const Report: FunctionComponent<Props> = ({
  indexValue,
  supplierName,
  savedat,
  customerName,
  comment,
  savedby,
  type,
  quantity,
  sale,
  net,
  purchaseStatus,
  saleStatus,
  className,
}) => {
  const titles = [
    "Saved by:",
    "Saved at:",
    "Type:",
    "Quantity:",

    type === "Transportation sale return" ||
    type === "Ticket sale return" ||
    type === "Insurance sale return" ||
    type === "Visa sale return" ||
    type === "Hotel sale return"
      ? "Price:"
      : type === "Transportation purchase return" ||
        type === "Ticket purchase return" ||
        type === "Insurance purchase return" ||
        type === "Visa purchase return" ||
        type === "Hotel purchase return"
      ? " "
      : "Sale:",
    type === "Transportation purchase return" ||
    type === "Ticket purchase return" ||
    type === "Insurance purchase return" ||
    type === "Visa purchase return" ||
    type === "Hotel purchase return"
      ? "Price:"
      : type === "Transportation sale return" ||
        type === "Ticket sale return" ||
        type === "Insurance sale return" ||
        type === "Visa sale return" ||
        type === "Hotel sale return"
      ? " "
      : "Net:",
    "Comments:",
    "FOR:",
    "TICKET NUM:",
    "TRAVEL DATE:",
  ];
  let reportData = [
    savedby,
    `${savedat}`,
    type ? type : "manual-hotel",
    quantity,
    sale,
    net,
  ];

  reportData = reportData.concat(
    comment ? (comment.includes("\n") ? comment.split("\n") : comment) : ""
  );

  const classes = useStyles();

  return (
    <>
      <Col
        className={className}
        style={{
          border: "1px solid black",
          width: "47%",
          height: "460px",
          backgroundImage: `url(${plane})`,
          backgroundPosition: "top left",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <Col width={1} style={{ paddingLeft: "0", paddingRight: "0" }}>
          <Row width={1} height={"20px"} alignItems={"center"}>
            <span style={{ fontSize: "15px", fontWeight: "bold" }}>
              {indexValue + 1}
              &nbsp;
            </span>

            <span
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "10px",
              }}
              className={
                purchaseStatus === false ||
                saleStatus === false ||
                purchaseStatus === undefined ||
                saleStatus === undefined
                  ? classes.redCircle
                  : classes.greenCircle
              }
            />
          
              <Row
                style={{ width: "95%", justifyContent: "end", fontSize: "11" }}
              >
                purchase: {purchaseStatus ? "success" : "fail"} &nbsp; sale:{" "}
                {saleStatus ? "success" : "fail"}
              </Row>
            
          </Row>
          <Row width={"100%"} height={"15px"} />
          <Row width={1} justifyContent={"space-between"}>
            {supplierName && <Title>{supplierName} </Title>}
            <Title>{customerName}</Title>
          </Row>
          <Row width={"100%"} height={"10px"} />
          <Col
            width={"100%"}
            className={classes.StyleCol}
            style={{ paddingLeft: "0", paddingRight: "0" }}
          >
            <StyleReport>
              <Col
                width={"75%"}
                className={classes.StyleCol}
                style={{ paddingLeft: "0", paddingRight: "0" }}
              >
                {reportData.map((data, key) => {
                  if (key <= 2)
                    return (
                      <Data
                        key={key}
                        style={{ fontSize: "15px", fontWeight: "bold" }}
                      >
                        {titles[key]}
                        &nbsp;&nbsp;&nbsp;
                        {data}
                      </Data>
                    );
                  return " ";
                })}
              </Col>

              <Col
                width={"10%"}
                className={classes.StyleCol}
                style={{ paddingLeft: "0", paddingRight: "0" }}
              >
                {reportData.map((data, key) => {
                  if (key > 2 && key < 6)
                    return (
                      <Data
                        key={key}
                        style={{ fontSize: "15px", fontWeight: "bold" }}
                      >
                        {titles[key]}
                        &nbsp;&nbsp;
                        {data}
                      </Data>
                    );
                  return " ";
                })}
              </Col>
            </StyleReport>
          </Col>
        </Col>

        <Col width={"100%"} style={{ paddingLeft: "0", paddingRight: "0" }}>
          <Col
            width={"100%"}
            marginBottom={"5px"}
            height={"22px"}
            className={classes.StyleText}
            style={{ paddingLeft: "0", paddingRight: "0" }}
          >
            {titles.map((title, key) => {
              if (key === 6) return <Field key={key}>{title}</Field>;
              return " ";
            })}
          </Col>

          <Col
            width={"100%"}
            height={"265px"}
            className={classes.Styleremove}
            style={{ columns: "2", paddingLeft: "0", paddingRight: "0" }}
          >
            {reportData.map((data, key) => {
              if (key >= 6)
                return (
                  <Data key={key} className={classes.animate}>
                    {data}
                  </Data>
                );
              return " ";
            })}
          </Col>
        </Col>
      </Col>
    </>
  );
};
export default Report;
