import React from "react";
import { View, useWindowDimensions } from "react-native";
import { VideoView } from "expo-video";

interface PlayerVType {
  videoRef: any;
  player: any;
}
const VideoPlayerWrapper = ({ player, videoRef }: PlayerVType) => {
  const { width, height } = useWindowDimensions();

  if (!player) return null;
  return (
    <View style={{ width: width, height: width, zIndex: 0 }}>
      <VideoView
        ref={videoRef}
        style={{ width: width, height: height }}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls={false}
        showsTimecodes
        useExoShutter={false}
      />
    </View>
  );
};

export default VideoPlayerWrapper;
