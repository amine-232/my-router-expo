import React from "react";
import { Animated, StyleSheet } from "react-native";

const Playhead = ({
  playheadX,
  panHandlers,
}: {
  playheadX: Animated.Value;
  panHandlers: any;
}) => (
  <Animated.View
    {...panHandlers}
    style={[styles.playhead, { left: playheadX }]}
  />
);

const styles = StyleSheet.create({
  playhead: {
    width: 2,
    height: 60,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    zIndex: 2,
  },
});

export default Playhead;
    