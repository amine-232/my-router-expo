import { Image, Pressable } from "react-native";
import React from "react";

const ProfileImg = ({
  uri,
  size,
  onPress,
  borderWidth,
}: {
  uri: string;
  size: number;
  borderWidth: number;
  onPress?: () => void;
}) => {
  const ViewSize = size + borderWidth;
  const ViewImag = size - borderWidth;

  return (
    <Pressable
      style={{
        height: ViewSize,
        width: ViewSize,
        borderWidth: borderWidth,
        borderColor: "silver",
        borderRadius: ViewSize / 2,
      }}
      onPress={onPress}
    >
      <Image
        source={{ uri: uri }}
        style={{
          width: ViewImag,
          height: ViewImag,
          borderRadius: ViewImag / 2,
          marginHorizontal: "auto",
          marginVertical: "auto",
        }}
        resizeMode={"contain"}
      />
    </Pressable>
  );
};

export default ProfileImg;
