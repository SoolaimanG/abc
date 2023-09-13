import Switch from "@mui/material/Switch";
import { SetStateAction, memo } from "react";

type props = {
  checked: boolean;
  setChecked: React.Dispatch<SetStateAction<boolean>>;
};

function ControlledSwitch(props: props) {
  const { checked, setChecked } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}

export default memo(ControlledSwitch);
