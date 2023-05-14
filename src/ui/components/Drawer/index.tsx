import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import FlightIcon from "@material-ui/icons/Flight";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SupervisorAccountTwoToneIcon from "@material-ui/icons/SupervisorAccountTwoTone";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import ReceiptIcon from "@material-ui/icons/Receipt";
import { styled } from "ui/utils";
import { Icon } from "ui/components";
import { useDispatch } from "hooks";
import Logo from "images/rahhal_Logo.png";
import { logout } from "actions/auth";
import DropDown from "./dropdown";
import { useHistory } from "react-router-dom";
import { AccountCircle } from "@material-ui/icons";
import { Assignment } from "@material-ui/icons";
import { api } from "utils";
import "./index.css";

export interface Item extends DrawerItem {
  list?: DrawerItem[];
  onClick?: () => void;
}

interface DrawerItem {
  text: string;
  icon: React.ReactElement;
  onClick?: () => void;
}

export interface Config {
  drawer: {
    items: Item[];
  };
}

const drawerWidth = 215;

const StyledFlight = styled(FlightIcon)`
  transform: rotate(45deg);
  width: 100%;
`;

const StyledIconButton = styled(IconButton)`
  width: 100%;
  margin-left: unset;
  border-radius: unset !important;

  &:hover,
  &:focus {
    border-radius: unset !important;
  }

  img {
    width: 100%;
    bottom: 20%;
  }
`;

const StyledCloseIcon = styled(IconButton)`
  position: absolute;
  right: 0;
  z-index: 9;
`;

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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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

const RahhalLogo = styled.img`
  width: 100%;
`;

const MiniDrawer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const [loggedInUser, setLoggedInUser] = useState<string>(" ");
  useEffect(() => {
    api
      .get("/account/profile", {
        headers: {
          bisan_token: localStorage.getItem("bisan_token"),
          bisan_account_id: localStorage.getItem("bisan_account_id"),
        },
      })
      .then(({ data }) => {
        setLoggedInUser(data.user.username);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const data: Config = {
    drawer: {
      items: [
        {
          text: loggedInUser,
          icon: <AccountCircle />,
          onClick: () => history.push("/profile"),
        },

        {
          text: "Tickets",
          icon: <Icon.Tickets />,
          onClick: () => history.push("/tickets"),
        },
        {
          text: "Manual Tickets",
          icon: <Icon.Manualtickets />,
          onClick: () => history.push("/manual-tickets"),
        },
        {
          text: "Hotels",
          icon: <Icon.Hotels />,
          onClick: () => history.push("/hotels"),
        },
        {
          text: "Visa",
          icon: <Icon.Visa />,
          onClick: () => history.push("/visa"),
        },
        {
          text: "Insurance",
          icon: <Icon.Insurance />,
          onClick: () => history.push("/insurance"),
        },
        {
          text: "Transportation",
          icon: <Icon.Admin />,
          onClick: () => history.push("/transportation"),
        },
        {
          text: "Return",
          icon: <Icon.Return />,
          onClick: () => history.push("/return"),
        },
        {
          text: "Reports",
          icon: (
            <Assignment style={{ color: "grey", fill: "rgba(0,0,0,0.25)" }} />
          ),
          onClick: () => history.push("/reports"),
        },
        {
          text: "Settings",
          icon: <Icon.Settings />,
          onClick: () => history.push("/settings"),
          list: [
            {
              text: "Bisan",
              icon: <FormatBoldIcon />,
              onClick: () => history.push("/settings"),
            },
            {
              text: "Voucher",
              icon: <ReceiptIcon />,
              onClick: () => history.push("/voucherPage"),
            },

            {
              text: "Admins",
              icon: <SupervisorAccountTwoToneIcon />,
              onClick: () => history.push("/admins"),
            },

            {
              text: "Logout",
              icon: <ExitToAppIcon />,
              onClick: () => dispatch(logout()),
            },
          ],
        },
      ],
    },
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="hidden-print drawer" style={{ display: "block" }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        {open && (
          <StyledCloseIcon onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </StyledCloseIcon>
        )}

        <List>
          {open ? (
            <RahhalLogo src={Logo} alt="rahhal logo" />
          ) : (
            <StyledIconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <StyledFlight />
            </StyledIconButton>
          )}

          {data.drawer.items.map((item, index) => (
            <DropDown key={`${item.text}-${index}`} item={item} />
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default MiniDrawer;
