import React from "react";
import { Animated, StyleSheet } from "react-native";

const Handle = ({
  animatedValue,
  panHandlers,
}: {
  animatedValue: Animated.Value;
  panHandlers: any;
}) => (
  <Animated.View
    {...panHandlers}
    style={[styles.handle, { left: animatedValue }]}
  />
);

const styles = StyleSheet.create({
  handle: {
    width: 20,
    height: 60,
    marginLeft: -10,
    backgroundColor: "red",
    position: "absolute",
    top: 0,
    zIndex: 3,
    borderRadius: 5,
  },
});

export default Handle;
