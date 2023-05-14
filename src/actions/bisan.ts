import {
  BisanConfigPayload,
  AddCustomersAndSuppliersPayload,
  InvoicePayload,
  VoucherPayload,
  InvoicePayloadForHotel,
  ManualVoucherPayload,
  ReturnsPayload,
} from "types";
import { api } from "utils";
import { Dispatch } from "redux";
import { LOGIN_SUCCESS, LOGOUT } from "./types";

export const BisanConfig =
  ({ accountId, appId, appSecret, username, password }: BisanConfigPayload) =>
  (dispatch: Dispatch) => {
    return api
      .post("/bisan/config", {
        accountId: accountId,
        appId: appId,
        appSecret: appSecret,
        username: username,
        password: password,
      })
      .then(() => {
        api
          .post("/bisan/login")
          .then(({ data }) => {
            console.log(data);

            dispatch({
              type: LOGIN_SUCCESS,
              payload: { user: localStorage.getItem("user") },
            });

            return Promise.resolve();
          })
          .catch((error) => {
            console.log("err", error);
            window.alert("Wrong Credentials , Please Try again");
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
            dispatch({
              type: LOGOUT,
            });

            return Promise.reject();
          });
      })
      .catch((error) => {
        window.alert("Bisan configuration failed");
        console.log("err", error);
        return Promise.reject();
      });
  };

export const AddCustomers = ({
  userName,
  userEmail,
  userMobile,
  userPhone,
}: AddCustomersAndSuppliersPayload) =>
  api.post("/bisan/customers", {
    mobile: userMobile,
    phone: userPhone,
    email: userEmail,
    isCustomer: true,
    cusContactAR: userName,
    cusContactEN: userName,
  });
export const AddManualVoucher =
  ({
    file,
    cost,
    bnr,
    ticketNumber,
    airlineKey,
    passengers,
    setOpen,
    setOpenError,
  }: ManualVoucherPayload) =>
  (dispatch: Dispatch) => {
    console.log(ticketNumber);
    api
      .post("/voucher", {
        file: file,
        cost: cost,
        bnr: bnr,
        ticketNumber: ticketNumber,
        airlineKey: airlineKey,
        passengers: passengers,
      })
      .then(({ data }) => {
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data));
        }

        console.log(data);
        setOpen(true);

        return Promise.resolve();
      })
      .catch((error) => {
        setOpenError(true);
        console.log("err", error);
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return Promise.reject();
      });
  };

export const AddSuppliers = ({
  userName,
  userEmail,
  userMobile,
  userPhone,
}: AddCustomersAndSuppliersPayload) =>
  api.post("/bisan/suppliers", {
    phone: userPhone,
    mobile: userMobile,
    email: userEmail,
    isSupplier: true,
    supContactAR: userName,
    supContactEN: userName,
  });

export const AddInvoiceAndPurchaseInvoice =
  ({
    supplier,
    customer,
    sale,
    purchase,
    quantity,
    comment,
    item,
    type,
    ticketData,
    setOpen,
    setOpenError,
  }: InvoicePayload) =>
  (dispatch: Dispatch) => {
    if (type === "system-ticket") {
      api
        .post("/bisan/send", {
          _id: ticketData.ticketID,
          file: ticketData.file,
          type: type,
          purchaseCost: purchase.trim(),
          saleCost: sale.trim(),
          ticketNumber: ticketData.ticketNumber,
          ticketsNumbers: ticketData.ticketsNumbers,
          passengers: ticketData.passengers,
          route: ticketData.route,
          comment: comment,
          supplierContact: supplier.code,
          customerContact: customer.code,
          quantity: quantity,
          item: item,
        })
        .then(({ data }) => {
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data));
          }

          console.log(data);
          setOpen(true);
          return Promise.resolve();
        })
        .catch((error) => {
          setOpenError(true);
          console.log("err", error);
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(message);
          return Promise.reject();
        });
    } else {
      api
        .post("/bisan/send", {
          type: type,
          purchaseCost: purchase.trim(),
          saleCost: sale.trim(),
          comment: comment,
          supplierContact: supplier.code,
          customerContact: customer.code,
          quantity: quantity,
          item: item,
        })
        .then(({ data }) => {
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data));
          }

          console.log(data);
          setOpen(true);
          return Promise.resolve();
        })
        .catch((error) => {
          setOpenError(true);
          console.log("err", error);
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(message);
          return Promise.reject();
        });
    }
  };

export const AddVoucher =
  ({
    file,
    cost,
    bnr,
    ticketNumber,
    airlineKey,
    passengers,
    route,
    setOpen,
    setOpenError,
  }: VoucherPayload) =>
  (dispatch: Dispatch) => {
    api
      .post("/voucher", {
        file: file,
        cost: cost,
        bnr: bnr,
        ticketNumber: ticketNumber,
        airlineKey: airlineKey,
        passengers: passengers,
        route: route,
      })
      .then(({ data }) => {
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data));
        }

        console.log(data);
        setOpen(true);
        return Promise.resolve();
      })
      .catch((error) => {
        setOpenError(true);
        console.log("err", error);
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return Promise.reject();
      });
  };
export const AddInvoiceAndPurchaseInvoiceForHotel =
  ({
    supplier,
    customer,
    sale,
    purchase,
    quantity,
    comment,
    checkIn,
    checkOut,
    item,
    setOpen,
    setOpenError,
  }: InvoicePayloadForHotel) =>
  (dispatch: Dispatch) => {
    api
      .post("/bisan/send", {
        purchaseCost: purchase.trim(),
        saleCost: sale.trim(),
        comment: comment,
        supplierContact: supplier.code,
        customerContact: customer.code,
        quantity: quantity,
        checkIn: checkIn,
        checkOut: checkOut,
        item: item,
      })
      .then(({ data }) => {
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data));
        }

        console.log(data);
        setOpen(true);
        return Promise.resolve();
      })
      .catch((error) => {
        setOpenError(true);
        console.log("err", error);
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return Promise.reject();
      });
  };

export const AddReturnsToBisan =
  (
    {
      supplier,
      customer,
      sale,
      purchase,
      quantity,
      comment,
      setOpen,
      setOpenError,
    }: ReturnsPayload,

    itemType: string
  ) =>
  (dispatch: Dispatch) => {
    console.log("here in action");
    console.log(itemType);
    let item;
    if (itemType === "Ticket") {
      item = "000000001";
    } else if (itemType === "Visa") {
      item = "000000002";
    } else if (itemType === "Transportation") {
      item = "000000006";
    } else if (itemType === "Insurance") {
      item = "000000005";
    } else {
      item = "000000003";
    }

    console.log(item);
    api
      .post("/bisan/returnSale", {
        type: itemType + " sale return",
        saleCost: sale.trim(),
        comment: comment,
        customerContact: customer.code,
        quantity: quantity,
        item: item,
      })
      .then(({ data }) => {
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data));
        }

        // console.log(data);
        setOpen(true);
        return Promise.resolve();
      })
      .catch((error) => {
        setOpenError(true);
        console.log("err", error);
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return Promise.reject();
      });

    api
      .post("/bisan/returnPurchase", {
        type: itemType + " purchase return",
        purchaseCost: purchase.trim(),
        comment: comment,
        supplierContact: supplier.code,
        quantity: quantity,
        item: item,
      })
      .then(({ data }) => {
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data));
        }

        // console.log(data);
        setOpen(true);
        return Promise.resolve();
      })
      .catch((error) => {
        setOpenError(true);
        console.log("err", error);
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return Promise.reject();
      });
  };
