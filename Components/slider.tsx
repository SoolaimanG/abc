import * as React from "react";
import Slider from "@mui/material/Slider";

type props = {
  value: number;
  defaultNum: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

export default function SliderSizes(props: props) {
  const { value, defaultNum, setValue } = props;

  const handleChange = (newValue: number) => {
    setValue(newValue as number);
  };
  return (
    <>
      <Slider
        value={value}
        onChange={(_, newValue) => handleChange(newValue as number)}
        defaultValue={defaultNum}
        aria-label="Default"
        valueLabelDisplay="auto"
      />
    </>
  );
}
