import { View, Text, TextInput, Platform } from "react-native";
import React, { useState } from "react";

const InputField = ({
  value,
  setValue,
  placeholder,
  pass,
  addStyle,
}: {
  value: string;
  setValue: (e: string) => void;
  placeholder: string;
  pass?: boolean;
  addStyle?: any;
}) => {
  return (
    <View>
      <TextInput
        onChangeText={(e) => {
          setValue(e);
        }}
        secureTextEntry={pass ? true : false}
        value={value || ""}
        placeholder={placeholder}
        style={[
          {
            width: "100%",
            height: "auto",
            paddingHorizontal: 20,
            paddingVertical: 5,
            backgroundColor: "#f2f2f2",
            borderRadius: 5,
            ...Platform.select({ web: { outline: "none" } }),
          },
          { ...addStyle },
        ]}
      />
    </View>
  );
};

export default InputField;
