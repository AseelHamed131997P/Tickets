import "./App.css";
import { Redirect, Switch } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "components";
import {
  Login,
  ManualTicket,
  Hotel,
  Insurance,
  Visa,
  Transportation,
  Settings,
  ProfileInfo,
  Admins,
  TicketsPage,
  ReportsPage,
  Voucher,
  VoucherPage,
  ManualTicketVoucher,
  Return,
} from "containers";
import { Drawer } from "ui/components";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  fightButton: {
    transform: "rotate(45deg)",
  },
  hide: {
    display: "none",
  },

  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  img: {
    display: "block",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <PublicRoute path="/login" component={Login} />
      <PublicRoute path="/bisan" component={Settings} />
      <PrivateRoute exact={true} path="/voucher" component={Voucher} />
      <PrivateRoute
        exact={true}
        path="/manual-tickets/voucher"
        component={ManualTicketVoucher}
      />
      <React.Fragment>
        <div className={classes.root}>
          <Drawer></Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar}>
              <PrivateRoute path="/overview" component={TicketsPage} />
              <PrivateRoute path="/manual-tickets" component={ManualTicket} />
              <PrivateRoute path="/reports" component={ReportsPage} />
              <PrivateRoute path="/tickets" component={TicketsPage} />
              <PrivateRoute path="/hotels" component={Hotel} />
              <PrivateRoute path="/visa" component={Visa} />
              <PrivateRoute path="/insurance" component={Insurance} />
              <PrivateRoute path="/admins" component={Admins} />
              <PrivateRoute path="/voucherPage" component={VoucherPage} />
              <PrivateRoute path="/settings" component={Settings} />
              <PrivateRoute path="/profile" component={ProfileInfo} />
              <PrivateRoute path="/transportation" component={Transportation} />
              <PrivateRoute path="/return" component={Return} />
            </div>
          </main>
        </div>
      </React.Fragment>
    </Switch>
  );
}

export default App;
