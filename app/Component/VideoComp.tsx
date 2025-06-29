import { View, Platform } from "react-native";
import { useState, useEffect } from "react";
import { VideoView } from "expo-video";

export default function VideoScreen({
  playerRef,
  player,
  shouldPlay,
  vUri,
  setVUri,
  setPipEnabled,
}: {
  playerRef: any;
  player: any;
  shouldPlay: boolean;
  isVisible: boolean;
  pipEnabled: boolean;
  setPipEnabled: (e: boolean) => void;
  vUri: any;

  setVUri: (e: any) => void;
}) {
  useEffect(() => {
    return () => {
      try {
        player?.play();
        playerRef.current?.stopPictureInPicture?.();
      } catch (e) {}
    };
  }, [player]);

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <VideoView
        ref={playerRef}
        style={{ width: "100%", height: "100%" }}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls={false}
        showsTimecodes
        onPictureInPictureStart={() => setPipEnabled(true)}
        onPictureInPictureStop={() => setPipEnabled(false)}
      />
    </View>
  );
}
