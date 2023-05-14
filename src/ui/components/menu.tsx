import { FunctionComponent } from "react";
import { styled, css, mq } from "ui/utils";
import { Col, MenuItem } from "ui/components";
import { general } from "data";
import { Icon } from "ui/components";

const MenuBox = styled(Col)(
  () => css`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 90px;
    column-gap: 20px;

    ${mq({
      rowGap: ["0px", "0px", "0px", "0px", "20px", "40px"],
      paddingBottom: ["5px", "5px", "5px", "5px", "20px", "20px"],
    })};
  `
);

interface Props {
  hotel?: string;
  unit: string;
  item: string;
  description: string;
}

const Menu: FunctionComponent<Props> = ({ hotel, unit, item, description }) => {
  let dateObj = new Date();

  let myDate =
    dateObj.getUTCDate() +
    "/" +
    (dateObj.getMonth() + 1) +
    "/" +
    dateObj.getUTCFullYear();
  return (
    <MenuBox>
      <MenuItem
        iconComponent={<Icon.USD />}
        title1={general.manualFields.Currancy}
        title2={general.manualFields.USD}
      />
      <MenuItem
        iconComponent={<Icon.Tax />}
        title1={general.manualFields.Tax}
        title2={general.manualFields.E}
      />
      {hotel !== "true" && (
        <MenuItem
          iconComponent={<Icon.Date />}
          title1={general.manualFields.Date}
          title2={myDate}
        />
      )}

      <MenuItem
        iconComponent={<Icon.Description />}
        title1={general.manualFields.Description}
        title2={description}
      />
      <MenuItem
        iconComponent={<Icon.Item />}
        title1={general.manualFields.Item}
        title2={item}
      />
      <MenuItem
        iconComponent={<Icon.Unit />}
        title1={general.manualFields.Unit}
        title2={unit}
      />
      <MenuItem
        iconComponent={<Icon.Warehouse />}
        title1={general.manualFields.Warehouse}
        title2={"0001"}
      />
    </MenuBox>
  );
};

export default Menu;
