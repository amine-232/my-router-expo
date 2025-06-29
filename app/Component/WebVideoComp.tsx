import React, { useEffect, useRef, useState } from "react";
import { useWindowDimensions, View } from "react-native";

type Props = {
  uri: any;
  playerRef: any;
  isPlaying: boolean;
  togglePlay: () => void;
  currentTime: number;
  duration: number;
  handleSeek: (value: number) => void;
  volume: number;
  handleVolumeChange: (value: number) => void;
  setDuration: (e: any) => void;
  setCurrentTime: (e: any) => void;
};

const WebVideoComp: React.FC<Props> = ({
  uri,
  playerRef,
  setDuration,
  setCurrentTime,
  volume,
  handleVolumeChange,
}) => {
  useEffect(() => {
    const video = playerRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleVolumeUpdate = () => handleVolumeChange(video.volume);

    video.volume = volume; // Set initial volume

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("volumechange", handleVolumeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("volumechange", handleVolumeUpdate);
    };
  }, [volume]);

  const { width, height } = useWindowDimensions();

  return (
    <View
      style={{
        position: "relative",
        height: height - 47,
        width: width,
      }}
    >
      <video
        ref={playerRef}
        src={uri}
        autoPlay
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </View>
  );
};

export default WebVideoComp;
