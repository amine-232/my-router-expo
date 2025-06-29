import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";

const Button = ({ title, onPress }: { title: string; onPress: () => void }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Pressable
      style={{
        width: "auto",
        height: "auto",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: hovered ? "#fff" : "#1877f2",
        borderWidth:hovered ? 1 :0,
        borderColor: hovered ? "silver" : undefined
      }}
      onPointerEnter={() => {
        setHovered(true);
      }}
      onPointerLeave={() => {
        setHovered(false);
      }}
      onPress={onPress}
    >
      <Text style={{ color: hovered ? "black" :"#fff" , textAlign: "center", fontWeight: hovered ? "bold" : "500"}}>{title}</Text>
    </Pressable>
  );
};

export default Button;
