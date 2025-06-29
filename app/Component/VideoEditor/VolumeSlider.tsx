import { ColorValue, Dimensions, DimensionValue } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";

const VolumeSlider = ({
  value,
  setValue,
  horizontal,
  color,
  height,
}: {
  value: number;
  setValue: (e: any) => void;
  horizontal: boolean;
  color?: ColorValue;
  height?: DimensionValue;
}) => {
  return (
    <Slider
      style={{
        backgroundColor: color ? color : "#fff",
        width: horizontal ? 200 : "100%", // this controls the *length* of the vertical slider
        height: height ? height : 40, // keep small to avoid overflow
        transform: horizontal ? [{ rotate: "-90deg" }] : undefined,
      }}
      minimumValue={0}
      maximumValue={1}
      value={value}
      onValueChange={(val) => setValue(val)}
    />
  );
};

export default VolumeSlider;
