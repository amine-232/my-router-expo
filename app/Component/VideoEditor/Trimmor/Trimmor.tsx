// Trimmor.tsx
import {
  View,
  Text,
  Animated,
  Image,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import VolumeSlider from "../VolumeSlider";
import { VideoPlayer } from "expo-video";
import Handle from "./Handle";
import Playhead from "./Playhead";
import useHandlePanResponder from "./useHandlePanResponder";

const HANDLE_WIDTH = 20;
const MIN_TRIM_DURATION = 1; // seconds

const Trimmor = ({
  sliderWidth,
  endTime,
  startTime,
  maxDuration,
  startHandle,
  endHandle,
  setStartTime,
  setEndTime,
  thumbnails,
  videoVolume,
  setValue,
  player,
}: {
  sliderWidth: any;
  endTime: number;
  startTime: number;
  maxDuration: number;
  startHandle: Animated.Value;
  endHandle: Animated.Value;
  setStartTime: (e: number) => void;
  setEndTime: (e: number) => void;
  thumbnails: { uri: string }[];
  videoVolume: number;
  setValue: (e: number) => void;
  player: VideoPlayer ;
}) => {
  const { width } = useWindowDimensions();
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(width);
  const [playbackTime, setPlaybackTime] = useState(startTime);
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);
  const playheadX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    sliderWidth.current = width;
    const startPos = (startTime / maxDuration) * width;
    const endPos = (endTime / maxDuration) * width;
    startHandle.setValue(startPos);
    endHandle.setValue(endPos);
    setStartX(startPos);
    setEndX(endPos);
  }, [width, startTime, endTime, maxDuration]);



  // Custom hooks for pan responder
  const panResponderStart = useHandlePanResponder({
    isStart: true,
    handle: startHandle,
    setHandleX: setStartX,
    oppositeHandleX: endX,
    sliderWidth,
    maxDuration,
    minTrim: MIN_TRIM_DURATION,
    setTime: (e) => setStartTime(e),
  });

  const panResponderEnd = useHandlePanResponder({
    isStart: false,
    handle: endHandle,
    setHandleX: setEndX,
    oppositeHandleX: startX,
    sliderWidth,
    maxDuration,
    minTrim: MIN_TRIM_DURATION,
    setTime: (e) => setEndTime(e),
  });

  // Playhead logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (!isDraggingPlayhead) {
      interval = setInterval(() => {
        setPlaybackTime((prev) => {
          const next = prev + 0.2;
          if (next >= endTime) {
            playheadX.setValue(
              (startX / sliderWidth.current) * sliderWidth.current
            );
            return startTime;
          }
          const percentage = next / maxDuration;
          playheadX.setValue(percentage * sliderWidth.current);
          return next;
        });
      }, 200);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDraggingPlayhead, startTime, endTime, maxDuration]);

  const timelineContainer = (width: number): ViewStyle => {
    return {
      marginTop: 10,
      height: 60,
      backgroundColor: "#ddd",
      width,
      position: "relative",
      flexDirection: "row",
    };
  };

  const pressableOverlay = (width: number): ViewStyle => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width,
      height: 60,
      zIndex: 0,
    };
  };

  return (
    <View style={{ width: "100%", flexDirection: "column" }}>
      {/* Volume Control */}
      <View style={styles.volumeContainer}>
        <View style={{ flex: 1 }}>
          <VolumeSlider
            height={40}
            color="black"
            horizontal={false}
            value={videoVolume}
            setValue={setValue}
          />
        </View>
        <View style={{ padding: 5 }}>
          <Text style={styles.volumeText}>
            {(videoVolume * 100).toFixed(0)}%
          </Text>
        </View>
      </View>

      {/* Time Labels */}
      <View style={styles.timeLabels}>
        <Text style={styles.timeText}>{startTime.toFixed(2)}s</Text>
        <Text style={styles.timeText}>{endTime.toFixed(2)}s</Text>
      </View>

      {/* Current Playback */}
      <View style={{ alignItems: "center", marginTop: 5 }}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          {player.currentTime.toFixed(2)}
        </Text>
      </View>

      {/* Timeline */}
      <View style={timelineContainer(width)}>
        {thumbnails.map((thumb, i) => (
          <Image
            key={i}
            source={{ uri: thumb.uri }}
            style={[styles.thumbnail, { width: width / thumbnails.length }]}
          />
        ))}

        {/* Seek Press */}
        <Pressable
          style={pressableOverlay(sliderWidth.current)}
          onPress={(e) => {
            const pressX = e.nativeEvent.locationX;
            if (pressX >= startX && pressX <= endX) {
              const percentage = pressX / sliderWidth.current;
              const newTime = percentage * maxDuration;
              setPlaybackTime(newTime);
              playheadX.setValue(pressX);
              player.currentTime = newTime;
            }
          }}
        />

        {/* Playhead */}
        <Playhead
          playheadX={playheadX}
          panHandlers={{
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => setIsDraggingPlayhead(true),
            onPanResponderMove: (_: any, gesture: any) => {
              const x = Math.max(
                startX,
                Math.min(gesture.moveX - HANDLE_WIDTH / 2, endX)
              );
              playheadX.setValue(x);
              const percent = x / sliderWidth.current;
              setPlaybackTime(percent * maxDuration);
            },
            onPanResponderRelease: () => setIsDraggingPlayhead(false),
          }}
        />

        {/* Handles */}
        <Handle
          animatedValue={startHandle}
          panHandlers={panResponderStart.panHandlers}
        />
        <Handle
          animatedValue={endHandle}
          panHandlers={panResponderEnd.panHandlers}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  volumeContainer: {
    marginVertical: 5,
    flexDirection: "row",
    backgroundColor: "black",
  },
  volumeText: {
    fontWeight: "800",
    color: "#fff",
  },
  thumbnail: {
    height: 60,
  },
  timeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    color: "#fff",
  },
});

export default Trimmor;
