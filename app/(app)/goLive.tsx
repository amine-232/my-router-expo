import { View, Platform } from "react-native";
import React from "react";
import WebCamera from "../Component/WebCamera";
import CameraComp from "../Component/CameraComp";

const GoLive = () => {
  return (
    <View style={{ flex: 1 }}>
      {Platform.OS === "web" ? (
        <View style={{ flex: 1 }}>
          <WebCamera />
        </View>
      ) : null}

      {Platform.OS === "android" ? (
        <View style={{ flex: 1 }}>
          <CameraComp />
        </View>
      ) : null}
    </View>
  );
};

export default GoLive;
