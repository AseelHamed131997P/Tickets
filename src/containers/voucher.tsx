import "./voucher.css";
import { FaPrint } from "react-icons/fa";
import logo from "images/rahhal_Logo.png";
import IATA from "images/IATA_logo.png";
import {
  FunctionComponent,
  Key,
  ReactChild,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";
import Moment from "moment";
import { useLocation } from "react-router";
import { useDispatch } from "hooks";
import { AddVoucher } from "actions/bisan";
import { general } from "data";
import { Alert } from "ui/components";
import moment from "moment";

const halfRowsNumber = Array(3).fill(0);

const Voucher: FunctionComponent = () => {
  const location = useLocation<any>();
  const dispatch = useDispatch();
  const {
    bnr,
    airLineKey,
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
  } = location.state || {};

  const voucherNum = voucherNumber;
  console.log("here the voucher number" + voucherNumber);

  const finalData = vFinalData.concat(
    Array(7 - vFinalData.length > 0 ? 7 - vFinalData.length : 0).fill(0)
  );
  const vPassengers = passengers.concat(
    Array(6 - passengers.length > 0 ? 6 - passengers.length : 0).fill(" ")
  );
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  let ObjectTime;
  let newRoute = routes.map((route: any) => {
    ObjectTime = route.time;

    for (let key of Object.keys(ObjectTime)) {
      if (ObjectTime[key] == null || ObjectTime[key] == "") {
        ObjectTime[key] = "null";
      }
    }
    return route;
  });

  return (
    <div
      key={"voucher"}
      style={{
        width: "990px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5px",
        position: "relative",
        margin: "auto",
      }}
    >
      <div>
        <h1
          className="upcomming hidden-print"
          style={{
            color: " #0a2f5a",
            fontSize: "35px",
            fontWeight: "bold",
          }}
        >
          Voucher
        </h1>
        <button
          className="tickets btn btn-info hidden-print"
          onClick={() => {
            window.print();
            if (!voucherDone) {
              dispatch(
                AddVoucher({
                  file: file,
                  cost: cost === undefined ? " " : cost,
                  bnr: bnr,
                  ticketNumber: ticketNumber
                    ? ticketNumber
                    : "SYS" +
                      `${moment().format("yyMDD")}`.toString() +
                      `${voucherNumber}`.toString(),
                  airlineKey: airLineKey ? airLineKey : " ",
                  passengers: passengers,
                  route: routes,
                  setOpen: setOpen,
                  setOpenError: setOpenError,
                })
              );
            }
          }}
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            color: "white",
            backgroundColor: "blue",
          }}
          type="button"
        >
          <FaPrint></FaPrint>
          {voucherDone ? <span> Print </span> : <span> Print & Save </span>}
        </button>
        <img
          alt={"logo"}
          src={logo}
          style={{
            width: "240px",
            height: "110px",
            marginLeft: "40px",
            marginBottom: "15px",
          }}
        />
        <table
          style={{
            width: "473.4pt",
            borderCollapse: "collapse",
            border: "none",
            marginLeft: ".1in",
            marginRight: ".1in",
          }}
          width="789"
        >
          <tbody>
            <tr style={{ height: "26.5pt" }}>
              <td
                style={{
                  width: "473.4pt",
                  border: "solid windowtext 1.0pt",
                  padding: "0in 5.4pt 0in 5.4pt",
                  height: "26.5pt",
                }}
                width="789"
              >
                <p style={{ textAlign: "center", marginBottom: "0" }}>
                  <strong>
                    <span style={{ fontFamily: "Tahoma sans-serif" }}>
                      <span style={{ float: "left", marginLeft: "35px" }}>
                        {`Messrs: ${bnr}`}
                      </span>
                      <span>{`At: ${airLineKey ? airLineKey : ""}`} </span>
                    </span>
                  </strong>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            float: "right",
            position: "relative",
            width: "160px",
            marginTop: "100px",
          }}
        >
          <img
            alt={"logo"}
            src={IATA}
            style={{
              width: "80px",
              position: "absolute",
              bottom: "20px",
              right: "0",
            }}
          />
          <p style={{ position: "absolute", margin: "0", bottom: "0" }}>
            <strong>
              <span style={{ color: "red" }}>IATA NO: 25-2 1033 4 </span>
            </strong>
          </p>
        </div>
        <p
          style={{
            marginLeft: "-9.0pt",
            textAlign: "center",
            marginTop: "55px",
          }}
        >
          <strong>
            <span style={{ fontFamily: "Tahoma ,sans-serif" }}>
              Exchange Voucher
            </span>
          </strong>
        </p>
        <p
          style={{
            marginBottom: "10px",
            marginLeft: "50px",
            fontWeight: "bold",
          }}
        >
          <strong>
            <span style={{ fontFamily: "Calibri , sans-serif" }}>
              {`No. ${voucherNum} / ${voucherYear}`}
            </span>
          </strong>
        </p>
        <p style={{ textAlign: "left", marginLeft: "45px" }}>
          <strong>
            <span style={{ fontFamily: "Tahoma , sans-serif" }}>&nbsp;</span>In
            exchange for this voucher please issue the following number of
            ticket(s) or airway
          </strong>
        </p>
        <table
          style={{
            borderCollapse: "collapse",
            border: "none",
            marginLeft: ".1in",
            marginRight: ".1in",
            width: "950px",
          }}
          className="big-table"
        >
          <tbody>
            <tr style={{ fontWeight: "bold" }}>
              <td
                style={{
                  width: "77.4pt",
                  border: "solid windowtext 1.0pt",
                  padding: "0in 5.4pt 0in 5.4pt",
                }}
                width="129"
                rowSpan={2}
              >
                Routing
              </td>
              <td
                style={{
                  width: "7%",
                  border: "solid windowtext 1.0pt",
                  borderLeft: "none",
                  padding: "0in 5.4pt 0in 5.4pt",
                }}
                rowSpan={2}
                width="99"
              >
                Via Carrier
              </td>
              <td
                style={{
                  width: "7%",
                  border: "solid windowtext 1.0pt",
                  borderLeft: "none",
                  padding: "0in 5.4pt 0in 5.4pt",
                }}
                rowSpan={2}
                width="90"
              >
                Flight No
              </td>
              <td
                style={{
                  width: "74.1pt",
                  border: "solid windowtext 1.0pt",
                  borderLeft: "none",
                  padding: "0in 5.4pt 0in 5.4pt",
                }}
                rowSpan={2}
                width="124"
              >
                Date
              </td>
              <td
                style={{
                  width: "80.15pt",
                  border: "solid windowtext 1.0pt",
                  borderLeft: "none",
                  padding: "0in 5.4pt 0in 5.4pt",
                }}
                rowSpan={2}
                width="134"
              >
                Time
              </td>
              <td
                style={{
                  width: "142.5pt",
                  border: "solid windowtext 1.0pt",
                  borderLeft: "none",
                  padding: "0in 5.4pt 0in 5.4pt",
                }}
                colSpan={2}
                width="238"
              >
                Fare
              </td>
              <td
                style={{
                  width: "12%",
                  border: "solid windowtext 1.0pt",
                  borderLeft: "none",
                  padding: "0in 5.4pt 0in 5.4pt",
                }}
                rowSpan={2}
                width="138"
              >
                Remarks
              </td>
            </tr>
            <tr>
              <td
                style={{
                  width: "117.0pt",
                  borderTop: "none",
                  borderLeft: "none",
                  borderBottom: "solid windowtext 1.0pt",
                  borderRight: "solid windowtext 1.0pt",
                  padding: "0in 5.4pt 0in 5.4pt",
                }}
              >
                &nbsp;
              </td>
              <td
                style={{
                  width: "25.5pt",
                  borderTop: "none",
                  borderLeft: "none",
                  borderBottom: "solid windowtext 1.0pt",
                  borderRight: "solid windowtext 1.0pt",
                  padding: "0in 5.4pt 0in 5.4pt",
                }}
              >
                &nbsp;
              </td>
            </tr>

            {finalData.map(
              (
                item: {
                  route: any;
                  airLineCode:
                    | boolean
                    | ReactChild
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined;
                  flightNo:
                    | boolean
                    | ReactChild
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined;
                  Date: any;
                  Time: any;
                },
                index: Key | null | undefined
              ) => {
                return (
                  <tr key={index}>
                    <td
                      style={{
                        width: "77.4pt",
                        border: "solid windowtext 1.0pt",
                        borderTop: "none",
                        padding: "0in 5.4pt 0in 5.4pt",
                      }}
                      width="129"
                    >
                      {item.route && `${item.route}`}
                    </td>
                    <td
                      style={{
                        width: "59.6pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                      }}
                      width="99"
                    >
                      {item.airLineCode}
                    </td>
                    <td
                      style={{
                        width: ".75in",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4p",
                      }}
                      width="90"
                    >
                      {item.flightNo}
                    </td>
                    <td
                      style={{
                        width: "20pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                      }}
                    >
                      {item.Date && `${item.Date}`}
                    </td>
                    <td
                      style={{
                        width: "12%",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                      }}
                      width="134"
                    >
                      {item.Time && `${item.Time}`}
                    </td>
                    <td
                      style={{
                        width: "117.0pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                      }}
                      width="195"
                    >
                      &nbsp;
                    </td>
                    <td
                      style={{
                        width: "25.5pt",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: "0in 5.4pt 0in 5.4pt",
                      }}
                      width="43"
                    >
                      &nbsp;
                    </td>
                    <td
                      style={{
                        width: "10%",
                        borderTop: "none",
                        borderLeft: "none",
                        borderBottom: "solid windowtext 1.0pt",
                        borderRight: "solid windowtext 1.0pt",
                        padding: " 0in 5.4pt 0in 5.4pt",
                      }}
                      width="138"
                    >
                      &nbsp;
                    </td>
                  </tr>
                );
              }
            )}
            {halfRowsNumber.map((item, index, halfRowsNumber) => {
              return (
                <tr key={index}>
                  <td
                    style={{
                      width: "137.0pt",
                      border: "none",
                      borderRight: "solid windowtext 1.0pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                    colSpan={2}
                    width="228"
                  >
                    &nbsp;
                  </td>
                  <td
                    style={{
                      width: "128.1pt",
                      borderTop: "none",
                      borderLeft: "none",
                      borderBottom: "solid windowtext 1.0pt",
                      borderRight: "solid windowtext 1.0pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                    colSpan={2}
                    width="214"
                  >
                    &nbsp;
                  </td>
                  <td
                    style={{
                      width: "80.15pt",
                      borderTop: "none",
                      borderLeft: "none",
                      borderBottom: "solid windowtext 1.0pt",
                      borderRight: "solid windowtext 1.0pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                    width="134"
                  >
                    &nbsp;
                  </td>
                  <td
                    style={{
                      width: "13%",
                      borderTop: "none",
                      borderLeft: "none",
                      borderBottom: "solid windowtext 1.0pt",
                      borderRight: "solid windowtext 1.0pt",
                      padding: " 0in 5.4pt 0in 5.4pt",
                    }}
                    width="195"
                  >
                    {index === 0 && (
                      <span>
                        {" "}
                        {cost === undefined
                          ? `0$ X ${passengers.length}`
                          : `${cost && cost.slice(3)} $ X ${
                              passengers.length
                            }`}{" "}
                      </span>
                    )}
                    {index + 1 === halfRowsNumber.length && (
                      <span>
                        Total:{" "}
                        {cost === undefined
                          ? `$`
                          : passengers.length > 1
                          ? `${cost && cost.slice(3) * passengers.length} $`
                          : `${cost && cost.slice(3)}  $`}
                      </span>
                    )}
                  </td>
                  <td
                    style={{
                      width: "25.5pt",
                      borderTop: "none",
                      borderLeft: "none",
                      borderBottom: "solid windowtext 1.0pt",
                      borderRight: "solid windowtext 1.0pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                    width="43"
                  >
                    &nbsp;
                  </td>
                  <td
                    style={{
                      width: "12%",
                      borderTop: "none",
                      borderLeft: "none",
                      borderBottom: "solid windowtext 1.0pt",
                      borderRight: "solid windowtext 1.0pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                    width="138"
                  >
                    &nbsp;
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        &nbsp;
        <div style={{ height: "25px" }}></div>
        <p style={{ textAlign: "left", marginLeft: "45px" }}>
          <span style={{ fontFamily: "Tahoma , sans-serif" }}>
            transportation as designated below and to:
          </span>
        </p>
        <table
          style={{
            width: "293.4pt",
            borderCollapse: "collapse",
            border: "none",
            marginLeft: "45px",
          }}
          width="489"
        >
          <tbody>
            <tr>
              <td
                style={{
                  width: "2.7in",
                  border: "solid windowtext 1.0pt",
                  padding: "0in 5.4pt 0in 5.4pt",
                }}
                width="324"
              >
                <p
                  style={{
                    textAlign: "center",
                    direction: "ltr",
                    unicodeBidi: "embed",
                  }}
                >
                  <strong>
                    <span style={{ fontFamily: "Tahoma , sans-serif" }}>
                      Names
                    </span>
                  </strong>
                </p>
              </td>
              <td
                style={{
                  width: "99.0pt",
                  border: "solid windowtext 1.0pt",
                  borderLeft: "none",
                  padding: "0in 5.4pt 0in 5.4pt",
                }}
                width="165"
              >
                <p
                  style={{
                    textAlign: "center",
                    direction: "ltr",
                    unicodeBidi: "embed",
                  }}
                >
                  <strong>
                    <span style={{ fontFamily: "Tahoma , sans-serif" }}>
                      Remark
                    </span>
                  </strong>
                </p>
              </td>
            </tr>

            {vPassengers.map((item: string, index: number) => {
              return (
                <tr key={index}>
                  <td
                    style={{
                      width: "2.7in",
                      border: "solid windowtext 1.0pt",
                      borderTop: "none",
                      padding: " 0in 5.4pt 0in 5.4pt",
                    }}
                    width="324"
                  >
                    <span>
                      {index + 1}. {item}
                    </span>
                  </td>
                  <td
                    style={{
                      width: "99.0pt",
                      borderTop: "none",
                      borderLeft: "none",
                      borderBottom: "solid windowtext 1.0pt",
                      borderRight: "solid windowtext 1.0pt",
                      padding: "0in 5.4pt 0in 5.4pt",
                    }}
                    width="165"
                  ></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p
          style={{
            marginRight: "45px",
            float: "right",
            textAlign: "justify",

            //  text-Justify: "kashida", textKashida: "0%",
            textIndent: "16.7pt",
            // tabStops: "center 207.65pt"
          }}
        >
          <strong>
            <span style={{ fontFamily: "Tahoma , sans-serif" }}>
              {`Date: ${Moment(`${voucherDate}`).format("DD/M/yy")}`}
            </span>
          </strong>
        </p>
        <p
          style={{
            marginLeft: "-9.0pt",
            textAlign: "justify",
            //  textJustify: "kashida", textKashida: "0%"
          }}
        >
          <span style={{ fontFamily: "Tahoma , sans-serif" }}>&nbsp;</span>
        </p>
        <table
          style={{ borderCollapse: "collapse", border: "none", width: "100%" }}
        >
          <tbody>
            <tr style={{ height: "41.35pt" }}>
              <td
                style={{
                  borderTop: "solid windowtext 1.0pt",
                  borderLeft: "none",
                  borderBottom: "solid windowtext 1.0pt",
                  borderRight: "none",
                  padding: "0in 5.4pt 0in 5.4pt",
                  height: "41.35pt",
                }}
              >
                <p style={{ textAlign: "center", margin: "0" }}>
                  <span style={{ fontFamily: "Arial , sans-serif" }}>
                    Address: al-Bireh,Al-Balou,star building , Palestine
                  </span>
                </p>
                <p style={{ textAlign: "center", margin: "0" }}>
                  <span style={{ fontFamily: "Arial , sans-serif" }}>
                    Tel :+970-2-2423256 Fax : + 972-2-2426692&nbsp; Email:
                    info@rahhaltours.ps
                  </span>
                </p>
                <p
                  style={{
                    marginRight: "-9.0pt",
                    textAlign: "center",
                    direction: "ltr",
                    unicodeBidi: "embed",
                    margin: "0",
                  }}
                >
                  <span style={{ fontFamily: "Arial , sans-serif" }}>
                    Web Site: www.rahhaltours.ps
                  </span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <p
          style={{
            marginLeft: "-9.0pt",
            textAlign: "justify",
            //  textJustify: "kashida", textKashida: "0%"
          }}
        >
          <span style={{ fontFamily: "Tahoma , sans-serif" }}>&nbsp;</span>
        </p>
      </div>

      <Alert
        autoHideDuration={2200}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        message={general.alertMessage}
      />

      <Alert
        autoHideDuration={2200}
        onClose={() => {
          setOpenError(false);
        }}
        open={openError}
        message={general.alertErrorMessage}
        type="error"
      />
    </div>
  );
};
export default Voucher;
