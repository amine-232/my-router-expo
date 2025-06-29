import { View, Text } from "react-native";
import React from "react";

type PropsTimer = {
  startTime: number;
  audioDuration: number;
  currentTime: number;
};
const TimerTimeLine = ({
  startTime,
  audioDuration,
  currentTime,
}: PropsTimer) => {
  return (
    <View
      style={{
        width: "100%",
        height: "auto",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "auto",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "800", marginHorizontal: 4 }}>
          {startTime.toFixed(2)}s
        </Text>
        <Text style={{ color: "#fff", fontWeight: "800", marginHorizontal: 4 }}>
          {audioDuration.toFixed(2)}s
        </Text>
      </View>
      <Text
        style={{
          color: "#fff",
          fontWeight: "800",
          marginHorizontal: "auto",
        }}
      >
        {currentTime.toFixed(2)}s
      </Text>
    </View>
  );
};

export default TimerTimeLine;
