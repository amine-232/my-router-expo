import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";

const WebCamera = () => {
  const stremRef = useRef<any>(null);

  useEffect(() => {
    const element = stremRef.current;

    if (element) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          const videoView = document.getElementById("VideoContainer");
          const videoElement = document.createElement("video");
          videoElement.autoplay = true;
          videoElement.playsInline = true;
          videoElement.muted = false;
          videoElement.srcObject = stream;
          videoView?.appendChild(videoElement);
        });
    }
  });

  return (
    <View>
      <View ref={stremRef} id="VideoContainer" />
    </View>
  );
};

export default WebCamera;
