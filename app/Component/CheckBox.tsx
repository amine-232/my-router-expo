import { View, Text } from "react-native";
import Checkbox from "expo-checkbox";
import React from "react";

const CheckBoxBtn = ({
  title,
  value,
  setValue,
  onPress,
  state,
}: {
  title: String;
  value?: any;
  setValue?: (e: any) => void | undefined;
  onPress?: (e: any) => void | undefined;
  state?: boolean;
}) => {
  return (
    <View
      style={{
        width: "auto",
        height: "auto",
        flexDirection: "row",
        marginVertical: 10,
        padding: 5,
      }}
    >
      <Text style={{ marginHorizontal: 10 }}>{title}</Text>
      <Checkbox
        onValueChange={(e: any) => {
          if (setValue) {
            if (value === title) {
              setValue(false);
            } else {
              setValue(title);
            }
          }
          if (onPress) {
            onPress(e);
          }
        }}
        value={state ? state : value === title ? true : false}
      />
    </View>
  );
};

export default CheckBoxBtn;
