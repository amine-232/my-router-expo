import { View, Text, StyleSheet, Animated, PanResponder } from "react-native";
import React, { useEffect } from "react";

interface PropsAudio {
  sliderWidth: any;
  startTime: number;
  endTime: number;
  audioDuration: number;
  setStartX: (e: any) => void;
  startHandle: any;
  endHandle: any;
  setEndX: (e: any) => void;
  trimDuration: number;
  boxX: any;
  setStartTime: (e: any) => void;
  setEndTime: (e: any) => void;
  setMusicStartTime: (e: any) => void;
  setMusicEndTime: (e: any) => void;
}

const AudioSelector = ({
  
  audioDuration,
  sliderWidth,
  endTime,
  startTime,
  startHandle,
  endHandle,
  setStartTime,
  setEndTime,
  setMusicStartTime,
  setMusicEndTime,
  trimDuration,
  boxX,
}: PropsAudio) => {


  useEffect(() => {

  }, [audioDuration])
  const panResponderTrimBox = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const { dx } = gestureState;
      const currentX = boxX as any; // current left
      const newX = currentX._value + dx;

      const maxX =
        sliderWidth.current -
        (trimDuration / audioDuration) * sliderWidth.current;

      const clampedX = Math.max(0, Math.min(newX, maxX));
      boxX.setValue(clampedX);

      const percentage = clampedX / sliderWidth.current;
      const newStart = percentage * audioDuration;
      const newEnd = newStart + trimDuration;

      setStartTime(newStart);
      setEndTime(newEnd);
      setMusicStartTime(newStart);
      setMusicEndTime(newEnd);
    },
  });

  return (
    <View
      style={styles.timelineStrip}
      onLayout={(e) => {
        sliderWidth.current = e.nativeEvent.layout.width;
        const startPos = (startTime / audioDuration) * sliderWidth.current;
        const endPos = (endTime / audioDuration) * sliderWidth.current;
        startHandle.setValue(startPos);
        endHandle.setValue(endPos);

      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          marginVertical: "auto",
          backgroundColor: "#fff",
        }}
      >
        {[...Array(Math.ceil(audioDuration))].map((_, i) => (
          <View
            key={i}
            style={{
              width: sliderWidth.current / audioDuration,
              borderLeftWidth: 1,
              borderColor: "black",
              height: 40,
            }}
          />
        ))}
      </View>

      {/* <Animated.View
              {...panResponderStart.panHandlers}
              style={[styles.handle, { left: startHandle }]}
            />
            <Animated.View
              {...panResponderEnd.panHandlers}
              style={[styles.handle, { left: endHandle }]}
            /> */}

      <Animated.View
        {...panResponderTrimBox.panHandlers}
        style={[
          styles.trimBox,
          {
            left: boxX,
            width: (trimDuration / audioDuration) * sliderWidth.current,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  timelineStrip: {
    marginTop: 10,
    height: 60,
    backgroundColor: "yellow",
  },

  trimBox: {
    position: "absolute",
    top: 0,
    height: 60,
    backgroundColor: "rgba(0, 0, 255, 0.4)", // transparent blue
    borderColor: "blue",
    borderWidth: 2,
    borderRadius: 5,
    zIndex: 10,
  },
});

export default AudioSelector;
