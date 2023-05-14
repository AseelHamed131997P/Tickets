import { FunctionComponent, useEffect, useState } from "react";
import { Row, Alert } from "ui/components";
import { useDispatch } from "hooks";
import { useLocation } from "react-router";
import { FaPrint } from "react-icons/fa";
import logo from "images/rahhal_Logo.png";
import IATA from "images/IATA_logo.png";
import { general } from "data";
import moment from "moment";
import { api } from "utils";
import { AddManualVoucher } from "actions/bisan";

const ManualTicketVoucher: FunctionComponent = () => {
  const location = useLocation<any>();
  const dispatch = useDispatch();
  console.log("iam in manualticket Voucher page");
  console.log(location.state);

  const [open, setOpen] = useState(false);

  const [openError, setOpenError] = useState(false);
  const [voucherNumber, setVoucherNumber] = useState<number | null>(null);
  useEffect(() => {
    api
      .get("/voucher")
      .then(({ data }) => {
        setVoucherNumber(data.voucherSetting.voucherCount + 1);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { passengersName, BNR, comment, supplier, purchase } =
    location.state || {};

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

            dispatch(
              AddManualVoucher({
                file: comment,
                cost: purchase,
                bnr: BNR,
                ticketNumber:
                  "MAN" +
                  `${moment().format("yyMDD")}`.toString() +
                  `${voucherNumber}`.toString(),
                airlineKey: " ",
                passengers: [passengersName],
                setOpen: setOpen,
                setOpenError: setOpenError,
              })
            );
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
          <span> Print & Save </span>
          {/* {voucherDone ? <span> Print </span> : <span> Print & Save </span>} */}
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
                        Messrs: {BNR}
                      </span>
                      <Row width="100px" />
                      <span>Supplier Name: {supplier.name}</span>
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
              Manual Voucher
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
              {voucherNumber} / {new Date().getFullYear()}
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

        {/* <div style={{ width: "950px",border:"1bx solid black"}}>
      {comment}
      </div> */}

        <table
          style={{
            borderCollapse: "collapse",
            border: "none",
            marginLeft: ".1in",
            marginRight: ".1in",
            width: "950px",
          }}
        >
          <tbody>
            <tr style={{ fontWeight: "bold" }}>
              <td
                style={{
                  border: "solid windowtext 1.0pt",
                  padding: "0in 5.4pt 0in 5.4pt",
                }}
                width="129"
                rowSpan={2}
              >
                Comment
              </td>
            </tr>
            <tr></tr>

            <tr>
              <td
                style={{
                  width: "100%",
                  border: "solid windowtext 1.0pt",
                  borderTop: "none",
                  padding: "0in 5.4pt 0in 5.4pt",
                  height: "250px",
                }}
              >
                {comment}
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ height: "30px" }} />
        <p style={{ textAlign: "left", marginLeft: "45px" }}>
          <span style={{ fontFamily: "Tahoma , sans-serif" }}>
            transportation as designated below and to:
          </span>
        </p>

        <table
          style={{
            // width: "293.4pt",
            borderCollapse: "collapse",
            border: "none",
            marginBottom: "200px",
            marginLeft: ".1in",
            marginRight: ".1in",
            width: "950px",
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
                width="400"
              >
                <p
                  style={{
                    textAlign: "left",
                    direction: "ltr",
                    unicodeBidi: "embed",
                  }}
                >
                  <strong>
                    <span style={{ fontFamily: "Tahoma , sans-serif" }}>
                      Passengers Name
                    </span>
                  </strong>
                </p>
              </td>
            </tr>

            <tr>
              <td
                style={{
                  width: "2.7in",
                  border: "solid windowtext 1.0pt",
                  borderTop: "none",
                  padding: " 0in 5.4pt 0in 5.4pt",
                  height: "150px",
                }}
                width="324"
              >
                <span>{passengersName}</span>
              </td>
            </tr>
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
              Date: {moment().format("DD/M/yy")}
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
          style={{
            borderCollapse: "collapse",
            border: "none",
            width: "100%",
          }}
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
        message={general.alertError}
        type="error"
      />
    </div>
  );
};
export default ManualTicketVoucher;
