import { useState, FunctionComponent } from "react";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { styled, mq } from "ui/utils";
import { Item } from "./index";

const StyledIcon = styled(ListItemIcon)`
  svg {
    width: 65%;
    fill: black;
  }
`;
const StyledIconList = styled(ListItemIcon)`
  svg {
    fill: #95a5a6;
    width: 65%;
  }
`;
const StyledText = styled(ListItemText)`
  color: grey;
`;

const StyledList = styled(ListItem)`
  vertical-align: middle;

  ${mq({ paddingLeft: ["10px", "16px"] })};
`;

interface Props {
  item: Item;
}

const Dropdown: FunctionComponent<Props> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickFunctions = () => {
    item.list ? handleClick() : item.onClick && item.onClick();
  };

  return (
    <>
      <StyledList button key={item.text} onClick={handleClickFunctions}>
        <StyledIcon>{item.icon}</StyledIcon>
        <ListItemText primary={item.text} />
        {item.list ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </StyledList>
      {item.list && (
        <Collapse in={open}>
          <List component="div" disablePadding>
            <StyledText
              primary={item.list.map((list, index) => (
                <StyledList
                  button
                  key={`${item.text}-${index}`}
                  onClick={list.onClick}
                >
                  <StyledIconList>{list.icon}</StyledIconList>
                  {list.text}
                </StyledList>
              ))}
            ></StyledText>
          </List>
        </Collapse>
      )}
    </>
  );
};

export default Dropdown;
