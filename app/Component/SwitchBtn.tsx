import { ColorValue, Switch } from "react-native";
import React, { useState } from "react";

const SwitchBtn = ({
  value,
  setValue,
}: {
  value: boolean;
  setValue: (e: boolean) => void;
}) => {
  return (
    <Switch
      value={value}
      onValueChange={() => {
        if (!value) {
          setValue(true);
        } else {
          setValue(false);
        }
      }}
      trackColor={{ false: "gray" as ColorValue, true: "green" as ColorValue }}
    />
  );
};

export default SwitchBtn;
