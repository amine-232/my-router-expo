import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  ColorValue,
  Pressable,
} from "react-native";
import React from "react";

const IconBtn = ({
  icon,
  size,
  color,
  onPress,
}: {
  icon: string;
  size: number;
  color?: ColorValue | undefined
  onPress?: () => void;
}) => {
  return (
    <Pressable style={{ height: "auto", width: "auto" }} onPress={onPress}>
      <Image
        source={icon as ImageSourcePropType}
        style={{ width: size, height: size }}
        resizeMode={"contain"}
        tintColor={color ? color as ColorValue: undefined}
      />
    </Pressable>
  );
};

export default IconBtn;
