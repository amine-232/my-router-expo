import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  Pressable,
  ColorValue,
} from "react-native";
import React from "react";

const IconBotton = ({
  size,
  onPress,
  icon,
  color,
  style,
}: {
  style?: any;
  size: number;
  onPress: () => void;
  icon: any;
  color: undefined |ColorValue;
}) => {
  return (
    <Pressable style={style} onPress={onPress}>
      <Image
        source={icon as ImageSourcePropType}
        style={{ width: size, height: size }}
        resizeMode={"contain"}
        tintColor={color}
      />
    </Pressable>
  );
};

export default IconBotton;
