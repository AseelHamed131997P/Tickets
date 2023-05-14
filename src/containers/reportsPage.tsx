import { FunctionComponent, useEffect, useState } from "react";
import {
  Row,
  Col,
  Report,
  Footer,
  Table,
  DatePickers,
  FlexBox,
} from "ui/components";
import { makeStyles } from "@material-ui/core/styles";
import { styled, css } from "ui/utils";
import { api } from "utils";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import Moment from "moment";
import { ClipLoader } from "react-spinners";
import { FaPrint } from "react-icons/fa";
import ReactToPrint from "react-to-print";
import { useRef } from "react";

const Title = styled.h2(
  () => css`
    color: #0a2f5a;
    font-weight: bold;
    display: flex;
    align-items: flex-end;
    font-size: x-large;
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
  StyleCol: {
    minHeight: "calc(100vh - 50px)",
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

  layout1: {
    width: "100%",

    display: "grid",
    gridAutoFlow: "row",

    alignItems: "center",
    justifyItems: "center",
    marginTop: "20px",
  },
  layout2: {
    width: "100%",
    // height:"460px",
    display: "flex",
    justifyContent: "center",

    flexWrap: "wrap",

    marginTop: "10px",

    gap: "17px",
    //  rowGap:"40px",
    //  columnGap:"10px"
  },

  // report: {
  //   rowGap: "50px",
  //   marginBottom: "50px",
  // },

  titleReport: {
    display: "none",
  },
  [`@media print`]: {
    titleReport: {
      display: "block",
    },

    pagebreak: {
      pageBreakAfter: "always",
    },
  },
}));

const ReportsPage: FunctionComponent = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  const classes = useStyles();
  type ContentType = { [key: string]: string };
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<ContentType[]>([]);
  const [selectedDateFrom, handleDateFromChange] = useState<Date | null>(
    new Date()
  );

  const onValueFromChange = (newValue: Date | null) => {
    handleDateFromChange(newValue);
  };
  const [selectedDateTo, handleDateToChange] = useState<Date | null>(
    new Date()
  );
  const [type, setType] = useState("Daily");
  const [type2, setType2] = useState("all");

  const onValueToChange = (newValue: Date | null) => {
    handleDateToChange(newValue);
  };
  const value1 = selectedDateFrom?.getTime();
  const value2 = selectedDateTo?.getTime();
  const timestampFrom = (value1! / 1000).toString().split(".")[0];
  const timestampTo = (value2! / 1000).toString().split(".")[0];

  useEffect(() => {
    setLoading(true);
    setReports([]);
    api
      .get(
        type === "System"
          ? "/report/from=" +
              timestampFrom +
              "&to=" +
              timestampTo +
              "&type=" +
              type2
          : "/report/from=" +
              timestampFrom +
              "&to=" +
              timestampTo +
              "&type=posted"
      )
      .then(({ data }) => {
        setReports(data.report);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [timestampFrom, timestampTo, type, type2]); // eslint-disable-line react-hooks/exhaustive-deps

  const [supplier, setSupplier] = useState<ContentType[]>([]);
  const [customer, setCustomer] = useState<ContentType[]>([]);
  const [users, setUsers] = useState<ContentType[]>([]);
  useEffect(() => {
    api
      .get("/bisan/suppliers", {
        headers: {
          bisan_token: localStorage.getItem("bisan_token"),
          bisan_account_id: localStorage.getItem("bisan_account_id"),
        },
      })
      .then(({ data }) => {
        setSupplier(data.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    api
      .get("/bisan/customers", {
        headers: {
          bisan_token: localStorage.getItem("bisan_token"),
          bisan_account_id: localStorage.getItem("bisan_account_id"),
        },
      })
      .then(({ data }) => {
        setCustomer(data.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .get("auth/users", {
        headers: {
          bisan_token: localStorage.getItem("bisan_token"),
          bisan_account_id: localStorage.getItem("bisan_account_id"),
        },
      })
      .then(({ data }) => {
        setUsers(data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getSavedReportsTable = () => {
    let tempReports = [];
    for (var i = 0; i < reports.length; i++) {
      tempReports.push({
        Type: reports[i].type
          ? reports[i].type
          : type2 === "saved"
          ? "system-ticket"
          : reports[i].type
          ? "system-ticket"
          : "manual-hotel",
        Description: reports[i].description ? "Sent to Bisan" : "Not sent yet",

        File: reports[i].file ? reports[i].file : "***",
        "Ticket Number": reports[i].ticketNumber
          ? reports[i].ticketNumber
          : "***",
        Date: reports[i].date
          ? Moment(`${reports[i].date}`).format("DD/MM/yy - hh:mm A")
          : Moment(`${reports[i].ticketDate}`).format("DD/MM/yy - hh:mm A"),
      });
    }
    return tempReports;
  };

  const handleChange = (event: any) => {
    setType(event.target.value);
  };
  const handleChange2 = (event: any) => {
    setType2(event.target.value);
  };

  return (
    <Col width={1} height={window.innerHeight - 48} className={classes.Layout}>
      <Col className="hidden-print">
        <Row width={1} height={"8%"} />
        <Row width={1} height={"50px"} className={classes.Header}>
          <Title>{`Reports   ${
            type === "System" ? "" : `: ${reports.length}`
          }`}</Title>
          <Row width={240}>
            <Col>
              <Row width={1} height={"10%"} />
              <Box sx={{ minWidth: 110, maxWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Ticket Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Type"
                    onChange={handleChange}
                    style={{ backgroundColor: "#FAFAFA" }}
                  >
                    <MenuItem value={"System"}>System</MenuItem>
                    <MenuItem value={"Daily"}>Daily</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Col>
            {type !== "System" ? null : (
              <Col>
                <Row width={1} height={"10%"} />
                <Box sx={{ minWidth: 110, maxWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      System Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type2}
                      label="Type2"
                      onChange={handleChange2}
                      style={{ backgroundColor: "#FAFAFA" }}
                    >
                      <MenuItem value={"all"}>All</MenuItem>
                      <MenuItem value={"saved"}>Saved</MenuItem>
                      <MenuItem value={"posted"}>Posted</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Col>
            )}
          </Row>
        </Row>

        <Row width={1} height={"10%"} />

        <Row width={"100%"} marginBottom={"50px"}>
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
      </Col>
      <Row width={"98%"} height={"35px"} justifyContent={"end"}>
        <ReactToPrint
          trigger={() => (
            <Button
              style={{
                width: "100px",
                height: "35px",
                color: "white",
                borderRadius: "20px",
                backgroundColor: "#0a2f5a",
              }}
            >
              <FaPrint /> &nbsp; Print
            </Button>
          )}
          content={() => componentRef.current}
        />
      </Row>

      <div
        className={
          reports.length > 0 && type !== "System"
            ? classes.layout2
            : classes.layout1
        }
        ref={componentRef}
      >
        <Col className={classes.titleReport} width="100%" height="20px">
          <Row
            width="100%"
            height="100%"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Row
              width={"100%"}
              height={"55.8px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              fontSize={"20px"}
            >
              DAILY REPORT{" "}
              <span style={{ fontFamily: "'Lobster', cursive" }}>
                &nbsp;#{reports.length}
              </span>
            </Row>
            <Row
              width={"100%"}
              height={"55.8px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              fontSize={"15px"}
            >
              FILTER:&nbsp;
              {selectedDateFrom?.toLocaleDateString("en-GB")} _{" "}
              {selectedDateTo?.toLocaleDateString("en-GB")}
            </Row>
            <Row
              width={"100%"}
              height={"55.8px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              fontSize={"15px"}
            >
              TODAY: {new Date().toLocaleDateString("en-GB")}
            </Row>
          </Row>
        </Col>
        {loading === true ? (
          <div className={classes.BoxMessage}>
            <FlexBox className={classes.message}>
              <ClipLoader css={override} color={"#0A2F5A"} size={55} />
            </FlexBox>
          </div>
        ) : reports.length > 0 ? (
          <>
            {type === "System" ? (
              reports.length > 0 ? (
                <Table content={getSavedReportsTable()} />
              ) : (
                <div className={classes.BoxMessage}>
                  <FlexBox className={classes.message}>
                    No reports found !!!!
                  </FlexBox>
                </div>
              )
            ) : (
              reports.map((item, index) => {
                const getSupplierName: () => string = () => {
                  for (var i = 0; i < supplier.length; i++) {
                    if (supplier[i].code === item.supplierContact) {
                      return supplier[i].name;
                    }
                  }
                  return " ";
                };
                const getCustomerName: () => string = () => {
                  for (var i = 0; i < customer.length; i++) {
                    if (customer[i].code === item.customerContact) {
                      return customer[i].name;
                    }
                  }
                  return " ";
                };
                const getUsersName: () => string = () => {
                  for (var i = 0; i < users.length; i++) {
                    if (users[i]._id === item.created_by) {
                      return users[i].username;
                    }
                  }
                  return " ";
                };
                return (
                  <>
                    <Report
                      className={
                        (index + 1) % 4 === 0 ? classes["@media print"] : ""
                      }
                      indexValue={index}
                      savedby={getUsersName()}
                      savedat={`${Moment(`${item.created_at}`).format(
                        "DD/M/yy - hh:mm A"
                      )}`}
                      type={item.type}
                      customerName={getCustomerName()}
                      supplierName={
                        item.airLineName ? item.airLineName : getSupplierName()
                      }
                      comment={item.comment}
                      quantity={item.quantity}
                      sale={item.saleCost}
                      net={item.purchaseCost}
                      purchaseStatus={item.purchaseStatus}
                      saleStatus={item.saleStatus}
                      key={index}
                    />

                    {(index + 1) % 4 === 0 ? (
                      //  <div className={styles["page-break"]} />
                      <Col
                        className={classes.titleReport}
                        width="100%"
                        height="85px"
                      ></Col>
                    ) : (
                      ""
                    )}
                  </>
                );
              })
            )}
          </>
        ) : (
          <div className={classes.BoxMessage}>
            <FlexBox className={classes.message}>No reports found !!!!</FlexBox>
          </div>
        )}
      </div>
      <Footer />
    </Col>
  );
};
export default ReportsPage;
